let myBtn = document.querySelector(".control span");
let nameSpan = document.querySelector(".info-container .name span");
let myScreen = document.querySelector(".control");

myBtn.onclick = function () {
  let userName = prompt("What Is Your Name ?");
  if (userName === "" || userName === null) {
    nameSpan.textContent = "Unknown";
  } else {
    nameSpan.textContent = userName;
  }
  myScreen.remove();
};

let duration = 1000;
let gameContainer = document.querySelector(".game-container");
let gameBlocks = Array.from(gameContainer.children);
let orderArray = [...Array(gameBlocks.length).keys()];

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
shuffle(orderArray);

gameBlocks.forEach((block, index) => {
  block.style.order = orderArray[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function flipBlock(theBlock) {
  theBlock.classList.add("flip");
  let allFliped = gameBlocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("flip")
  );
  if (allFliped.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFliped[0], allFliped[1]);
  }
}

function stopClicking() {
  gameContainer.classList.add("no-click");
  setTimeout(() => {
    gameContainer.classList.remove("no-click");
  }, duration);
}

function checkMatchedBlocks(fBlock, secBlock) {
  let triesEl = document.querySelector(".info-container .tries span");
  if (fBlock.dataset.brand === secBlock.dataset.brand) {
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
