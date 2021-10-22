var Questions = [
    {
        question: "What is your name?",
        answers: ["Andrew","John","JJ","Amy"],
        correctAnswer: "Andrew"
    },
    {
        question: "What are you from?",
        answers: ["Manhattan","Brooklyn","Queens","Staten Island"],
        correctAnswer: "Brooklyn"
    },
    {
        question: "What does NY stand for?",
        answers: ["New Yankees","New Yoodles","New York","New Yzeey"],
        correctAnswer: "New York"
    }
]
var questionID = 0;
var score = 0;
var quizContentEl = document.querySelector("#quiz-content");
var scoreEl = document.querySelector("#totalscore");

function BeginQuiz(questionId) {
    var quizInfoEl = document.createElement("div");
    quizInfoEl.id = "question" + questionID;
    quizInfoEl.className = "btn-container"
    quizInfoEl.innerHTML = "<h2>Question " + (questionId+1) + ":" + Questions[questionId].question + "</h2>";
    for(ans in Questions[questionId].answers)
    {
        var inputButtonEl = document.createElement("button");
        inputButtonEl.className = "btn-items"
        inputButtonEl.setAttribute("onclick","checkAnswer(" + questionId + ",'" + Questions[questionId].answers[ans] +  "')");
        inputButtonEl.textContent = Questions[questionId].answers[ans];
        quizInfoEl.appendChild(inputButtonEl);
    }
    quizContentEl.appendChild(quizInfoEl);
}

function checkAnswer(questionId, answers) {
    var selectContainer = document.querySelector("#question" + questionID);
    if (answers === Questions[questionId].correctAnswer)
    {
        console.log(answers);
        score+= 10;
        showScore();
        alert("Correct!");
        questionID++;
    }
    else 
    {
        console.log(answers);
        console.log("Wrong Answer!");
        questionID++;
    }
    selectContainer.remove();
    if (Questions[questionID] === undefined)
    {
        gameOver();
    }
    else
    {
        BeginQuiz(questionID);
    }
    
}

function gameOver() {
    var gameOverEl = document.createElement("div");
    gameOverEl.innerHTML = "<h1>Game Over! <br/> Your Total Score is: <br/>" + score + "<h1>";
    quizContentEl.appendChild(gameOverEl);

}
// Show the total score on the screen.
function showScore() {
    scoreEl.textContent = score;
}

function startQuiz() {
    var startTextRemove = document.querySelector("#start");
    startTextRemove.remove();
    BeginQuiz(0);
}

// quizContentEl.addEventListener("click", checkAnswer);