// Listen for changes in the inputs to auto-update
document.getElementById('input-n').addEventListener('input', updateUI);
document.getElementById('input-a').addEventListener('input', updateUI);
document.getElementById('input-msg').addEventListener('input', updateUI);

function updateUI() {
  // 1. Get values from the DOM
  const N = parseInt(document.getElementById('input-n').value) || 35;
  const a = parseInt(document.getElementById('input-a').value) || 3;
  const M = parseInt(document.getElementById('input-msg').value) || 7;
  
  const outputDiv = document.getElementById('output');

  // 2. Run the pure logic function
  const result = runSimulation(N, a, M);

  // 3. Render the results based on the pure data
  if (result.error) {
    outputDiv.innerHTML = `<p style="color: red;"><strong>Error:</strong> ${result.error}</p>`;
    return;
  }

  let html = `<h3>Factors Found!</h3>`;
  html += `<p>Method: ${result.method}</p>`;
  html += `<p><strong>p:</strong> ${result.p} | <strong>q:</strong> ${result.q}</p>`;
  
  if (result.r) {
    html += `<p><strong>Period (r):</strong> ${result.r}</p>`;
  }

  html += `<h3>RSA Verification</h3>`;
  html += `<p>Euler's Totient (phi): ${result.phi}</p>`;
  html += `<p>Public Key (e): ${result.e}</p>`;
  html += `<p>Private Key (d): ${result.d}</p>`;
  html += `<ul>
             <li><strong>Original Message:</strong> ${result.originalMessage}</li>
             <li><strong>Ciphertext (Encrypted):</strong> ${result.ciphertext}</li>
             <li><strong>Decrypted Message:</strong> ${result.decryptedMessage}</li>
           </ul>`;

  if (result.isVerified) {
    html += `<p style="color: green;"><strong>Success! Decrypted message matches the original.</strong></p>`;
  } else {
    html += `<p style="color: red;"><strong>Failed! Decrypted message does not match.</strong></p>`;
  }

  outputDiv.innerHTML = html;
}

// Run once on load
updateUI();