// Create a canvas to draw the game on
var gameCanvas = document.createElement("canvas");
var gameCanvasContext = gameCanvas.getContext("2d");
gameCanvas.width = 512;
gameCanvas.height = 480;

// Add the canvas to the page
document.body.appendChild(gameCanvas);

// Load the background image for the canvas
var imageBackgroundReady = false;
var imageBackground = new Image();

imageBackground.onload = function (){
	// tell the rest of the script that we're ready to draw the background
	imageBackgroundReady = true;
};
imageBackground.src = "images/clover01.jpg";

// Load the Warrior image
var imageWarriorReady = false;
var imageWarrior = new Image();
imageWarrior.onload = function(){
	imageWarriorReady = true;
};
imageWarrior.src = "images/hero-small.png";

// In game objects
var hero = {
	speed : 256, // Movement in pixels per second
	x : 0,		 // Default X location
	y : 0		 // Default Y location
}

// Input handlers
var keysDown = {};

// Use to keep the score
var score = 0;

// Used to store whether the game is running or not
var running = true;

addEventListener("keydown", function(e){
	// Capture a key down event (when the user presses a key)
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	// Capture a key up event (when the user releases a key)
	delete keysDown[e.keyCode];
}, false);

// Starting from the beginning
var reset = function () {
	hero.x = gameCanvas.width / 2;
	hero.y = gameCanvas.height / 2;
};

// Update the positions of all in game objects
var update = function(deltaTime){
	if (running) {
		// If the game is running, then update the objects on screen
		if (imageBackgroundReady && imageWarriorReady){
			// Only do an actual update, if the images have been loaded.
			if(38 in keysDown){ 		// Captured an "Up" arrow key press
				hero.y -= hero.speed * deltaTime;
				if (hero.y <= 0){
					hero.y = 0;
				}
			}
			if(40 in keysDown){			// Captured a "Down" arrow key press
				if (hero.y + imageWarrior.height >= gameCanvas.height){
					// If the current position of hero plus his height already
					// falls outside of the canvas, don't allow him to move)
					hero.y = (gameCanvas.height - imageWarrior.height);
				}
				else{
					// Otherwise move the hero as normal
					hero.y += hero.speed * deltaTime;
				}
			}
			if(37 in keysDown){			// Captured a "Left" arrow key press
				hero.x -= hero.speed * deltaTime;
				if (hero.x <= 0) {
					// Don't allow the hero to go off the canvas (left-hand side)
					hero.x = 1;
				}
			}
			if(39 in keysDown){			// Captured a "Right arrow key press
				if (hero.x + imageWarrior.width >= gameCanvas.width){
					// If the current position of hero plus his width already
					// falls outside of the canvas, don't allow him to move)
					hero.x = (gameCanvas.width - imageWarrior.width);
				}
				else{
					// Otherwise move the hero as normal
					hero.x += hero.speed * deltaTime;
				}
			}
			if (19 in keysDown){
				running = false;
			}
			// Since the score is the number of seconds that the player has
			// survived (i.e. not gotten caught by an enemy), we'll add the
			// delta time number to it here
			score+= deltaTime;
		}
		else{
			// Loading progress bar? Something to let the user know that
			// we're loading the resources and will be back online soon
		}
	}
};


// Rendering function
var render = function() {
	// The render function is layered, so stuff needs to be drawn in the
	// correct order. If you draw the background image last, for example
	// it will be drawn on top of everything else
	if (imageBackgroundReady) {
		// Only draw the background image if we could load it from storage
		gameCanvasContext.drawImage(imageBackground, 0, 0);
	}
	if(imageWarriorReady){
		// Only draw the hero image if we could load it from storage
		gameCanvasContext.drawImage(imageWarrior, hero.x, hero.y);
	}
	
	// Score - number of seconds that the user has stayed alive
	gameCanvasContext.fillStyle = "rgb(250, 250, 250)";
	gameCanvasContext.font = "24px Helvetica";
	gameCanvasContext.textAlign = "left";
	gameCanvasContext.textBaseline = "top";
	// Display the score (time alive) as a 2 decimal place number
	gameCanvasContext.fillText("Score: " + score.toFixed(2), 32, 32);
};

// Main game loop
var main = function(){
	var now = Date.now();
	var Delta = now - then;
	update(Delta / 1000);
	render();
	then = now;
};

// Let's begin
reset();
var then = Date.now();
setInterval(main, 1);
