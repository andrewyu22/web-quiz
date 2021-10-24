var Questions = [
    {
        question: "What is your name?",
        answers: ["Andrew", "John", "JJ", "Amy"],
        correctAnswer: "Andrew"
    },
    {
        question: "What are you from?",
        answers: ["Manhattan", "Brooklyn", "Queens", "Staten Island"],
        correctAnswer: "Brooklyn"
    },
    {
        question: "What does NY stand for?",
        answers: ["New Yankees", "New Yoodles", "New York", "New Yzeey"],
        correctAnswer: "New York"
    }
]
var questionID = 0;
var score = 0;
var quizContentEl = document.querySelector("#quiz-content");
var scoreEl = document.querySelector("#totalscore");
var timerEl = document.querySelector("#timer");
var timeLeft = 100;

function BeginQuiz(questionId) {

    var quizInfoEl = document.createElement("div");
    quizInfoEl.id = "question" + questionID;
    quizInfoEl.className = "btn-container"
    quizInfoEl.innerHTML = "<h2>Question " + (questionId + 1) + ":" + Questions[questionId].question + "</h2>";
    for (ans in Questions[questionId].answers) {
        var inputButtonEl = document.createElement("button");
        inputButtonEl.className = "btn-items"
        inputButtonEl.setAttribute("onclick", "checkAnswer(" + questionId + ",'" + Questions[questionId].answers[ans] + "')");
        inputButtonEl.textContent = Questions[questionId].answers[ans];
        quizInfoEl.appendChild(inputButtonEl);
    }
    quizContentEl.appendChild(quizInfoEl);
}

function checkAnswer(questionId, answers) {
    var selectContainer = document.querySelector("#question" + questionID);
    if (answers === Questions[questionId].correctAnswer) {
        console.log(answers);
        score += 10;
        showScore();
        questionID++;
    }
    else {
        timeLeft-=10;
        questionID++;
    }
    selectContainer.remove();
    if (Questions[questionID] === undefined) {
        clearInterval();
        gameOver();
    }
    else {
        BeginQuiz(questionID);
    }

}

function gameOver() {
    var currentEl = document.querySelector(".btn-container");
    if(currentEl !== null)
    {
        currentEl.remove();
    }
    var gameOverEl = document.createElement("div");
    gameOverEl.className = "name";
    gameOverEl.innerHTML = "<h1>Game Over! <br/> Your Total Score is: <br/>" + score + "<h1>";
    var HighScoreName = document.createElement("input");
    HighScoreName.placeholder = "Enter your Initials";
    var submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.setAttribute("onclick", "saveHighScore()");
    gameOverEl.appendChild(HighScoreName);
    gameOverEl.appendChild(submitBtn);
    quizContentEl.appendChild(gameOverEl);

}
// Show the total score on the screen.
function showScore() {
    scoreEl.textContent = score;
}

function startQuiz() {
    var startTextRemove = document.querySelector("#start");
    startTextRemove.remove();
    startTimer();
    BeginQuiz(0);
}

function startTimer() {
    
    timerEl.textContent = timeLeft;
    var timeInternal = setInterval(function () {
        if (timeLeft > 0 && Questions[questionID] !== undefined) {
            timeLeft -= 1;
            timerEl.textContent = timeLeft;
        }
        else if (Questions[questionID] === undefined)
        {
            clearInterval(timeInternal);
        }
        else {
            clearInterval(timeInternal);
            gameOver();
        }
    }, 1000)
}

function saveHighScore() {
    var obj = 
    {
        name: document.querySelector("input").value,
        scores: score
    }
    localStorage.setItem("Highscore", JSON.stringify(obj));
}