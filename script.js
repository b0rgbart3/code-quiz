
//   Data -- an object with questions and answers
//   This is an array of question objects that contain
//   the following keys:  question, options, correct, points
//   question:  a string
//   options:  an array of strings
//   correct:  an index into the array of options, for the correct answer
//   points:  a point value to score this question based on
//            it's difficulty level

var sand = 6;
var javascriptQuestions = [
    { question: "Commonly used datatypes in JavaScript DO NOT include:",
     options: ["strings","booleans","alerts","numbers"],
     correct: 2,
     points: 5
    },
    { question: "Arrays in JavaScript can be used to store:",
        options: ["numbers and strings","other arrays","booleans","all of the above"],
        correct: 3,
        points: 4
    },
    { question: "The condition in an if/else statement is enclosed within ______:",
    options: ["quotes","curly brackets","parenthesis","square brackets"],
    correct: 2,
    points: 4
},
    ];

var questionSet = [javascriptQuestions];
var questionNumber = 0;

// keep track of answered questions, and their values with an array of objects
var answeredQuestions = [];

// Loop through the questions in the questionObject
// Present the question to the user, with buttons for each option
// when the user selects an option, determine if it was correct,
// then let them know if they got it right or not, and keep track of their score
// At the end of the questions, present the user with their score and ask
// for their initials, and store their initials and score 

var chosenSetIndex = 0;
var questions = questionSet[chosenSetIndex];
var questionTimer;
var score = 0;
var waiting = false;
var gameOver = false;

var correctDisplayText = document.getElementById('correct-display');
var incorrectDisplayText = document.getElementById('incorrect-display');
var startButton = document.getElementById('start-button');
var questionBody = document.getElementById('question-body');

startButton.onclick=function() {

    startButton.style.display = "none";
    questionBody.style.display = "block";
    // Kick off the Quiz
    startQuiz();
};

var displayQuestion = function(question) {

    // take the question object and create DOM elements to display the
    // various parts
    var questionDiv = document.getElementById('question-div');
    var questionTitle = document.createElement('h1');
    var questionNumberDisplayText = document.getElementById('question-number');

    questionNumberDisplayText.textContent = questionNumber+1;
    console.log(window);
    
    // Title--------------
    questionTitle.textContent = question.question;

    // If there is already a title nodes, let's start by removing it
    if (questionDiv.firstChild) { questionDiv.firstChild.remove(); }
    questionDiv.appendChild(questionTitle);

    // Options-------------

    displayOptions(question);
}

var displayOptions = function(question) {
      var optionsDiv = document.getElementById('options-div');
      // If there are already child nodes, let's start by removing them
      while( optionsDiv.firstChild ) { optionsDiv.firstChild.remove(); }

      var questionButtons = [];
      question.options.forEach( function(option, index) {
          questionButtons[index] = document.createElement('button');
          questionButtons[index].textContent = option;

          // Button On-Click Event Handler
          questionButtons[index].onclick= function(event) {
              
            // only respond to buttons if the question hasn't already been answerd.
            if (!waiting) {
              if (event.target.textContent === question.options[question.correct]) {
                  handleCorrectAnswer();
              } else {
                  handleIncorrectAnswer();
              }
            }
          };
          optionsDiv.appendChild(questionButtons[index]);
  
      });
}


var nextQuestion = function() {
    questionNumber++;
    if (questionNumber < questions.length) {
        displayQuestion(questions[questionNumber]);
        startTimer();
    } else {
        gameOver = true;
    }
}
var startTimer=function() {
    waiting = false;
    questionTimer = setTimeout( function() {
            if (!waiting) {
                console.log("timer up ");
                nextQuestion();
            }
    } , sand*1000);


}
var startQuiz = function() {
    questionNumber = 0;
    displayQuestion(questions[questionNumber]);
    startTimer();
}

var handleCorrectAnswer = function() {
    var answerObject = { questionNumber: questionNumber, correct: true, value: questions[questionNumber].points };
    waiting = true;
    answeredQuestions.push ( answerObject );
    score = score + questions[questionNumber].points;
    var scoreDisplayText = document.getElementById('score');
    scoreDisplayText.textContent = score;
    correctDisplayText.style.display = "block";
    displayAnswer();
};

var handleIncorrectAnswer = function() {
    var answerObject = { questionNumber: questionNumber, correct: false, value: questions[questionNumber].points };
    waiting = true;
    answeredQuestions.push ( answerObject );
    var scoreDisplayText = document.getElementById('score');
    scoreDisplayText.textContent = score;
    incorrectDisplayText.style.display = "block";
    displayAnswer();
};

var displayAnswer = function() {
       // We set a new 3 second timer so the user can see the response of: Correct!  or Incorrect!
       clearTimeout(questionTimer);
       var waitTimeout= setTimeout(function() {
        waiting = false;
        correctDisplayText.style.display = "none";
        incorrectDisplayText.style.display = "none";
        nextQuestion();
     }, 1000 * 3);
}

