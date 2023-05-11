let SliderImages = Array.from(document.images);
let sliderCount = SliderImages.length;
let currentSlide = 1;
let indicatorsEl = document.getElementById("indicators");
let slideNumberEl = document.getElementById("slider-number");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

let paginationUl = document.createElement("ul");
paginationUl.setAttribute("id", "pagination-ul");
for (let i = 1; i <= sliderCount; i++) {
  let paginationItem = document.createElement("li");
  paginationItem.setAttribute("data-index", i);
  let paginationItemText = document.createTextNode(i);
  paginationItem.appendChild(paginationItemText);
  paginationUl.appendChild(paginationItem);
}
indicatorsEl.appendChild(paginationUl);
let bullets = document.querySelectorAll("#pagination-ul li");

function removeAllActive() {
  SliderImages.forEach((img) => {
    img.classList.remove("active");
  });
  bullets.forEach((bull) => {
    bull.classList.remove("active");
  });
}
function checker() {
  slideNumberEl.textContent = `Slide#${currentSlide} Of ${sliderCount}`;
  removeAllActive();
  SliderImages[currentSlide - 1].classList.add("active");
  bullets[currentSlide - 1].classList.add("active");
  if (currentSlide === sliderCount) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
  if (currentSlide === 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
}
checker();

nextBtn.onclick = function () {
  if (nextBtn.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;
    checker();
  }
};

prevBtn.onclick = function () {
  if (prevBtn.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide--;
    checker();
  }
};

bullets.forEach((bull) => {
  bull.onclick = () => {
    currentSlide = bull.dataset.index;
    checker();
  };
});
