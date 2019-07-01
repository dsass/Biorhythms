
let bars = [];
let barWidth = 12;
let barCount = 0


// TODO: make this show the live pulse data
function setUpBars() {
  for (var i = 0; i < 60; i++) {
    bars.push(0);
  }
}

function radiatingBars(barSpeed) {
  push();
  background(0);
  translate(width/2, height/2);
  fill(60, 200, 100);
  for (var i = 0; i < 60; i++) {
    push();
    rotate(map(i, 0, 59, 0, 2*PI));
    if ((barCount % 60) == i) {

      if (barSpeed == 0) {
        bars[i] = map(noise(barCount) + random(0, 1), 0, 2, 1, 1000);
      } else {
        bars[i] = barSpeed;
      }
    }
    rect(-barWidth/2, 160, barWidth, map(bars[i], 0, 1000, 0, 200));
    pop();
  }

  barCount ++;

  pop();
  return true;
}

function fadeOutBars(barSpeed) {
  push();
  background(0);
  translate(width/2, height/2);
  fill(60, 200, 100);
  for (var i = 0; i < 60; i++) {
    push();
    rotate(map(i, 0, 59, 0, 2*PI));
    if ((barCount % 60) == i) {
      bars[i] = 0;
    }
    rect(-barWidth/2, 160, barWidth, map(bars[i], 0, 1000, 0, 300));
    pop();
  }

  barCount ++;

  pop();
  const arrSum = bars => bars.reduce((a,b) => a + b, 0)
  if (arrSum = 0) {
    return true;
  }
  return false;
}
