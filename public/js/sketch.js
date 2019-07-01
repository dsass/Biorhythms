const animations = {
    OCEANS: 'ocean',
    DOTS: 'dots',
    WAVE: 'wave',
    ELECTRICITY: 'electricity',
    LINES: 'lines',
    RADIATING: 'radiating',
    DOTSTOO: 'dotstoo'
}

let anim = animations.DOTS;
let newAnim = anim;
let lastAnim;
let lastFrameChanged = 0;
let framesTilTransition = 1200;
let fadedIn = false;
let fadedOut = false;
let fadeMode = 0;

let count = 1;
let clockCount = 0;
let bpm = 0;
let lastAvgBPM = 0;
let socket;
let pulseVal = 0.0;

let slider;
let speed;
let sensorActive = false;
let lastHeartBeatFrame = 0;
let bpmSumOverTime = 0;
let bpmCountForSum = 0;
let doneSyncing = false;

let hand1;
let hand2;

function setup() {
  //resume web audio on first click for Chrome autoplay rules
  function clickHandler(){
		audioContext.resume();
		document.body.removeEventListener( "click", clickHandler );
	}
	document.body.addEventListener( "click", clickHandler );

  //set up canvas
  let wWidth = window.innerWidth;
  let wHeight = window.innerHeight;
  createCanvas(wWidth, wHeight);
  colorMode(RGB, 255, 255, 255, 100);
  noStroke();
  background(0);

  setupAudio();

  socketConnection();
  setUpOceanColors();
  setUpBars();

  anim = randomMode();
  lastAnim = anim;
  setupAnimation(anim);
  hand1 = loadImage('images/minute.svg');
  hand2 = loadImage('images/second.svg');
}

// --------------------------------------------------------
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
// --------------------------------------------------------

function draw() { // ON OCEAN, PLAY SEA SAMPLE WITH SIN(volume)
  // console.log("FRAMERATE: " + frameRate());
  // count+= 0.2;
  background(0, 5);

  // sliderInfo();
  speed = bpm;

  // checking if sensor is active
  if ((frameCount - lastHeartBeatFrame) >= 150) {
    sensorActive = false;
  }
  if (!sensorActive) {
    console.log("sensor inactive");
    speed = 0;
    tickInPlace();
    // anim = animations.RADIATING
    fadeMode = 1;
    // if (anim == animations.RADIATING) {
    //   lastFrameChanged = frameCount - framesTilTransition;
    //   doneSyncing = true;
    //   //change to new one here;
    // }
  }
  // clockScale = 1;

  //time to change animation
  if (bpmCountForSum >= 30 || doneSyncing) { // would need to change it below as well
   //take average of bpms, if higher than last average go up in intensity

    lastFrameChanged = frameCount;
    let avgBPM = bpmSumOverTime/bpmCountForSum;
    console.log("average BPM: " + avgBPM);
    // console.log(bpmCountForSum);
    newAnim = affectedHeartRate(avgBPM + random(-20, 20));
    lastAnim = newAnim;
    // console.log("changing animation to...  " + newAnim);
    if (newAnim != anim) {
      console.log("to fade out");
      fadedOut = false;
      fadeMode = 2;
    // anim = newAnim;
    }
    doneSyncing = false;
    bpmCountForSum = 0;
    bpmSumOverTime = 0;

    lastAvgBPM = avgBPM;
  }

  clockCenter();
  switch (fadeMode) {
    case 0:
      fadeAnimIn(anim);
      break;
    case 1:
      doAnimation(anim);
      break;
    case 2:
      fadeAnimOut(anim, newAnim);
      break;
    default:
  }

  if(anim != animations.OCEANS && anim != animations.LINES) {
    clockCenter();
  }
}

function tickInPlace() {
  let howLong = 40
  if ((frameCount % howLong) == 0) {
    count++;
  } else if(((frameCount-8 ) % howLong) == 0) {
    count--;
  }
}

function setupAnimation(curAnim) {
  console.log("setting up: " + curAnim);
  switch (curAnim) {
    case animations.OCEANS:
      break;
    case animations.DOTS:
      setupDots();
      break;
    case animations.DOTSTOO:
      setupDots();
      break;
    case animations.WAVE:
      setUpWaves();
      break;
    case animations.ELECTRICITY:
      break;
    case animations.LINES:
      setupLines();
      break;
    case animations.RADIATING:
      // setUpBars();
      break;
    default:
  }
}

function doAnimation(curAnim) {
  switch (curAnim) {
    case animations.OCEANS:
      startWaves(speed);
      break;
    case animations.DOTS:
      dots(count);
      break;
    case animations.DOTSTOO:
      dots2(count);
      break;
    case animations.WAVE:
      drawWave(speed);
      break;
    case animations.ELECTRICITY:
      startElectric(speed);
      break;
    case animations.LINES:
      makeLines(speed);
      break;
    case animations.RADIATING:
      radiatingBars(pulseVal);
      break;
    default:
  }
}

function fadeAnimIn(curAnim) {
  switch (curAnim) {
    case animations.OCEANS:
      fadedIn = fadeInOcean(speed);
      break;
    case animations.DOTS:
      fadedIn = fadeInDots(count);
      break;
    case animations.DOTSTOO:
      fadedIn = fadeInDots2(count);
      break;
    case animations.WAVE:
      fadedIn = fadeWaveIn(speed);
      break;
    case animations.ELECTRICITY:
      fadedIn = fadeInElectric(speed);
      break;
    case animations.LINES:
      fadedIn = makeLines(speed);
      break;
    case animations.RADIATING:
      fadedIn = radiatingBars(pulseVal);
      break;
    default:
  }
  if (fadedIn) {
    fadeMode = 1;
    lastFrameChanged = frameCount;
    fadedIn = false;
  }
}

function fadeAnimOut(curAnim, newAnim) {
  switch (curAnim) {
    case animations.OCEANS:
      fadedOut = fadeOutOcean(speed);
      break;
    case animations.DOTS:
      fadedOut = fadeOutDots(count);
      break;
    case animations.DOTSTOO:
      fadedOut = fadeOutDots2(count);
      break;
    case animations.WAVE:
      fadedOut = fadeWaveOut(speed);
      break;
    case animations.ELECTRICITY:
      fadedOut = fadeOutElectric(speed);
      break;
    case animations.LINES:
      fadedOut = fadeOutLines(speed)
      break;
    case animations.RADIATING:
      fadedOut = radiatingBars(pulseVal);
      break;
    default:
  }
  if (fadedOut) {
    fadedOut = false;
    // anim = randomMode();
    anim = newAnim;
    setupAnimation(newAnim);
    fadeMode = 0
  }
}

function randomMode() {
  let toReturn = anim;

  while (toReturn == anim || toReturn == animations.RADIATING) {
    let keys = Object.keys(animations);
    toReturn = animations[keys[Math.floor(Math.random()*keys.length)]];
  }
  // console.log("getting random... " + toReturn);
  return toReturn
}

function affectedHeartRate(bpm) {
  console.log("BPM: " + bpm + ", last avg: " + lastAvgBPM);
  if (bpm > lastAvgBPM) {
    switch (lastAnim) {
      case animations.OCEANS:
        return animations.DOTSTOO;
        break;
      case animations.DOTSTOO:
        return animations.WAVE;
        break;
      case animations.WAVE:
        return animations.DOTS;
        break;
      case animations.DOTS:
        return animations.ELECTRICITY;
        break;
      case animations.ELECTRICITY:
        return animations.LINES;
        break;
      case animations.LINES:
        return animations.LINES;
        break;
      default:
        return randomMode();
    }
  } else if (bpm < lastAvgBPM) {
    switch (lastAnim) {
      case animations.OCEANS:
        return animations.OCEANS;
        break;
      case animations.DOTSTOO:
        return animations.OCEANS;
        break;
      case animations.WAVE:
        return animations.DOTSTOO;
        break;
      case animations.DOTS:
        return animations.WAVE;
        break;
      case animations.ELECTRICITY:
        return animations.DOTS;
        break;
      case animations.LINES:
        return animations.ELECTRICITY;
        break;
      default:
        return randomMode();
    }
  }
}

function socketConnection() {
  socket = io.connect();
  // we listen for message on the socket server called 'data'
  socket.on('data',
    (data) => {
      // console.log('Pulse data: ', data.pulseData);
      let vals = data.pulseData;
      let type = vals.split(' ')[0];
      let inputValue = parseInt(vals.split(' ')[1]);
      if (type === 'Signal:' && inputValue != pulseVal) {
        pulseVal = inputValue;

        // if (anim == animations.RADIATING) {
        //   clockScale = map(pulseVal, 0, 1000, 0.3, 1);
        // }

      } else if (type === 'BPM:') {
        count ++;
        // console.log(frameCount - lastHeartBeatFrame);
        lastHeartBeatFrame = frameCount;
        if (fadeMode == 0) {
          bpmCountForSum = 0;
          bpmSumOverTime = 0;
        }

        if (!sensorActive) {
          // if (fadeMode != 2) {
          //   fadeMode = 2;
          //   newAnim = animations.RADIATING;
          //   fadedOut = false;
          // }

          // if (fadeMode == 0) {
          //
          // }
          // anim = animations.RADIATING;
          // setupAnimation(anim);
          lastFrameChanged = frameCount;
          // bpmCountForSum = 0;
          bpmSumOverTime = 0;
          // lastAvgBPM = 80;
          // fadeMode = 1;
          // newAnim = randomMode();
          // framesTilTransition = 500;
        } else if ( anim == animations.RADIATING && bpmCountForSum >= 4) {

          // lastFrameChanged = frameCount - framesTilTransition + 1;
          doneSyncing = true;
          console.log("change!");
        }

        bpmCountForSum++;
        sensorActive = true;
        bpm = inputValue;
        bpmSumOverTime += bpm;
        tick();
      }
    }
  );
}
