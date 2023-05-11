let switcherLis = document.querySelectorAll(".switcher li");
let imgs = Array.from(document.images);

switcherLis.forEach((li) => {
  li.addEventListener("click", function () {
    switcherLis.forEach((li) => {
      li.classList.remove("active");
    });
    this.classList.add("active");
  });
  li.addEventListener("click", function () {
    imgs.forEach((img) => {
      img.style.display = "none";
    });
    document.querySelectorAll(this.dataset.cat).forEach((el) => {
      el.style.display = "block";
    });
  });
});

