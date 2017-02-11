$(document).ready(function(){
var counter;
var timeLimit = 5; correctCount = 0; incorrectCount = 0; unansweredCount = 0; questionNum = 0;
var result = ""; correctAnswer = "";
var number = timeLimit;

var trivia = [{
     question: "The land God gave the Israelites was flowing with what?",
     choices: ["The purest water", "Milk", "Milk and Honey", "Honey", "A river of fire"],
     answer: 2
  }, {
     question: "God rescued the Israelites from what in Egypt?",
     choices: ["Bondage", "Debauchery", "Idolatry", "Adultery", "None of the above"],
     answer: 0
  }, {
     question: "If the Israelites observed the commandments, it would be to their what?",
     choices: ["Righteousness", "Detriment", "Forgiveness", "Best interests", "Love"],
     answer: 0
  }, {
     question: "In the new land, the Israelites where not to do what with their former enemies?",
     choices: ["Make covenants", "Worship", "Dine with", "Forgive", "Marry"],
     answer: 4
  }, {
     question: "Why should the Israelites not bring an abomination into their house?",
     choices: ["God is a jealous God", "Could become cursed like it", "Could be enticed away from God", "Could become possessed", "None of the above"],
     answer: 1
  }];

 var unansweredCount = question.length;

// This function will display a new question and its associated answer choices
function showQuestion() {	
	if (questionNum < trivia.length) {
	    $("#result").empty();
	    $("#question").html("<p>" + trivia[questionNum].question + "</p>");
	    $("#question").show();
	    showChoices();
	    resetTimer();
	    startTimer();
	}
	else {
	    // After all the questions have been asked, display the results
	    var unansweredCount = trivia.length - correctCount - incorrectCount;
		stopTimer();
		result = "<p>All done, here's how you did!</p>";
		result = result + "<p>Correct Answers: " + correctCount + "</p>";
		result = result + "<p>Incorrect Answers: " + incorrectCount + "</p>";
		result = result + "<p>Unanswered: " + unansweredCount + "</p>";
		$("#btnStart").text("Start Over");
		$("#btnStart").show();
		$("#timer").hide();
		$("#question").hide();
		$("#choices").hide();
		displayResult(result, false);
	}
}

// This function will display all of the available answer choices for a question
function showChoices() {
    var buttons = $("#choices");
 
	buttons.empty();

    // Dynamically add buttons for each answer choice
    for (var i = 0; i < trivia[questionNum].choices.length; i++) {
    	var button = "";
	   	button = '<button type="button" id="btnChoice" class="btn btn-secondary" value=' + i + '>' + trivia[questionNum].choices[i] + '</button>';
      	buttons.append(button);
    }
    $("#choices").show();
}

// This will display the results of choice made (either correct or incorrect) for 2 seconds
function displayResult(result, doTimeout) {
	$("#result").html(result);
	$("#result").show();
	$("#choices").hide();
	if (doTimeout) {
		var resultTimeout = setTimeout(wait, 1 * 1000);
	}
}

function wait() {
    questionNum++;
	showQuestion(questionNum);
}

function showTimer() {
    $("#timer").html("<p>Time remaining: " + number + " seconds</p>");
}

function startTimer() {
    counter = setInterval(decrement, 1000);
	showTimer()
}

function stopTimer() {
    clearInterval(counter);
}

function resetTimer() {
 	stopTimer();
    number = timeLimit;
    showTimer();
}

function decrement() {
    number--;
    showTimer();
    if (number == 0) {
    	outOfTime();
    }
}

function outOfTime () {
    stopTimer();
    correctAnswer = trivia[questionNum].answer;
 	result = "<p>Out of Time!</p>";
 	result = result + "<p>The correct answer was: </p>" + trivia[questionNum].choices[correctAnswer];
	displayResult(result, true);
}

// This function initializes variables
function newGame() {
    correctCount = 0; incorrectCount = 0; questionNum = 0; correctAnswer = ""
	resetTimer();
	$("#timer").show();
	$("#question").show();
	$("#choices").show();
	$("#result").empty();
}

$("#btnStart").on("click", function() {  
	newGame();
	$("#btnStart").hide();
	showQuestion();
});


// $(selector).on(event,childSelector,data,function,map)
// childSelector - Optional. Specifies that the event handler should only be attached to the specified child elements (and not the selector itself)

$("#choices").on("click", "button", function() {
    stopTimer();
  	
	var buttonClicked = this;
     
    // get the value of the button that was clicked
	var selectedChoice = buttonClicked.value;

    // this is the correct answer to the question
	correctAnswer = trivia[questionNum].answer;

 	if (selectedChoice == correctAnswer) {
		correctCount++
		result = "<p>Correct!</p>";
	}
	else {
		incorrectCount++
		result = "<p>Nope!</p>";
		result = result + "<p>The correct answer was: </p>" + trivia[questionNum].choices[correctAnswer];
	}
	
	displayResult(result, true);
});


// Start of the game
$("#choices").hide();
$("#btnStart").show();

});