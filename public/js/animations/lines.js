////////////////
// lines
////////////////

let lines = [];

function setupLines() {
  lines = [];
  for (var i = 0; i < 200; i++) {
    lines.push([random(-height, width-50), random(height, 2*height), random(0.1, 1)]);
  }
}

function makeLines(bpm) {
  push();
  stroke(255);
  fill(255);
  for (var i = 0; i < lines.length; i++) {
    let newVal = map(bpm, 0, 150, 1, 8);
    line(lines[i][0], lines[i][1], lines[i][0]-150, lines[i][1]+150);
    lines[i][0] += newVal*lines[i][2];
    lines[i][1] -= newVal*lines[i][2];
    if (lines[i][0] > width || lines[i][1] < 0) {
      lines[i] = [random(-height, width-50), random(height, 2*height), random(0.1, 1)];
    }
  }
  pop();
  return true;
}

function fadeOutLines(bpm) {
  // console.log("fading out lines...");
  push();
  stroke(255);
  fill(255);
  if (lines.length == 0) {
    pop();
    return true;
  }
  for (var i = 0; i < lines.length; i++) {
    let newVal = map(bpm, 0, 155, 0, 15);
    if (lines[i][2] < 0.8) {
      lines[i][2] = 0.8;
    }
    line(lines[i][0], lines[i][1], lines[i][0]-150, lines[i][1]+150);
    lines[i][0] += newVal*lines[i][2];
    lines[i][1] -= newVal*lines[i][2];
    if (lines[i][0] > width || lines[i][1] < 0) {
      lines.pop(i);
    }
  }
  pop();
  return false;
}
////////////////
// end lines
////////////////
