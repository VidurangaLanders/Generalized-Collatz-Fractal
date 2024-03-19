let start = 1;          // Starting number for the Collatz sequence
let reset = start;      // Value to reset 'start' to prevent overflow

// Generalized equation for collatz function f(n, b, m)
// f(n, b, m) = n/b            if n mod b = 0
// f(n, b, m) = (b^m * 1)*n + b^m - (n mod b^m)      if n mod b != 0   

// x = b^m
// z = b
// y = b

let inc = 17;           // Increment for 'start' after each sequence 
let len;                // Length of lines drawn
let sw;                 // Stroke weight
let z = (7);            // Supporting value for calculations
let y = (z**1);         // Base value for calculations
let m = 1;              // Exponent value for calculations 
let x = (y**m);         // Exponential value for calculations
let angle = Math.PI / (2**8); // Angle of rotation

///////////////////////////////
// Some interesting fractal values
// Make sure to adjust the drawing function to center the image
// Change the drawing setup to scale the image

// inc = 1024, z = 2**8, m = 3, angle = Math.PI / (2**15.96)


// Create drawing setup
function setup() {
  createCanvas(innerWidth, innerHeight);  // Create canvas matching window size
  background(0);                          // Black background
  colorMode(HSB, 1, 1, 1, 1);             // Use HSB color mode

  let minDimension = min(width, height);  // Find the smaller dimension

  sw = map(minDimension,1920, 1080, 1, 1); // Scale stroke weight based on screen size
  strokeWeight(sw); 

  len = map(minDimension, 1920, 1080, 1, 5); // Scale line length based on screen size
}

// Create drawing function
function draw() {
  let sequence = [];    // Array to store the Collatz sequence
  let n = start;        // Initialize 'n' with the starting number

  do {
    sequence.push(n);   // Add current number to the sequence
    n = collatz(n);     // Calculate next number in the Collatz sequence
  } while (n != 1);     // Continue until sequence reaches 1

  sequence.push(1);     // Add the final '1' to the sequence 
  sequence.reverse();   // Reverse the sequence for drawing

  resetMatrix();          // Reset drawing transformations
  translate(50*width / 100, 90*height / 100); // Position drawing in the center

  for (let j = 0; j < sequence.length; j++) {
    let value = sequence[j]; 

    // Rotate based on value's relation to y 
    if ((value % y) >= (y / 2)) {
      rotate(angle * (2*((value % y) -(y/2))+1));  
    } else {
      rotate(-angle * (2*((y / 2) -(value % y))-1)); 
    }

    stroke(j / sequence.length, 1, 1, 0.08); // Color based on position in sequence
    line(0, 0, 0, -len);                    // Draw a line
    translate(0, -len);                     // Move drawing position upward
  }

  start += inc;         // Increment start value for the next sequence
  print(start);         

  // Reset start to prevent overflow
  if (start > 100000000) {
    reset++
    start = reset
  }
}

// Collatz function
function collatz(n) {
  let r = (n % x);            // Calculate remainder of n divided by x

  if (n % y == 0) {           // If n is divisible by y
    return n / y;             // Even case of Collatz conjecture
  } else {                    // If n is not divisible by y
    return ((n * (x + 1) + (x - r))/y); // Odd case of Collatz conjecture
  }
}
