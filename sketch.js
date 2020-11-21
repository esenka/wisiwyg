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

// ------- ATTNGAN VARS --------
let raw = new Image();

// connect to runway via HTTP
let url = 'http://localhost:8000/query';


//define variables
let input_text;
let post_image;
let send_btn;
let newimg;
let img;

var rightBuffer;


function setup() {

	// ------- COCOSSD SETUP --------
	createCanvas(1920, 480);
	video = createCapture(VIDEO);
	video.size(640, 480);
	video.hide();
	detector.detect(video, gotDetections);

	button = createButton("generate title");
	button.position(height, 600);
	button.mousePressed(generateTitle);

	// ------- CHARRNN SETUP --------
	// Create the LSTM Generator passing it the model directory
	charRNN = ml5.charRNN('./models/woolf/', modelReady);

	// Grab the DOM elements
	status = document.querySelector('#status')
	resultText = document.querySelector('#result')
	
	// ------- ATTNGAN SETUP --------

	rightBuffer = createGraphics(400, 400);

	//create a text input with P5 Dom Library
	input_text = createInput('');

	// input_text.position(500, 100);
	input_text.input(sendText);
	// input_text.addClass("form-control");
	// input_text.parent("input")


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

// ------- ATTNGAN DRAW --------

	if(img){
    fill(255);
    imageMode(1000,500);
    image(img, width/2, 250, 600, 600);
  }
}


//create a text input with P5 Dom Library
  input_text = createInput('');
  input_text.position(500, 100);
  input_text.input(sendText);
  input_text.addClass("form-control");
  input_text.parent("result")

function newDrawing(data){
  //get the results form Runway
  //if there is data with a key of result
  //create an image
    if(data && data.result) {
      newimg = createImg(data.result);
      newimg.attribute('width', 400)
      newimg.attribute('height', 400)
      newimg.position(1000, 280);
    }

}


function sendText() {
  //send the text to Runway via HTTP. The this.value is the value
  //of the input text
    console.log('you are typing: ', this.value());

    postData = { caption: this.value()};

  httpPost(url, 'json', postData, function(result) {
    newDrawing(result)
  });
}
