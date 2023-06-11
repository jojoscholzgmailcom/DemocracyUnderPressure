//Test stuff

let question =
{
    questionLabel: "How much do you agree with the statement that 'Immigrants are often a burden on the economy'?",
    answers: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: [[2,0,2,2], [1,0,1,1], [0,1,0,0], [0,2,0,0]]
};

let question2 =
{
    questionLabel: "How important is the sovereignty of your state to you?",
    answers: ["Very Important", "Important", "Unimportant", "Very unimportant"],
    score: [[2,0,1,2], [1,0,1,1], [0,1,0,0], [0,2,0,0]]
};

let question3 =
{
    questionLabel: "How much do you agree with the statement that 'Leaving the NATO is a good idea'?",
    answers: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: [[2,0,1,0], [1,0,1,0], [0,1,0,1], [0,2,0,2]]
};

let question4 =
{
    questionLabel: "Do you agree that China is a big threat and that some actions should be taken?",
    answers: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: [[1,1,2,0], [1,1,1,0], [0,0,0,1], [0,0,0,2]]
};

let question5 =
{
    questionLabel: "Do you agree that Climate change is an important issue?",
    answers: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
    score: [[1,2,0,0], [1,1,0,0], [0,0,1,1], [0,0,2,2]]
};


// ************************************************************************
// Useful definitions

let numButtons = 6;

function arrayMax(arr) {
  let len = arr.length;
  let max = -Infinity;
  let idx = 0
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
      idx = len
    }
  }
  return idx;
}

let questionContext = 
{
    questions: [question, question2, question3, question4, question5],
    currentQuestion: 0,
    scores: [0,0,0,0],
    end: ["./quizEnd1.html", "./quizEnd2.html", "./quizEnd3.html", "./quizEnd4.html"],
    endFun: function()
    {
        maxIdx = arrayMax(this.scores);
        window.open(this.end[maxIdx], "_self");
    }
};

// Call it once in the beginning afterwards it gets called by other functions so don't call it
// Updates the website
function displayQuestion(questContxt)
{
    let question = questContxt.questions[questContxt.currentQuestion];
    document.getElementById("QuestionTitle").innerHTML = "Question " + (questContxt.currentQuestion + 1);
    document.getElementById("QuestionText").innerHTML = question.questionLabel;
    for (let idx = 0; idx < question.answers.length; idx++)
    {
        document.getElementById("button" + idx).textContent = question.answers[idx]
    }
    for (let idx = question.answers.length; idx < numButtons; idx++)
    {
        document.getElementById("button" + idx).style.display = "none"
    }
}

// Gets called by the onbutton function, so don't call it
// Moves to the next question or end screen
function update(questContxt)
{
    questContxt.currentQuestion += 1;
    if (questContxt.currentQuestion == questContxt.questions.length)
    {
        questContxt.endFun();
    }
    else
    {
        displayQuestion(questContxt);
    }
}

// Call this for quiz answer buttons
function onButton(idx)
{
    let scoreChange = questionContext.questions[questionContext.currentQuestion].score[idx];
    for (let idx = 0; idx < scoreChange.length; idx++)
    {
        questionContext.scores[idx] += scoreChange[idx];
    }
    update(questionContext);
}