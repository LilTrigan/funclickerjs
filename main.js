let translations = {};
let lang = "en";

fetch("translations.json")
  .then(response => response.json())
  .then(data => {
    translations = data;
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith("uk")) lang = "uk";
    else if (userLang.startsWith("ru")) lang = "ru";
    else lang = "en";

    applyTranslations();
  });

function applyTranslations() {
  const t = translations[lang];
  document.getElementById("Button").innerText = t.buttonText;
  document.getElementById("karma").innerText = t.karmaLabel + quest.karma;
}

const video = document.getElementById("video");
const quest = {
  stage: 1,
  karma: 100
};

const button = document.getElementById("Button");
let isMoving = false;


function KarmaFun() {
  document.getElementById("karma").innerText = "Карма:" + quest.karma;
}

function Changepos() {
  isMoving = false;
  KarmaFun();
  const maxX = window.innerWidth - button.offsetWidth;
  const maxY = window.innerHeight - button.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;
}
button.addEventListener("transitioned", () => {
  isMoving = false;
});

button.addEventListener("click", () => {
  if (isMoving) return;
  quest.karma -=10;
  Changepos();
  KarmaFun();
  if (quest.karma <= 10 ) {
    button.style.display = "none"
    triggerScreamer()
  }
});

function triggerScreamer() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
  video.style.display = "block";
  video.play();
  videoClick();
}

function videoClick(event) {
  if(event) event.preventDefault();
  const { documentElement } = document;
  if(documentElement.requestFullscreen) documentElement.requestFullscreen();
  else if(documentElement.mozRequestFullScreen) documentElement.mozRequestFullScreen();
  else if(documentElement.webkitRequestFullscreen) documentElement.webkitRequestFullscreen();
  else if(documentElement.msRequestFullscreen) documentElement.msRequestFullscreen();
}
