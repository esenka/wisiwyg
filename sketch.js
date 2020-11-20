//------ COCOSSD VARS ------
// let img;
let video;
let detector;
let detections = [];
let temporaryLabels = [];
let finalLabels = [];
let button, greeting;

// ------- CHARRNN VARS --------
let charRNN;
let textInput;
let lengthSlider;
let tempSlider;
let runningInference = false;
let status; 

let lengthText;
let temperatureText;

let resultText;

function setup() {

	// ------- COCOSSD SETUP --------
	createCanvas(640, 480);
	video = createCapture(VIDEO);
	video.size(640, 480);
	video.hide();
	detector.detect(video, gotDetections);

	button = createButton("generate title");
	button.position(height, width);
	button.mousePressed(generateTitle);

	// ------- CHARRNN SETUP --------
	// Create the LSTM Generator passing it the model directory
	charRNN = ml5.charRNN('./models/woolf/', modelReady);

	// Grab the DOM elements
	status = document.querySelector('#status')
	resultText = document.querySelector('#result')
}

function draw() {
	// ------- COCOSSD DRAW --------
	image(video, 0, 0);
	fill(0);
	rect(10, 10, 10, 10);
	console.log(detections.length);

	for (let i = 0; i < detections.length; i++) {
		let object = detections[i];
		stroke(0, 255, 0);
		strokeWeight(4);
		noFill();
		rect(object.x, object.y, object.width, object.height);
		noStroke();
		fill(255);
		textSize(24);
		text(object.label, object.x + 10, object.y + 24);
		//store labels dynamically with each detection
		temporaryLabels[i] = object.label;
	}
}




