var express = require('express');
// create a new express server
var cfenv = require('cfenv');
var app = express();
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


const TJBot = require('tjbot');

var hardware = ['led','speaker','camera'];
var configuration = {
	robot: {
        gender: 'female'
    },
    log: {
        level: 'info' // valid levels are 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
    },
	speak: {
		language: 'en-US',
		speakerDeviceId: "plughw:1,0"

	},
    see: {
        confidenceThreshold: {
            object: 0.5,   // only list image tags with confidence > 0.5
            text: 0.1     // only list text tags with confidence > 0.5
        },
        camera: {
            height: 720,
            width: 960,
            verticalFlip: false, // flips the image vertically, may need to set to 'true' if the camera is installed upside-down
            horizontalFlip: false // flips the image horizontally, should not need to be overridden
        }
    }
};

var credentials = {
text_to_speech: {
	username: '',
	password: ''
},
 visual_recognition: {
        api_key: ''
    }	
};

var tj = new TJBot(hardware, configuration, credentials);
//tj.shine("red");

var detect = function() { 
tj.speak("Hello,I'm TeejaYY. What am I looking at??").then(function() {
    tj.see().then(function(output) {
	tj.speak("This looks like a " + output[0].class);
	console.log(output);
	});
});
}

process.stdin.on('keypress', (str, key) => {
	if (key.ctrl && key.name === 'c') {
	    process.exit();
  	} 
	else{	
		detect();
	}
});
	


app.use(express.static(__dirname + '/public'));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
