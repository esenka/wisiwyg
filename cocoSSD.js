// ------- COCOSSD SPECIFIC FUNCTIONS --------

function preload() {
  // img = loadImage('dog_cat.jpg');
  detector = ml5.objectDetector("cocossd");
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function generateTitle() {
  //store labels in storeLabels array to be used with attnGAN and charRNN
  finalLabels.splice(0);
  
  finalLabels.splice(
    0,
    0,
    temporaryLabels[0],
    temporaryLabels[1],
    temporaryLabels[2]
  );
  print("final labels are " + finalLabels);

  // prevent starting inference if we've already started another instance
  if (!runningInference) {
    runningInference = true;

    // Update the status log
    status.innerHTML = 'Generating...';

    // Make it to lower case
    const txt = finalLabels.toString();

    // This is what the LSTM generator needs
    // Seed text, temperature, length to outputs
    // TODO: What are the defaults?
    const data = {
      seed: txt,
      temperature: 1,
      length: random(15, 40)
    };

    // Generate text with the charRNN
    charRNN.generate(data, gotData);

    // When it's done
    function gotData(err, result) {
      // Update the status log
      status.innerHTML = 'Ready!';
      resultText.innerHTML = txt + result.sample;
      runningInference = false;
    }
  }
}