	var words = ["ANCHOR", "STARBURST", "CABIN", "CAPTAIN", "CLEAT", "BARNACLE", "LATTITUDE", "LONGITUDE", "OUTBOARD"];
	var availableLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var maskedWord = "";
	var currentWord = "";
	var guessesRemaining = 0;
	var lettersGuessed = "";
	var maxGuesses = 12
	var wins = 0;
	var losses = 0;
	var letters = document.getElementById("letters");
	var output = document.getElementById("output");
	var audio = new Audio("./assets/audio/sailing.wav");
	
	// This function starts a new game by initializing all the variables
	function newGame() {
		lettersGuessed = "";
		maxGuesses = 12
	    currentWord = chooseWord();
		maskedWord = maskWord(currentWord);	  
		guessesRemaining = maxGuesses;
		console.log("Current Word: " + currentWord);

		displayHTML();

		// Listen for the keys the user types
		getKeyPressed();
	}

	// This function will pick a random word from the words array
	function chooseWord () {
		var newWord = words[Math.floor(Math.random() * words.length)];
		return newWord;
	}

	// This function will initialize the word to underscores
	function maskWord(word) {
	    var result = ""; 

		for (i = 0; i < word.length; i ++) {
			result = "_" + result;
		}
		return result;
	}

	// This function will update the HTML on the screen
	function displayHTML() {
		var html = "<p>Press any key to get started!</p>" +
		"<p>Wins: " +  wins + "</p>" +
		"<p>Losses: " +  losses + "</p>" +
		"<p>Current Word<br /><div class=\"letters\">" + maskedWord + "</div></p>" +
		"<p>Letters Already Guessed<br />" + lettersGuessed + "</p>" +
		"<p>Guesses Remaining: " + guessesRemaining + "</p>"

		document.querySelector("#game").innerHTML = html; 
    }

	// This function will substitute the underscore with the letter
	function replaceLetter (i, c, originalString) {
		var result = originalString.substr(0,i) + c + originalString.substr(i + 1,originalString.length); 
	    return result; 
	}

	// This function will validate whether the character typed is valid. Only alphabetical characters allowed.
	function isValidChar(char) {
		if (availableLetters.indexOf(char) >= 0)  {
			return true;
		}
		else {
			return false;
		}
	}

	function alreadyGuessed(char) {
		if (lettersGuessed.indexOf(char) >= 0)  {
			return true;
		}
		else {
			return false;
		}
	}

	// This function will update the masked word with the letter
	function updateLetter(letter, shown, answer) {
	    var checkLetter = -1;

		checkLetter = answer.indexOf(letter);

		while (checkLetter >= 0 && checkLetter < answer.length) {
		    // Replace the letter in shown with replaceLetter() and then store in shown
		    shown = replaceLetter(checkLetter, letter, shown);

		    // Use indexOf() again and store in checkLetter
		    checkLetter = answer.indexOf(letter, checkLetter + 1);
		}

		return shown;
	}

	function getKeyPressed () {
		document.onkeyup = function(event) {
			var keyPressed = String.fromCharCode(event.keyCode).toUpperCase();

	 	   	// If the letter is not alphabetical, ignore
	 	   	if (!isValidChar(keyPressed)) {
	 	   		return;
 	    	}
	    	
	    	// If the letter was already guessed, ignore
	    	if (alreadyGuessed(keyPressed)) {
	    		return;
	    	}

	    	lettersGuessed = lettersGuessed + keyPressed.toUpperCase();
	    	guessesRemaining--;
		   	maskedWord = updateLetter(keyPressed, maskedWord, currentWord);

			//Update the screen
			displayHTML();
		
			if (maskedWord == currentWord) {
				wins++
		    	audio.play();
				alert("You won!!!")
		    	newGame();
	    	} 
	    	else if (guessesRemaining == 0) {
				losses++
				alert("You lost! The correct word was '" + currentWord + "'");
				newGame();
		    }
		}
	}
	
	//Game Steps
	//1. Pick a random word from the array
	//2. Take the player’s letter guess
	//3. Check that the player’s guess is a valid letter
	//4. Keep track of the letters the player has guessed
	//5. Show the player the progress
	//6. Finish when the player has guessed the word or the number of attempts exceed the max

	newGame();


	
