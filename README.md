# DataStructures_final
Hi Mr. Haver, this is our final project playground. It's a simple, interactive website that shows how RSA encryption works and how Shor's Algorithm can guess the secret keys by finding the repeating pattern (period) in the math.

How the Code is Set Up
We purposefully split our code into three separate files so the backend math isn't mixed up with the front-end layout:

index.html – Holds the basic text boxes, buttons, and our custom dark-mode theme colors.

logic.js – Main logic file. Math functions (like GCD and loops to find the period) written using basic variables and loops that we completely understand. No UI

app.js – It listens for when you type a number in the box, sends it to logic.js, and prints the results back on the screen.

SimulatesGCD Check: checks if your base input accidentally factors N without needing any complex steps.
Period Finding: Simulates Shor's by searching for the repeating cycle where a^r= 1 (mod N)
Key Cracking: Takes that cycle, splits it to find the secret prime factors p and q, and builds the private decryption key d.
RSA Test: Runs a sample message through the whole encryption/decryption loop to prove the hacked keys actually work.
