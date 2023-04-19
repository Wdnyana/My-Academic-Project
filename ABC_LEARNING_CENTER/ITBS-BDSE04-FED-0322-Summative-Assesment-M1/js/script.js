//code background color will be changed when the website is scrolled
const bgNav = document.querySelector("#navbar-page");
const bgDrop1 = document.querySelector(".dropdown-menu");
const bgDrop2 = document.querySelector(".sub-menu");

const getOffset = () => {
  if (window.pageYOffset >= 250) {
    // bg navbar home
    bgNav.style.backgroundColor = "#bffafb";
    bgNav.style.transition = "background 0.5s ease-out";
    bgNav.style.boxShadow = "2px 2px 14px 1px rgba(0, 0, 0, 0.4)";
    // bg dropdown course
    bgDrop1.style.backgroundColor = "#bffafb";
    bgDrop1.style.transition = "background 0.5s ease-out";
    // bg dropdown join
    bgDrop2.style.backgroundColor = "#bffafb";
    bgDrop2.style.transition = "background 0.5s ease-out";
  }
  if (window.pageYOffset <= 250) {
    // bg none navbar home
    bgNav.style.backgroundColor = "transparent";
    bgNav.style.transition = "background 0.5s ease-out";
    bgNav.style.boxShadow = "none";
    // bg none dropdown course
    bgDrop1.style.backgroundColor = "transparent";
    bgDrop1.style.transition = "background 0.5s ease-out";

    // bg none dropdown join
    bgDrop2.style.backgroundColor = "transparent";
    bgDrop2.style.transition = "background 0.5s ease-out";
  }
};

//attaches scroll and call function getOffset to element navbar
window.addEventListener("scroll", getOffset);

// script carousel
const sliderContent = document.querySelector(".slider-content");
const sliderSlide = document.querySelectorAll(".slider-item");
const btnClick = document.querySelectorAll(".btn-click");

let current = 0;
let prev = 4;
let next = 1;

for (let i = 0; i < btnClick.length; i++) {
  btnClick[i].addEventListener("click", () =>
    i == 0 ? gotoPrev() : gotoNext()
  );
}

/* call go to prev and set -1*/
const gotoPrev = () =>
  current > 0 ? gotoNum(current - 1) : gotoNum(sliderSlide.length - 1);

/* call the go to next and bigger then many carousel cal set num */
const gotoNext = () => (current < 4 ? gotoNum(current + 1) : gotoNum(0));

/* set num for go to prev and next */
const gotoNum = (number) => {
  current = number;
  prev = current - 1;
  next = current + 1;

  for (let i = 0; i < sliderSlide.length; i++) {
    sliderSlide[i].classList.remove("center");
    sliderSlide[i].classList.remove("prev");
    sliderSlide[i].classList.remove("next");
  }

  if (next == 5) {
    next = 0;
  }

  if (prev == -1) {
    prev = 4;
  }

  sliderSlide[current].classList.add("center");
  sliderSlide[prev].classList.add("prev");
  sliderSlide[next].classList.add("next");
};

// js google maps
function locMaps() {
  var loc = { lat: -8.5294825, lng: 115.1553403 };
  var maps = new google.maps.Map(document.getElementById("location"), {
    zoom: 4,
    center: loc,
  });
  var mark = new google.maps.Marker({
    position: loc,
    map: maps,
  });
}