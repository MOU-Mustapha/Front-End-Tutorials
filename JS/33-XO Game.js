let gameHead = document.querySelector(".head");
let squares = Array.from(document.querySelectorAll(".square"));
let turn = `x`;

function game(id) {
  let element = document.getElementById(id);
  if (turn === `x` && element.innerHTML == ``) {
    element.innerHTML = `X`;
    turn = `o`;
    gameHead.innerHTML = `O`;
  } else if (turn === `o` && element.innerHTML == ``) {
    element.innerHTML = `O`;
    turn = `x`;
    gameHead.innerHTML = `X`;
  }
  winner();
}

function winner() {
  if (
    squares[0].innerHTML === squares[1].innerHTML &&
    squares[1].innerHTML === squares[2].innerHTML &&
    squares[0].innerHTML !== ``
  ) {
    manageGame(0, 1, 2);
  } else if (
    squares[3].innerHTML === squares[4].innerHTML &&
    squares[4].innerHTML === squares[5].innerHTML &&
    squares[3].innerHTML !== ``
  ) {
    manageGame(3, 4, 5);
  } else if (
    squares[6].innerHTML === squares[7].innerHTML &&
    squares[7].innerHTML === squares[8].innerHTML &&
    squares[6].innerHTML !== ``
  ) {
    manageGame(6, 7, 8);
  } else if (
    squares[0].innerHTML === squares[3].innerHTML &&
    squares[3].innerHTML === squares[6].innerHTML &&
    squares[0].innerHTML !== ``
  ) {
    manageGame(0, 3, 6);
  } else if (
    squares[1].innerHTML === squares[4].innerHTML &&
    squares[4].innerHTML === squares[7].innerHTML &&
    squares[1].innerHTML !== ``
  ) {
    manageGame(1, 4, 7);
  } else if (
    squares[2].innerHTML === squares[5].innerHTML &&
    squares[5].innerHTML === squares[8].innerHTML &&
    squares[2].innerHTML !== ``
  ) {
    manageGame(2, 5, 8);
  } else if (
    squares[0].innerHTML === squares[4].innerHTML &&
    squares[4].innerHTML === squares[8].innerHTML &&
    squares[0].innerHTML !== ``
  ) {
    manageGame(0, 4, 8);
  } else if (
    squares[2].innerHTML === squares[4].innerHTML &&
    squares[4].innerHTML === squares[6].innerHTML &&
    squares[2].innerHTML !== ``
  ) {
    manageGame(2, 4, 6);
  }
}

function manageGame(num1, num2, num3) {
  gameHead.innerHTML = `The Winner Is ${squares[num1].innerHTML}`;
  squares[num1].style.backgroundColor = `#000`;
  squares[num2].style.backgroundColor = `#000`;
  squares[num3].style.backgroundColor = `#000`;
  setInterval(() => {
    gameHead.innerHTML += `.`;
  }, 1000);
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}