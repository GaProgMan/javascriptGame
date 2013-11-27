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

var imageMonsterReady = false;
var imageMonster = new Image();
imageMonster.onload = function(){
	imageMonsterReady = true;
};
imageMonster.src = "images/monster.png";

// In game objects
var hero = {
	speed : 256, // Movement in pixels per second
	x : 0,		 // Default X location
	y : 0		 // Default Y location
}

var monster = {
	speed : 60,
	x : 0,
	y : 0
}

// Use to keep the score
var score = 0;

// Used to store whether the game is running or not
var running = true;

// Starting from the beginning
var reset = function () {
	hero.x = gameCanvas.width / 2;
	hero.y = gameCanvas.height / 2;
	
	monster.x = gameCanvas.width / 4;
	monster.y = gameCanvas.height / 4;
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
