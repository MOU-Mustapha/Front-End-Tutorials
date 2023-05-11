let countDownDate = new Date(2023, 11, 31, 23, 59, 59).getTime();
let counter = setInterval(() => {
  let dateNow = new Date().getTime();
  let dateDiff = countDownDate - dateNow;
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  document.querySelector(".days").textContent = days;
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.querySelector(".hours").textContent = hours;
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  document.querySelector(".minutes").textContent = minutes;
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
  document.querySelector(".seconds").textContent = seconds;
  if (dateDiff <= 0) {
    clearInterval(counter);
  }
}, 1000);
