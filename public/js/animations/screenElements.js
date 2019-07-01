function heart(x, y, size) {
  push();
  textSize(15);
  fill(255);
  text('BPM: ' + bpm, width-100, height-50);
  noStroke();
  fill(250, 50, 115);
  translate(x, y);
  rotate(PI/4);
  rectMode(CENTER);
  rect(0, 0, size, size);
  ellipse(-size/2, 0, size, size);
  ellipse(0, -size/2, size, size);
  pop();
}

function sliderControl() {
  slider = createSlider(40, 120, 70);
  slider.position(width/2 - 80, 10);
}

function sliderInfo() {
  push();
  textSize(15);
  fill(255);
  text('BPM: ' + bpm, width-100, height-50);
  text('pulse: ' + pulseVal, width-100, height-30);

    // Slider
  speed = slider.value();
  let rate = round(map(speed, 0, 255, 150, 15));
  if ((frameCount % rate) == 0) {
    clockCount++;
    gCount = 299;
    // tick();
  }
}
