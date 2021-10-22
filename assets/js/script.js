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
var Score = 0;
var quizContentEl = document.querySelector("#quiz-content");


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
    gameOverEl.innerHTML = "<h2>Game Over! <br/> Your Score is: <br/>" + Score + "<h2>";
    quizContentEl.appendChild(gameOverEl);

}
// quizContentEl.addEventListener("click", checkAnswer);
BeginQuiz(questionID);