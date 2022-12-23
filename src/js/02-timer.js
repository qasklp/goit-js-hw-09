import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const inputEl = document.querySelector("#datetime-picker");
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const startBtn = document.querySelector("button");
const fp = flatpickr(inputEl, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let today = new Date();
        if (selectedDates[0] < today) {
            Notiflix.Report.failure('Wrong date!', 'Please choose a date in the future', 'Ok');
            startBtn.disabled = true;
            return;

        }
        startBtn.disabled = false;
        startBtn.addEventListener("click", handleClick);
    },
});

startBtn.disabled = true;
function addLeadingZero(value, addingSymbols) {
    return value.toString().padStart(2, addingSymbols)
}

function handleClick() {
    timerId = setInterval(() => {
        let today = new Date();
        ms = fp.selectedDates[0] - today;
        let time = convertMs(ms);
        days.textContent = addLeadingZero(time.days,  0);
        hours.textContent = addLeadingZero(time.hours, 0);
        minutes.textContent = addLeadingZero(time.minutes, 0);
        seconds.textContent = addLeadingZero(time.seconds, 0);
        if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            clearInterval(timerId);
        }
    }, 1000)
}