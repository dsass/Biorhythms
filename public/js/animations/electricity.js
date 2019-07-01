// adapted from: https://p5js.org/examples/math-noise-wave.html

let eCount = 0;
let elec0 = true;
let elec1 = false;
let elec2 = false;

function fadeInElectric(speed) {
  background(0);
  let waveRate = map(speed, 0, 255, 0.8, 5.0);
  eCount+= waveRate; //0.002
  if (((eCount + (height+100)/3) % (height+100)) <= 2) {
    elec1 = true;
  }
  if (((eCount + 2*(height+100)/3) % (height+100)) <= 2) {
    elec2 = true;
  }
  if (elec0) electricWaves(eCount, 0, speed);
  if (elec1) electricWaves(eCount, 1, speed);
  if (elec2) electricWaves(eCount, 2, speed);
  if (elec0 && elec1 && elec2) {
    return true;
  }
  return false
}
function fadeOutElectric(speed) {
  background(0);
  let waveRate = map(speed, 0, 150, 0.8, 5.0);
  eCount+= waveRate; //0.002
  if (((eCount) % (height+100)) <= 3) {
    elec0 = false;
  }
  if (((eCount + (height+100)/3) % (height+100)) <= 3) {
    elec1 = false;
  }
  if (((eCount + 2*(height+100)/3) % (height+100)) <= 3) {
    elec2 = false;
  }
  if (elec0) electricWaves(eCount, 0, speed);
  if (elec1) electricWaves(eCount, 1, speed);
  if (elec2) electricWaves(eCount, 2, speed);
  if (!elec0 && !elec1 && !elec2) {
    eCount = 0;
    elec0 = true;
    return true;
  }
  return false;
}

function startElectric(speed) {
  background(0);
  let waveRate = map(speed, 0, 150, 0.8, 5.0);
  eCount+= waveRate; //0.002
  electricWaves(eCount, 0, speed);
  electricWaves(eCount, 1, speed);
  electricWaves(eCount, 2, speed);
}

function electricWaves(myCount, num, speed) {
  push();
  noStroke();
  let mySpeed = (myCount + num*(height+100)/3) % (height+100);
  fill(252, 225, 116);
  // fill(255, 70, 30);
  beginShape();
  let xoff = 0;
  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to
    let y = map(noise(xoff, yoff), 0, 1, height, height+200) - mySpeed;
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += (0.08 * map(num, 0, 2, 1.5, 0.5));
  }
  for (let x = width; x >= 0; x -= 10) {
    let y = map(noise(xoff, yoff), 0, 1, height, height+200) - mySpeed;
    vertex(x, y);
    xoff += (0.08 * map(num, 0, 2, 0.5, 1.5));
  }
  // increment y dimension for noise
  yoff += (0.01 * map(num, 0, 2, 0.5, 1.5) * map(speed, 0, 255, 0.2, 1.5));
  endShape(CLOSE);
  pop();
}
