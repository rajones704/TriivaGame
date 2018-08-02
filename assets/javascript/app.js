var trivia = {
  firstScreen: "",
  correctCounter: 0,
  inCorrectCounter: 0,
  gameHTML: "",

  questionsArray:

    ["Which artist made his name with paintings of soup cans and Coca-Cola bottles?",

      "Who painted The Persistence of Memory?", "Which famous painter and sculptor was also an architect and engineer to Cesare Borgia?",

      "Which American artist was a pioneer of Abstract Expressionism, and a leading exponent of action painting?",

      "Which Dutch painter cut off part of his ear after a quarrel?"],

  answerArray:

    [["Joseph A.Cambell", "John Pemberton", "Andy Warhol", "Jean-Michel Basquiat"],

    ["John B. Forgetfull", "Banksy", "Salvador Dali", "Georgia O'Keefe"],

    ["Raphael", "Donatello", "Michelangelo", "Leonardo"],

    ["Kazmir Malevich", "Jackson Pollock", "Henri Matisse", "Pablo Picasso"],

    ["Vincent Van Gough", "Rembrandt", "Walt Whitman", "Bob Ross"],],

  correctAnswers: ["C. Andy Warhol", "C. Salvador Dali", "D. Leonardo", "B. Jackson Pollock", "A. Vincent Van Gough"],

  imageArray: ["<img class='center-block img-right' src='assets/images/warhol.jpg'>", "<img class='center-block img-right' src='assets/images/dali.jpg'>",
    "<img class='center-block img-right' src='assets/images/leonardo.jpg'>",
    "<img class='center-block img-right' src='assets/images/pollock.jpg'>",
    "<img class='center-block img-right' src='assets/images/vangough.jpg'>"],

  clock: "",
  questionCounter: 0,
  timeCounter: 20,
};


//ALL FUNCTIONS
function startScreen() {
  //Create the start button
  trivia.firstScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start!</a></p>";
  //Add Start button to main-area
  $(".main-area").html(trivia.firstScreen);
};

function timer() {
  trivia.clock = setInterval(twentySeconds, 1000);
  function twentySeconds() {
    if (trivia.timeCounter === 0) {
      timeOutLoss();
      clearInterval(trivia.clock);
    }
    if (trivia.timeCounter > 0) {
      trivia.timeCounter--;
    }
    $(".timer").html(trivia.timeCounter);
  }
};

function wait() {
  if (trivia.questionCounter < 4) {
    trivia.questionCounter++;
    generateHTML();
    trivia.timeCounter = 20;
    timer();
  }
  else {
    finalScreen();
  }
};

function win() {
  trivia.correctCounter++;

  trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" +

    "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];

  $(".main-area").html(trivia.gameHTML);

  setTimeout(wait, 4000);
};

function loss() {
  trivia.inCorrectCounter++;

  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" +

    "<p class='text-center'>Wrong! The correct answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];

  $(".main-area").html(trivia.gameHTML);

  setTimeout(wait, 4000);
};

function timeOutLoss() {

  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" +

    "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];

  $(".main-area").html(trivia.gameHTML);

  setTimeout(wait, 4000);
};

function finalScreen() {
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" +

    "<p class='text-center'>Your Final Score!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter +

    "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" +  "</p>" +

    "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again!</a></p>";

  $(".main-area").html(trivia.gameHTML);
};

function resetGame() {
  trivia.questionCounter = 0;
  trivia.correctCounter = 0;
  trivia.inCorrectCounter = 0;
  trivia.timeCounter = 0;
  generateHTML();
  timer();
};

function generateHTML() {
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>"

    + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. " +

    trivia.answerArray[trivia.questionCounter][1] + "</button><br><button class='answer'>C. " + trivia.answerArray[trivia.questionCounter][2] +

    "</button><br><button class='answer'>D. " + trivia.answerArray[trivia.questionCounter][3] + "</button>";

  $(".main-area").html(trivia.gameHTML);
}


//START/STOP

startScreen();

//start-button click
$("body").on("click", ".start-button", function (event) {
  event.preventDefault();
  generateHTML();

  timer();
}); //<<<<<STOPS start-button click

$("body").on("click", ".answer", function (event) {
  //CORRECT ANSWER
  selectedAnswer = $(this).text();
  if (selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {

    clearInterval(trivia.clock);
    win();
  }
  // WRONG ANSWER
  else {

    clearInterval(trivia.clock);
    loss();
  }
}); // Closes .answer click

//reset-button click
$("body").on("click", ".reset-button", function (event) {
  resetGame();
}); // Closes reset-button click