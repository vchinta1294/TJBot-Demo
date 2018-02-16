
// create a new express server
var app = express();
const TJBot = require('tjbot');

var hardware = ['led','speaker','camera'];
var configuration = {
    log: {
        level: 'info' // valid levels are 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
    },
	speak: {
		language: 'en-US',
		speakerDeviceId: "plughw:0,0"

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
	username: '2e9398a9-87ed-43bf-a1c2-adb6c2d1b37f',
	password: 'T2DZcuSFcKok'
},
 visual_recognition: {
        api_key: '526cc0649087a07bc34476047eea0b7105b8bd48'
    }	
};

var tj = new TJBot(hardware, configuration, credentials);
tj.shine("red");

//tj.speak("I'm TeeJayy, Hmm, what am I looking at??").then(function() {
  //  tj.see().then(function(output) {	
	//	tj.speak(output[0].class);
	//	console.log(output);
	//});
//});
	


app.use(express.static(__dirname + '/public'));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
