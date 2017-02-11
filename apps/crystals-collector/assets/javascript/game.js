// If the player successfully matches their total score to the random number they get 1 win, if the player's total score is above the random number the player get 1 loss, either way the game restarts.
// When the game is restarted, the player will be shown a new random number, all the crystals will now have 4 different hidden values, and the player's total score is reset to 0.
// Game design note:
// The random number shown at the start of the game should be between 19 - 120
// Each crystal should have a random hidden value between 1 - 12

$(document).ready(function(){

var randomNum = 0; wins = 0; losses = 0; score = 0; 
	
// This function starts a new game by initializing all the variables
function newGame() {
	clearAll();
	randomNum = getRandomNum(19, 120);
	$("#randomNum").html(randomNum);
	setCrystalValues();
	updateScreen();
}

function clearAll() {
    $("#randomNum").empty();
    $("#winslosses").empty();
    $("#score").empty();
	randomNum = 0; 	score = 0;
 }

// The random number shown at the start of the game should be between 19 - 120
// Math.floor(Math.random() * ((y-x)+1) + x);
function getRandomNum(x, y) {
    var randomNum = Math.floor(Math.random() * ((y-x)+1) + x);
    return randomNum;
}

function setCrystalValues() {
	$("#cube").attr("title", getRandomNum(1, 12));
	$("#diamond").attr("title", getRandomNum(1,12));
	$("#esmerald").attr("title", getRandomNum(1,12));
	$("#square").attr("title", getRandomNum(1,12));
}

function updateScreen() {
	$("#score").html(score);
	console.log(wins + " " + losses);
	$("#winslosses").html("Wins:&nbsp;&nbsp;&nbsp;" + wins + "<br />" + "Losses: " + losses);
}


// Start of the game
newGame();

$('.crystal').on('click', function() {        
	score = score + parseInt(this.title);
	if (score == randomNum) {
		wins += 1;
		alert ("You win!");
		newGame();
	} else if (score > randomNum) {
		losses += 1;
		alert ("You lose!");
		newGame();
	}
	else {
		updateScreen();
	}
});


});