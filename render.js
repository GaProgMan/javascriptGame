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
		// Only draw the monster image if we could load it from storage
		gameCanvasContext.drawImage(imageMonster, monster.x, monster.y);
	}
	
	// Score - number of seconds that the user has stayed alive
	gameCanvasContext.fillStyle = "rgb(250, 250, 250)";
	gameCanvasContext.font = "22px Helvetica";
	gameCanvasContext.textAlign = "left";
	gameCanvasContext.textBaseline = "top";
	// Display the score (time alive) as a 2 decimal place number
	gameCanvasContext.fillText("Score: " + score.toFixed(2), 32, 32);
	
	if (!running){
		// Score - number of seconds that the user has stayed alive
		gameCanvasContext.fillStyle = "rgb(250, 255, 255)";
		gameCanvasContext.font = "22px Helvetica";
		gameCanvasContext.textAlign = "left";
		gameCanvasContext.textBaseline = "top";
		// Display the score (time alive) as a 2 decimal place number
		gameCanvasContext.fillText("Paused", (gameCanvas.width/2) - 20, gameCanvas.height/2);
	}
};
