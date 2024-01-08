var startButton = document.querySelector("#start");
var timer = document.querySelector("#time");
var timerTxt = document.querySelector(".timer");
var startScreen = document.querySelector("#start-screen");
var questionArea = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var submitBtn = document.querySelector("#submit");
var feedback = document.querySelector("#feedback");

//Sets score
var score = 0;
//Sets time for countdown
var timeLeft = 60;

//Sets timer/begins countdown
function countdown() {
    var timeInterval = setInterval(function () {
      
    if(timeLeft >1) {
      timer.textContent = timeLeft;
      timeLeft--; 
      } else {
      clearInterval(timeInterval);
      gameOver();
      }
    }, 1000);
    
    };


// Start button hides start screen & displays questions

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    countdown();
    startScreen.classList.add("hide");
    questionArea.classList.remove("hide");
    displayQuestion();
  });

function displayQuestion() {
    //clear previous questions buttons
    choices.innerHTML = "";
    var currentQuestion = questions.shift();
    questionTitle.textContent = currentQuestion.question;
    var options = Object.values(currentQuestion).slice(1);

    for (var [choice, answerKey] of options) {
        var choiceButton = document.createElement("button");
        choiceButton.classList.add("answer-button");
        choiceButton.textContent = choice;
        choiceButton.key = answerKey;
        choices.appendChild(choiceButton);
        choiceButton.addEventListener("click", handleButtonClick);

    };
};
    

// Function to check if correct answer was clicked, if so displayCorrectAnswer() is called (it checks if object key is equal to "correct")
function handleButtonClick(event) {
    var key = event.target.key;
    // Check which button was clicked
    var clickedButton = event.target;
    if (key) {
      clickedButton.style.backgroundColor = "green";
      feedback.classList.remove("hide");
      feedback.innerHTML = 'Correct!';
      correctAudio();
      score+=10;    
    } else {
      clickedButton.style.backgroundColor = "red";
      feedback.classList.remove("hide");
      feedback.innerHTML = 'Incorrect!';
      incorrectAudio();
      timeLeft -= 10;
    };
//Go to next question
    if(questions.length == 0) {
        setTimeout(gameOver, 500);
    } else {
        setTimeout(displayQuestion, 500);
    }
    
   };

  // Function to play a correct sound
function correctAudio() {
    var correctWav = new Audio();
    correctWav.src = "assets/sfx/correct.wav";
    correctWav.play();
  }
  // Function to play a wrong sound
  function incorrectAudio() {
    var incorrectWav = new Audio();
    incorrectWav.src = "assets/sfx/incorrect.wav";
    incorrectWav.play();
  };

//Displays end screen
function gameOver() {
    timerTxt.classList.add("hide");
    questionArea.classList.add("hide");
    endScreen.classList.remove("hide");
    feedback.classList.add("hide");
    finalScore.textContent = score;
};

  //Submitting user info
  submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var initials = document.querySelector("#initials").value;

    if (initials === "") {
        alert("Error: Input cannot be blank");
    } else {
        //use date to create unique key so scores aren't overwritten
        var date = new Date();
        localStorage.setItem(date, `${initials}: ${score}`);
        location.href = "./highscores.html";
    }

  });