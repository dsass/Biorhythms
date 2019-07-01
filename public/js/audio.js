//set AudioContext class for compatibility
let AudioContext = window.AudioContext || window.webkitAudioContext;

//create audio context
const audioContext = new AudioContext();

//setup master gain
const masterGain = audioContext.createGain();
masterGain.connect( audioContext.destination );
masterGain.gain.value = 1;

//setup bus and effects
const compressor = audioContext.createDynamicsCompressor();
// compressor.threshold.value = -30;
// compressor.knee.value = 30;
// compressor.ratio.value = 3;
// compressor.attack.value = .1;
// compressor.release.value = 0.15;
// compressor.reduction = -20;
compressor.connect(masterGain);

const submixGain = audioContext.createGain();
submixGain.connect( compressor );

const effectGain = audioContext.createGain();
effectGain.connect( compressor );

let polyVoice;
let voice;

function setupAudio() {

  polyVoice = new PolyVoice( { audioContext, VoiceClass: Voice } );
	polyVoice.output.connect( submixGain );
	voice = polyVoice.currentVoice;

	let sampleURLs = ["samples/tick.wav"];

	AudioBufferLoader.load( sampleURLs, audioContext )
	  .then( buffers => {
	    polyVoice.voiceMap.forEach( voice => {
	      voice.buffers = buffers;
	    })
	  });
}

function tick() {
  // if(voice){
  //   voice.stop();
  // }
  voice = polyVoice.currentVoice;
  let samplePosition = 0;
  polyVoice.start( samplePosition );
  // voice.detune.value = -500;
	voice = polyVoice.currentVoice;
}
