const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

let levelSpan = document.querySelector(".message .level");
let secondsSpan = document.querySelector(".message .seconds");
let startBtn = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".control .time span");
let gotSpan = document.querySelector(".control .score .got");
let totalSpan = document.querySelector(".control .score .total");
let finishMessage = document.querySelector(".finish");

levelSpan.textContent = defaultLevelName;
secondsSpan.textContent = defaultLevelSeconds;
timeLeftSpan.textContent = defaultLevelSeconds;
totalSpan.textContent = words.length;
input.onpaste = function () {
  return false;
};

startBtn.onclick = function () {
  this.remove();
  input.focus();
  genWords();
};

function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let theWordIndex = words.indexOf(randomWord);
  words.splice(theWordIndex, 1);
  theWord.textContent = randomWord;
  upcomingWords.textContent = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let divtext = document.createTextNode(words[i]);
    div.appendChild(divtext);
    upcomingWords.appendChild(div);
  }
  startPlay();
}

function startPlay() {
  timeLeftSpan.textContent = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.textContent--;
    if (timeLeftSpan.textContent === "0") {
      clearInterval(start);
      if (theWord.textContent.toLowerCase() === input.value.toLowerCase()) {
        input.value = ""; 
        gotSpan.textContent++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratulations");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
