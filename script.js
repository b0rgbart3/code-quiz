
//   Data -- an object with questions and answers
//   This is an array of question objects that contain
//   the following keys:  question, options, correct, points
//   question:  a string
//   options:  an array of strings
//   correct:  an index into the array of options, for the correct answer
//  points:  a point value to score this question based on
//  it's difficulty level


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

// Loop through the questions in the questionObject
// Present the question to the user, with buttons for each option
// when the user selects an option, determine if it was correct,
// then let them know if they got it right or not, and keep track of their score
// At the end of the questions, present the user with their score and ask
// for their initials, and store their initials and score 

var chosenSetIndex = 0;
var questions = questionSet[chosenSetIndex];


var displayQuestion = function(question, questionNumber) {

    // take the question object and create DOM elements to display the
    // various parts
    var questionDiv = document.getElementById('question-div');
    var optionsDiv = document.getElementById('options-div');
    var questionTitle = document.createElement('h1');
    var questionButtons = [];
    var questionNumberDisplayText = document.getElementById('question-number');

    questionNumberDisplayText.textContent = questionNumber+1;
    console.log(window);
    
    // Title--------------
    questionTitle.textContent = question.question;

    // If there is already a title nodes, let's start by removing it
    if (questionDiv.firstChild) { questionDiv.firstChild.remove(); }
    questionDiv.appendChild(questionTitle);

    // Options-------------

    // If there are already child nodes, let's start by removing them
    while( optionsDiv.firstChild ) { optionsDiv.firstChild.remove(); }

    question.options.forEach( function(option, index) {
        questionButtons[index] = document.createElement('button');
        questionButtons[index].textContent = option;
        optionsDiv.appendChild(questionButtons[index]);
       // give the user 5 seconds to answer before moving on to next question

    });
    
    

  
}

var delay = [1,1,15,15,15,15,5,5,5,5,5,5,5,5,5];


var startQuiz = function() {

    var questionNumber = 0;
    displayQuestion(questions[0], questionNumber);

    // Set up the Time Interval to display a new question every 10 seconds
    var questionInterval= setInterval( function() {
        
        
        questionNumber++;
        console.log('In timer' + questionNumber);
        console.log(delay[questionNumber]);
        displayQuestion(questions[questionNumber], questionNumber);
         
        // If we have reached the end of the question array 
        if (questionNumber >= questions.length-1) {
            console.log('about to clear the timer');
            clearInterval(questionInterval);
        }
    }, ( 1000 * 2 ) );
    // questions.forEach( function( question ) {
    //     displayQuestion(question);
    // });
}
startQuiz();
