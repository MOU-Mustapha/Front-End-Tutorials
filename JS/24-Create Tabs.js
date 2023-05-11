let tabs = document.querySelectorAll(".tabs li");
let tabsArray = Array.from(tabs);
let divs = document.querySelectorAll(".content > div");
let divsArray = Array.from(divs);

tabsArray.forEach((li) => {
  li.addEventListener("click", function () {
    tabsArray.forEach((li) => {
      li.classList.remove("active");
    });
    this.classList.add("active");
    divsArray.forEach((div) => {
      div.style.display = "none";
    });
    document.querySelectorAll(this.dataset.cont).forEach((div) => {
      div.style.display = "block";
    });
  });
});
