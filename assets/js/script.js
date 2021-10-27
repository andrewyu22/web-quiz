var Questions = [
    {
        question: "What is the correct operator to compare BOTH type and value?",
        answers: ["==", "===", "!=", "!=="],
        correctAnswer: "==="
    },
    {
        question: "How do we declare an empty array?",
        answers: ["var array = []", "var array = ''", "var array = {}", "var array = [{}]"],
        correctAnswer: "var array = []"
    },
    {
        question: "How do we add one to a variable 'i'?",
        answers: ["i++", "i=i+1", "i+=1", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "Which one allows you to save to localstorage?",
        answers: ["getItem()", "setItem()", "save()", "None of the above"],
        correctAnswer: "setItem()"
    },
    {
        question: "____ deletes an elements at the end of array",
        answers: ["delete()", "push()", "pop()", "remove()"],
        correctAnswer: "pop()"
    },
    {
        question: "Which of the following will allow us to create a new function called 'tasks'?",
        answers: ["function tasks {}", "function tasks() {}", "tasks()", "function tasks()"],
        correctAnswer: "function tasks() {}"
    },
    {
        question: "____ appends a new elements to the end of an array, and returns thew new length of an array",
        answers: ["push()", "concat()", "pop()", "shift()"],
        correctAnswer: "push()"
    },
    {
        question: "Which logical operators in Javascript represent (AND)",
        answers: ["&&", "||", "!", "AND"],
        correctAnswer: "&&"
    },
    {
        question: "____ helps us pause the code at a certain point to find and fix errors within the script",
        answers: ["console.log()", "break", "pause", "debugger"],
        correctAnswer: "debugger"
    },
    {
        question: "Which one is a boolean value",
        answers: ["true", "false", "0", "1", "All of the above"],
        correctAnswer: "All of the above"
    }
]
var questionID = 0;
var score = 0;
var quizContentEl = document.querySelector("#quiz-content");
var scoreEl = document.querySelector("#totalscore");
var timerEl = document.querySelector("#timer");
var startText = document.querySelector("#start");
var storedValue = document.querySelector("#getHighScore");
var timeLeft = 100;
var Highscore = [];

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
    startText.remove();
    startTimer();
    BeginQuiz(questionID);
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
    var Totalscore = {
        name: document.querySelector("input").value,
        scores: score
    }
    Highscore.push(Totalscore);
    localStorage.setItem("Highscore", JSON.stringify(Highscore));
    window.location.href = "highscore.html";
}

function getHighScore() {
    for(var i=0; i < Highscore.length; i++)
    {
        var scoreEl = document.createElement("li");
        scoreEl.className = "score-item";
        scoreEl.textContent = Highscore[i].name + " " + Highscore[i].scores;
        storedValue.appendChild(scoreEl);
    }
}

function loadScore() {
    var savedScore = localStorage.getItem("Highscore");
    if(!savedScore) {
        return false;
    }
    savedScore = JSON.parse(savedScore);
    for(var i=0; i < savedScore.length; i++) {
        obj = {
            name: savedScore[i].name,
            scores: savedScore[i].scores
        }
        Highscore.push(obj);
    }
    Highscore.sort(function(a,b) {
        return b.scores - a.scores;
    });
}

function clearScore() {
    localStorage.clear();
    location.reload();
}

loadScore();