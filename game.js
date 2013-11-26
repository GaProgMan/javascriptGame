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

// Input handlers
var keysDown = {};

// Use to keep the score
var score = 0;

// Used to store whether the game is running or not
var running = true;

addEventListener("touchmove", function(e){
	if(e.targetTouches.length == 1){
		// Is there only 1 finger touching the screen
		// within this context?
		var touch = event.targetTouches[0];
		// Place the hero where the touch is
		hero.x = touch.pageX;
		hero.y = touch.pageY;
	}
}, false);

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
	
	monster.x = gameCanvas.width / 4;
	monster.y = gameCanvas.height / 4;
};

// Update the positions of all in game objects
var update = function(deltaTime){
	if (running) {
		// If the game is running, then update the objects on screen
		if (imageBackgroundReady && imageWarriorReady && imageMonsterReady){
			// Only do an actual update, if the images have been loaded.
			if(38 in keysDown){ 		// Captured an "Up" arrow key press
				hero.y -= hero.speed * deltaTime;
			}
			if(40 in keysDown){			// Captured a "Down" arrow key press
				hero.y += hero.speed * deltaTime;
			}
			if(37 in keysDown){			// Captured a "Left" arrow key press
				hero.x -= hero.speed * deltaTime;
			}
			if(39 in keysDown){			// Captured a "Right arrow key press
				hero.x += hero.speed * deltaTime;
			}
			
			// Let's move the monster
			var direction = Math.floor((Math.random()*4)+1);
			switch (direction){
				case 1:
					// Up
					monster.y -= monster.speed * deltaTime;
					break;
				case 2:
					// Down
					monster.y += monster.speed * deltaTime;
					break;
				case 3:
					// Left
					monster.x -= monster.speed * deltaTime;
					break;
				case 4:
					// Right
					monster.x += monster.speed * deltaTime;
					break;
			}
			
			if (19 in keysDown){
				running = false;
			}
			// Since the score is the number of seconds that the player has
			// survived (i.e. not gotten caught by an enemy), we'll add the
			// delta time number to it here
			score+= deltaTime;
			
			checkPositions();
		}
		else{
			// Loading progress bar? Something to let the user know that
			// we're loading the resources and will be back online soon
		}
	}
};

var checkPositions = function() {
	// Used to check the positions of all on-screen objects.
	// If they move off the canvas, we place them at the edge.
	
	// First, the hero
	if (hero.x + imageWarrior.width >= gameCanvas.width){
		// If the current position of hero plus his width already
		// falls outside of the canvas, don't allow him to move
		hero.x = (gameCanvas.width - imageWarrior.width);
	}
	if (hero.x <= 0){
		// If the current x position of the hero is less
		// than or equal to 0, set it to 1 (none of his
		// pixels will fall off-screen, that way)
		hero.x = 1;
	}
	if (hero.y + imageWarrior.height >= gameCanvas.height){
		// If the current position of hero plus his height already
		// falls outside of the canvas, don't allow him to move
		hero.y = (gameCanvas.height - imageWarrior.height);
	}
	if(hero.y <= 0){
		// If the current y position of the hero is less
		// than or equal to 0, set it to 0 (none of his
		// pixels will fall off-screen, that way)
		hero.y = 0;
	}
	
	// Now, the monster
	if (monster.x + imageMonster.width >= gameCanvas.width){
		// If the current position of monster plus his width already
		// falls outside of the canvas, don't allow him to move 
		monster.x = (gameCanvas.width - imageMonster.width);
	}
	
	if (monster.x <= 0){
		// If the current x position of the monster is less
		// than or equal to 0, set it to 1 (none of his
		// pixels will fall off-screen, that way)
		monster.x = 1;
	}
	
	if (monster.y + imageMonster.height >= gameCanvas.height){
		// If the current position of monster plus his width already
		// falls outside of the canvas, don't allow him to move 
		monster.y = (gameCanvas.height - imageMonster.height);
	}
	if(monster.y <= 0){
		// If the current y position of the monster is less
		// than or equal to 0, set it to 0 (none of his
		// pixels will fall off-screen, that way)
		monster.y = 0;
	}
	
	// And now for collision detection with the enemy
	if (hero.x <= (monster.x + imageMonster.width / 2) &&
		monster.x <= (hero.x + imageWarrior.width / 2) &&
		hero.y <= (monster.y + imageMonster.height / 2) &&
		monster.y <= (hero.y + imageWarrior.height / 2))
		{
			// Yes - tell the render method to stop running
			running = false;
		}
}


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
	if(imageMonsterReady){
		gameCanvasContext.drawImage(imageMonster, monster.x, monster.y);
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
