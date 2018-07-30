

//GLOBAL VARIABLES
//===========================================
var trivia = {
  initialScreen: "",
  correctCounter: 0,
  inCorrectCounter: 0,
  unAnsweredCounter: 0,
  clickSound: new Audio("assets/sounds/button-click.mp3"),
  gameHTML: "",

  questionsArray: ["Which artist made his name with paintings of soup cans and Coca-Cola bottles?", "Who painted The Persistence of Memory?", "Which famous painter and sculptor was also an architect and engineer to Cesare Borgia?", "Which American artist was a pioneer of Abstract Expressionism, and a leading exponent of action painting?", "Which Dutch painter cut off part of his ear after a quarrel?"],
 
  answerArray: [["Joseph A.Cambell", "John Pemberton", "Andy Warhol", "Jean-Michel Basquiat"], ["John B. Forgetfull", "Banksy", "Salvador Dali", "Georgia O'Keefe"], ["Raphael", "Donatello", "Michelangelo", "Leonardo"], ["Kazmir Malevich", "Jackson Pollock", "Henri Matisse", "Pablo Picasso"], ["Vincent Van Gough", "Rembrandt", "Walt Whitman", "Kevin Fauth"],],
 
  correctAnswers: ["C. Andy Warhol", "C. Salvador Dali", "D. Leonardo", "B. Jackson Pollock", "A. Vincent Van Gough"],
 
  imageArray: ["<img class='center-block img-right' src='assets/images/warhol.jpg'>", "<img class='center-block img-right' src='assets/images/dali.jpg'>", "<img class='center-block img-right' src='assets/images/leonardo.jpg'>", "<img class='center-block img-right' src='assets/images/pollock.jpg'>", "<img class='center-block img-right' src='assets/images/vangough.jpg'>"],
  
  clock: "",
  questionCounter: 0,
  timeCounter: 20,
};


//FUNCTIONS
//===========================================
function startScreen(){
  //Create the start button
  trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start!</a></p>";
  //Add Start button to main-area
  $(".main-area").html(trivia.initialScreen);
};

function timer(){
  trivia.clock = setInterval(twentySeconds, 1000);
  function twentySeconds(){
    if(trivia.timeCounter === 0){
      timeOutLoss();
      clearInterval(trivia.clock);
    }
    if(trivia.timeCounter > 0) {
      trivia.timeCounter --;
    }
    $(".timer").html(trivia.timeCounter);
  }
};

function wait(){
  if(trivia.questionCounter < 4) {
    trivia.questionCounter ++;
    generateHTML();
    trivia.timeCounter = 20;
    timer();
  }
  else {
    finalScreen();
  }
};

function win(){
  trivia.correctCounter ++;
  trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
  $(".main-area").html(trivia.gameHTML);
  setTimeout(wait, 4000);
};

function loss(){
  trivia.inCorrectCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 4000);
};

function timeOutLoss(){
  trivia.unAnsweredCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 4000);
};

function finalScreen(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again!</a></p>";
  $(".main-area").html(trivia.gameHTML);
};

function resetGame(){
  trivia.questionCounter = 0;
  trivia.correctCounter = 0;
  trivia.inCorrectCounter = 0;
  trivia.unAnsweredCounter = 0;
  trivia.timeCounter = 20;
  generateHTML();
  timer();
};

function generateHTML(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
  $(".main-area").html(trivia.gameHTML);
}


//MAIN PROCESS
//===========================================
startScreen();

//start-button click
$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	trivia.clickSound.play();
	generateHTML();

	timer();
}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	trivia.clickSound.play();
  //If correct answer
  selectedAnswer = $(this).text();
	if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {

		clearInterval(trivia.clock);
		win();
	}
  //If incorrect ansewr
	else {

		clearInterval(trivia.clock);
		loss();
	}
}); // Close .answer click

//reset-button click
$("body").on("click", ".reset-button", function(event){
	trivia.clickSound.play();
	resetGame();
}); // Closes reset-button click