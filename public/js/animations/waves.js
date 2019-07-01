////////////////
// wave form
////////////////

let xspacing = 8; // How far apart should each horizontal position be spaced
let w; // Width of entire wave
let maxwaves = 5; // total # of waves to add together

let theta = 0.0;
let amplitude = []; // Height of wave
let dx = []; // Value for incrementing X, to be calculated as a function of period and xspacing
let yvalues = []; // Using an array to store height values for the wave (not entirely necessary)

let fadingIn = 0;
let waveState = 0;

function setUpWaves() {
  w = width + 16;
  for (let i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 70);
    let period = random(100, 300); // How many pixels before the wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }
  fadingIn = 0;
  yvalues = [];
}

function drawWave(speed) {
  calcWave(speed);
  renderWave();
}

function calcWave(speed) {
  // Increment theta (try different values for 'angular velocity' here
  let thSpeed = map(speed, 0, 150, 0.005, 0.2);
  theta += thSpeed;

  // Set all height values to zero
  for (let i = 0; i < w / xspacing; i++) {
    yvalues[i] = 0;
  }

  // Accumulate wave height values
  for (let j = 0; j < maxwaves; j++) {
    let x = theta;
    // amplitude[j] = map(speed, 0, 255, amplitude[j] - 10, amplitude[j] + 10);
    for (let i = 0; i < yvalues.length; i++) {
      // Every other wave is cosine instead of sine
      if (j % 2 === 0) yvalues[i] += sin(x) * amplitude[j];
      else yvalues[i] += cos(x) * amplitude[j];
      x -= dx[j];
    }
  }
}

function renderWave() {
  // A simple way to draw the wave with an ellipse at each position
  noStroke();
  fill(255, 100);
  ellipseMode(CENTER);
  // colorMode(HSB);
  for (let x = 0; x < yvalues.length; x++) {
    let val;
    if (x != 0) {
      val = map(dist(x,yvalues[x], x-1, yvalues[x-1]), 0, 25, 0, 255);
    } else {
      val = map(dist(x,yvalues[x], x+1, yvalues[x+1]), 0, 25, 0, 255);
    }
    fill(255-val, 0, 255, 100);
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}

function fadeWaveIn(speed) {
  calcWave(speed);
  fadeThisWave(0, fadingIn);
  if (fadingIn < yvalues.length) {
    fadingIn++;
  } else {
    fadingIn = 0;
    return true;
  }
  return false;
}

function fadeWaveOut(speed) {
  calcWave(speed);
  fadeThisWave(fadingIn, yvalues.length);
  if (fadingIn < yvalues.length) {
    fadingIn++;
  } else {
    fadingIn = 0;
    amplitude = [];
    dx = [];
    yvalues = [];
    theta = 0.0;
    return true;
  }
  return false;
}

function fadeThisWave(first, last) {
  noStroke();
  fill(255, 100);
  ellipseMode(CENTER);
  for (let x = first; x < last; x++) {
    let val;
    if (x != 0) {
      val = map(dist(x,yvalues[x], x-1, yvalues[x-1]), 0, 25, 0, 255);
    } else {
      val = map(dist(x,yvalues[x], x+1, yvalues[x+1]), 0, 25, 0, 255);
    }
    fill(255-val, 0, 255, 100);
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}
////////////////
// end wave form
////////////////
