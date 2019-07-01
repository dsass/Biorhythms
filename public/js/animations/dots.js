////////////////
// dots
////////////////

let dotsrot = 0;
let prevSec = 0;
let myColors;
let dotsOpacity = 0;
let dotsTurns = true;

function setupDots() {
  dotsrot = 0;
  myColors = [];
  for (var i = 0; i < width/20; i++) {
    myColors[i] = [];
    for (var j = 0; j < height/20; j++) {
      myColors[i][j] = color(random(255), random(110), random(180), dotsOpacity);
    }
  }
  // prevSec = 0;
  return myColors;
}

function fadeInDots(speed) {
  dots(speed);
  if (dotsOpacity < 100) {
    dotsOpacity+=0.4;
  } else {
    return true;
  }

  return false;
}

function fadeOutDots(speed) {
  dots(speed);
  if (dotsOpacity > 0) {
    dotsOpacity-=0.4;
  } else {
    myColors = [];
    dotsrot = 0;
    return true;
  }
  return false;
}
function fadeInDots2(speed) {
  dots2(speed);
  if (dotsOpacity < 100) {
    dotsOpacity+=0.4;
  } else {
    return true;
  }

  return false;
}

function fadeOutDots2(speed) {
  dots2(speed);
  if (dotsOpacity > 0) {
    dotsOpacity-=0.4;
  } else {
    myColors = [];
    dotsrot = 0;
    return true;
  }
  return false;
}

function dots(count) {
  push();
  translate(width/2, height/2);
  rotate(dotsrot);
  group1(0);
  rotate(-2*dotsrot);
  group2(0);
  dotsrot += 0.0008;
  if (prevSec != count) {
    dotsrot = 0;
    prevSec = count;
    // setupDots();
  }
  pop();
}
function dots2(count) {
  push();
  translate(width/2, height/2);
  if (prevSec != count) {
    prevSec = count;
    dotsTurns = !dotsTurns;
    // dotsrot += 0.01
  }
  if (dotsTurns) {
    rotate(dotsrot);
    group1(1000);
    rotate(-2*dotsrot);
    group2(1000);
  } else {
    rotate(-dotsrot);
    group2(1000);
    rotate(2*dotsrot);
    group1(1000);
  }

  // console.log(dotsrot);

  pop();
  dotsrot += 0.0008;
}

function group1(shear) {
  let scale = 70;
  for (var i = 0; i < (width+scale)/scale; i++) {
    for (var j = 0; j < (height+scale)/scale; j++) {
      let curColor = myColors[i][j];
      fill(red(curColor), green(curColor), blue(curColor), dotsOpacity);
      // ellipse(i*scale -width/2, j*scale -height/2, 20, 20);
      ellipse(i*scale -width/2, j*scale -height/2, 20 + dotsrot*shear, 20);

    }
  }
}

function group2(shear) {
  let scale = 70;
  for (var i = 0; i < (width+scale)/scale; i++) {
    for (var j = 0; j < (height+scale)/scale; j++) {
      // console.log(myColors[0].length-j);
      let curColor = myColors[myColors.length-i-1][myColors[0].length-j-1];
      fill(red(curColor), green(curColor), blue(curColor), dotsOpacity);
      // ellipse(i*scale - 25 -width/2, j*scale - 35 -height/2, 20, 20);
      ellipse(i*scale - 25 -width/2, j*scale - 35 -height/2, 20, 20 + dotsrot*shear);
    }
  }
}

////////////////
// end dots
////////////////
