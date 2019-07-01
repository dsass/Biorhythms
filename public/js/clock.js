let clockScale = 1;

function clockCenter() {
  push();

  translate(width/2, height/2);
  scale(clockScale);
  noStroke();
  fill(0, 30);
  ellipse(5, 5, 300, 300);
  fill(0, 10);
  ellipse(6, 6, 305, 305);
  fill(0, 5);
  ellipse(7, 7, 307, 307);
  // fill(0, 15);
  // ellipse(6, 3, 300, 300);
  fill(210);
  // fill(180);

  stroke(0);
  strokeWeight(4);
  ellipse(0, 0, 300, 300);

  noFill();

  push();
  ellipse(0, 0, 260, 260);
  strokeWeight(2);
  rotate(PI/8);
  for (i = 0; i < 12; i++) {
    line(-5, -150, -5, -130);
    line(50, -141, 5, -130);
    rotate(2 * PI / 12);
  }
  pop();

  neuMinuteHand(150);
  neuSecondHand(140);

  fill(0);
  stroke(255);
  // ellipse(0, 0, 12, 12);
  pop();
}

// second hand displaying my count
function neuSecondHand(size) {
  push();
  fill(0)
  let sec = floor(count);
  secRotation = sec % 60;
  let secRotate = map(sec, 0, 59, 0, 2*PI);
  rotate(secRotate);
  // rect(-3, -size, 6, size);
  image(hand2, -67, -126, 160, 160);
  // ellipse(0, -20, 6, 40);
  pop();
}

// minute hand displaying my count
function neuMinuteHand(size) {
  push();
  // fill(0);
  fill(250, 50, 115);
  let minu = floor(count);
  minRotation = minu % 3600;
  let minRotate = map(minRotation, 0, 3599, 0, 2*PI);
  rotate(minRotate);
  image(hand1, -77, -107, 150, 150);
  // rect(-4, -size/2, 8, size/2);
  pop();
}

// minute hand displaying real time
function realMinuteHand(size) {
  push();
  translate(width/2, height/2);
  let minu =  minute();
  let minRotate = map(minu, 0, 59, 0, 2*PI);
  rotate(minRotate);
  fill(250, 50, 115);
  rect(-4, -size/2, 8, size/2);
  pop();
}

// second hand displaying real time
function realSecondHand(size) {
  push();
  translate(width/2, height/2);
  let sec = second();
  let secRotate = map(sec, 0, 59, 0, 2*PI);
  rotate(secRotate);
  fill(250, 50, 115);
  rect(-3, -size, 6, size);
  pop();
}

function sliderHands(size) {
  realMinuteHand(150);
  push();
  translate(width/2, height/2);
  fill(0)
  let rotation = map(clockCount, 0, 60, 0, 2*PI);
  rotate(rotation);
  rect(-3, -size, 6, size);
  pop();
  push();
  translate(width/2, height/2);
  fill(0);
  ellipse(0, 0, 10, 10);
  pop();
}
