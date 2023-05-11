let countSpan = document.querySelector(".quiz-info .count span");
let bulletsEl = document.querySelector(".bullets");
let BulletsSpansContainer = document.querySelector(".bullets .spans");
let quizAreaEl = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitBtn = document.querySelector(".submit-btn");
let resultsEl = document.querySelector(".results");
let countDownEl = document.querySelector(".count-down");
let currentIndex = 0;
let rightAnswer = 0;
let countDownInterval;

function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let QuestionsObject = JSON.parse(this.responseText);
      let NumberOfQuestions = QuestionsObject.length;
      CreateBullets(NumberOfQuestions);
      addQuestionsData(QuestionsObject[currentIndex], NumberOfQuestions);
      countDownTimer(5, NumberOfQuestions);
      submitBtn.onclick = () => {
        let theRightAnswer = QuestionsObject[currentIndex]["the-right-answer"];
        currentIndex++;
        checkAnswer(theRightAnswer);
        quizAreaEl.innerHTML = "";
        answersArea.innerHTML = "";
        addQuestionsData(QuestionsObject[currentIndex], NumberOfQuestions);
        handelBullets();
        clearInterval(countDownInterval);
        countDownTimer(5, NumberOfQuestions);
        showResults(NumberOfQuestions);
      };
    }
  };
  myRequest.open("GET", "30-Quiz Application.json", true);
  myRequest.send();
}
getQuestions();

function CreateBullets(num) {
  countSpan.textContent = num;
  for (let i = 0; i < num; i++) {
    let bullet = document.createElement("span");
    if (i === 0) {
      bullet.className = "active";
    }
    BulletsSpansContainer.appendChild(bullet);
  }
}

function addQuestionsData(obj, num) {
  if (currentIndex < num) {
    let question = document.createElement("h2");
    let questionText = document.createTextNode(obj.title);
    question.appendChild(questionText);
    quizAreaEl.appendChild(question);
    for (let i = 1; i <= 4; i++) {
      let AnswerDiv = document.createElement("div");
      AnswerDiv.className = "answer";
      let radioInput = document.createElement("input");
      radioInput.setAttribute("type", "Radio");
      radioInput.setAttribute("name", "questions");
      radioInput.setAttribute("id", `answer-${i}`);
      radioInput.setAttribute("data-answer", `${obj[`answer-${i}`]}`);
      if (i === 1) {
        radioInput.checked = true;
      }
      question.appendChild(radioInput);
      let label = document.createElement("label");
      label.setAttribute("for", `answer-${i}`);
      let labelText = document.createTextNode(obj[`answer-${i}`]);
      label.appendChild(labelText);
      AnswerDiv.appendChild(radioInput);
      AnswerDiv.appendChild(label);
      answersArea.appendChild(AnswerDiv);
    }
  }
}

function checkAnswer(ranswer) {
  let answers = document.getElementsByName("questions");
  let theChosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChosenAnswer = answers[i].dataset.answer;
    }
  }
  if (ranswer === theChosenAnswer) {
    rightAnswer++;
  }
}

function handelBullets() {
  let bulletsSpans = Array.from(
    document.querySelectorAll(".bullets .spans span")
  );
  bulletsSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.classList.add("active");
    }
  });
}

function showResults(num) {
  let theResult;
  if (currentIndex === num) {
    quizAreaEl.remove();
    answersArea.remove();
    submitBtn.remove();
    bulletsEl.remove();
    if (rightAnswer > num / 2 && rightAnswer < num) {
      theResult = `<span class="good">Good</span>, You Answered ${rightAnswer} From ${num}`;
    } else if (rightAnswer === num) {
      theResult = `<span class="perfect">Perfect</span>, You Answered ${rightAnswer} From ${num}`;
    } else {
      theResult = `<span class="bad">Bad</span>, You Answered ${rightAnswer} From ${num}`;
    }
    resultsEl.innerHTML = theResult;
    resultsEl.style.backgroundColor = "white";
    resultsEl.style.padding = "20px";
    resultsEl.style.marginTop = "15px";
  }
}

function countDownTimer(duration, num) {
  if (currentIndex < num) {
    let minutes, seconds;
    countDownInterval = setInterval(() => {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      countDownEl.innerHTML = `${minutes}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countDownInterval);
        submitBtn.click();
      }
    }, 1000);
  }
}
