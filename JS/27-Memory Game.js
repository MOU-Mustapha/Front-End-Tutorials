let spanButton = document.querySelector(".control-buttons span");
let myName = document.querySelector(".info-container .name span");
let myScreen = document.querySelector(".control-buttons");
spanButton.onclick = function () {
  let yourName = prompt("What Is Your Name");
  if (yourName === "" || yourName === null) {
    myName.textContent = "Unknown";
  } else {
    myName.textContent = yourName;
  }
  myScreen.remove();
};

let duration = 1000;
let gameContainer = document.querySelector(".game-container");
let gameBlock = Array.from(gameContainer.children);
let orderRange = [...Array(gameBlock.length).keys()];

function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
shuffle(orderRange);
gameBlock.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("flip");
  let allFlip = gameBlock.filter((flippedBlock) =>
    flippedBlock.classList.contains("flip")
  );
  if (allFlip.length === 2) {
    stopClicking();
    checkMatched(allFlip[0], allFlip[1]);
  }
}

function stopClicking() {
  gameContainer.classList.add("no-clicking");
  setTimeout(() => {
    gameContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatched(fBlock, secBlock) {
  let triesEl = document.querySelector(".info-container .tries span");
  if (fBlock.dataset.tech === secBlock.dataset.tech) {
    fBlock.classList.remove("flip");
    secBlock.classList.remove("flip");
    fBlock.classList.add("matched");
    secBlock.classList.add("matched");
    document.getElementById("success").play();
  } else {
    triesEl.textContent = parseInt(triesEl.textContent) + 1;
    setTimeout(() => {
      fBlock.classList.remove("flip");
      secBlock.classList.remove("flip");
    }, duration);
    document.getElementById("fail").play();
  }
}
