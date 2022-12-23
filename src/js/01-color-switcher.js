function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const background = document.querySelector("body");
const buttons = document.querySelectorAll("button");

buttons[0].addEventListener('click', handleStartClick);
buttons[1].addEventListener('click', handleStopClick);

function handleStartClick() {
    timerId = setInterval(() => {
        background.style.backgroundColor = getRandomHexColor();
    }, 1000);
    buttons[0].disabled = true;

}

function handleStopClick() {
    clearInterval(timerId);
    buttons[0].disabled = false;
}
