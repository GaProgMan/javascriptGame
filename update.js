// Input handlers
var keysDown = {};

// This needs re-writing. It works, in that the location of the touch is
// registered, but the move isn't used to move the character fully
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

// Update the positions of all in game objects
var update = function(deltaTime){
	if (19 in keysDown){
		running = !running;
		delete keysDown[19];
	}
	
	if (running && !gameOver) {			
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
			// Multiply the vector between the monster and the hero
			// by the monster speed plus the detla from the last frame
			monster.x += (hero.x - monster.x) * (monster.speed * deltaTime);
			monster.y += (hero.y - monster.y) * (monster.speed * deltaTime);

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
			gameOver = true;
		}
}
