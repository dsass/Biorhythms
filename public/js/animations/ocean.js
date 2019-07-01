// adapted from: https://p5js.org/examples/math-noise-wave.html

let wCount = 4.55;
let colors = [];
let yoff = 0.0;
let waveTransition = 0;

function setUpOceanColors() {
  let opac = 40;
  colors.push(color(223, 232, 239, opac));
  colors.push(color(161, 202, 218, opac));
  colors.push(color(57, 137, 184, opac));
  colors.push(color(23, 70, 125, opac));
  colors.push(color(5, 28, 69, opac));

  colors.push(color(5, 28, 69, opac));
  // colors.push(color(5, 28, 69, opac));
}

function fadeInOcean(oceanSpeed) {
  push();
  // translate(0, 200-waveTransition);
  // console.log("fading in: " + waveTransition);
  waveTransition++
  wCount = 4.55;
  startWaves(0);
  if (waveTransition >= 200) {
    pop();
    return true;
  }
  pop();
  return false;
}

function fadeOutOcean(oceanSpeed) {
  push();
  if (sin(wCount) <= sin(4.55)) {
    wCount = 4.55;
    waveTransition--;
  }
  if (waveTransition == 0) {
    // colors = [];
    wCount = 4.55;
    yoff = 0.0;
    pop();
    return true;
  }
  startWaves(oceanSpeed);
  pop();
  return false
}

function startWaves(oceanSpeed) {
  noStroke();
  if (oceanSpeed != 0) {
    oceanSpeed = 70;
  }
  waveRate = map(speed, 0, 155, 0.0005, 0.008);
  wCount+= waveRate; //0.002

  for (var i = 0; i < colors.length; i++) {
    let y = i*100 + 200;
    makeWaves(y, y + 100, colors[i], wCount + i*0.2);
  }
}

function makeWaves(y1, y2, c, myCount) {
  push();
  rotate(0.2);
  fill(c);
  // We are going to draw a polygon out of the wave points
  beginShape();
  let xoff = 0; // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise
  // Iterate over horizontal pixels
  for (let x = 0; x <= width*1.2; x += 10) {
    // Calculate a y value according to noise, map to
    // Option #1: 2D Noise
    let y = map(noise(xoff, yoff), 0, 1, y1, y2) - sin(myCount)*300 + (200-waveTransition);
    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.04;
  }
  // increment y dimension for noise
  yoff += 0.001;
  vertex(width*1.2, height);
  vertex(0, height);
  endShape(CLOSE);
  pop();
}
