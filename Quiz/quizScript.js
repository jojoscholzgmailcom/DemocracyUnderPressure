//Test stuff

let question =
{
    questionLabel: "How are you?",
    answers: ["Good!", "Great!", "Okay", "Not Great!"],
    score: [[1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1]]
};

let question2 =
{
    questionLabel: "Who are you?",
    answers: ["I don't know.", "Who are you?", "TEst", "TEst2"],
    score: [[1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1]]
};


// ************************************************************************
// Useful definitions

let numButtons = 5;

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
    questions: [question, question2],
    currentQuestion: 0,
    scores: [0,0,0,0],
    end: [["First option!", "First Text!"], ["Second option!", "Second Text!"], ["Third option!", "Third Text!"], ["Fourth option!", "Fourth Text!"]],
    endFun: function()
    {
        maxIdx = arrayMax(this.scores);
        document.getElementById("QuestionTitle").innerHTML = this.end[maxIdx][0];
        document.getElementById("QuestionText").innerHTML = this.end[maxIdx][1];
        for (let idx = 0; idx < numButtons; idx++)
        {
            document.getElementById("button" + idx).style.display = 'none'
        }
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