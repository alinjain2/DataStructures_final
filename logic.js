// --- CORE MATHEMATICAL UTILITIES ---

function gcd(a, b) {
  while (b !== 0) {
    let temp = a % b;
    a = b;
    b = temp;
  }
  return a;
}

// Uses BigInt to prevent overflow when doing large power calculations
function modpow(base, exp, mod) {
  let result = 1n;
  let b = BigInt(base) % BigInt(mod);
  let e = BigInt(exp);
  let m = BigInt(mod);
  
  while (e > 0n) {
    if (e % 2n === 1n) result = (result * b) % m;
    e = e / 2n;
    b = (b * b) % m;
  }
  return Number(result);
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Simulates the quantum period-finding routine using classical brute force
function findPeriod(a, N) {
  for (let r = 1; r <= 2000; r++) {
    if (modpow(a, r, N) === 1) return r;
  }
  return null;
}

function getModInverse(e, phi) {
  for (let d = 1; d < phi; d++) {
    if ((e * d) % phi === 1) return d;
  }
  return null;
}

// --- MAIN SIMULATION LOGIC ---
// This takes inputs and returns pure data (no HTML!)
function runSimulation(N, a, M) {
  // 1. Validate Inputs
  if (N < 4) return { error: "N must be 4 or greater." };
  if (isPrime(N)) return { error: `N = ${N} is prime. Shor's algorithm requires a composite number.` };

  // 2. Check for a lucky trivial factor using GCD
  const g = gcd(a, N);
  if (g > 1 && g < N) {
    return { success: true, p: g, q: N / g, method: "Lucky GCD" };
  }

  // 3. Find the period (The simulated "Quantum" step)
  const r = findPeriod(a, N);
  if (!r) return { error: "Failed: Period not found within calculation limits." };
  if (r % 2 !== 0) return { error: `Failed: Period r = ${r} is odd. Shor's requires an even period.` };

  const halfPower = modpow(a, r / 2, N);
  if (halfPower === N - 1) return { error: "Failed: Degenerate case. Factors cannot be extracted. Try another base 'a'." };

  // 4. Extract factors using the period
  const p = gcd(halfPower - 1, N);
  const q = gcd(halfPower + 1, N);

  // 5. RSA Verification
  const phi = (p - 1) * (q - 1);
  
  // Find public key 'e'
  let e = 3;
  while (e < phi) {
    if (gcd(e, phi) === 1) break;
    e += 2;
  }
  
  // Find private key 'd'
  const d = getModInverse(e, phi);
  if (!d) return { error: "Error computing private key inverse d." };

  // Encrypt and Decrypt the test message
  const ciphertext = modpow(M, e, N);
  const decrypted = modpow(ciphertext, d, N);

  // Return all the gathered data as an object
  return {
    success: true,
    method: "Shor's Algorithm",
    p: p,
    q: q,
    r: r,
    phi: phi,
    e: e,
    d: d,
    originalMessage: M,
    ciphertext: ciphertext,
    decryptedMessage: decrypted,
    isVerified: (M === decrypted)
  };
}