import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const ref = {
    inputForPickingDate: document.querySelector('#datetime-picker'),
    countDownStartbutton: document.querySelector('button[data-start]'),
    fieldForDays: document.querySelector('span[data-days]'),
    fieldForHours: document.querySelector('span[data-hours]'),
    fieldForMinutes: document.querySelector('span[data-minutes]'),
    fieldForSeconds: document.querySelector('span[data-seconds]'),
    };
let countDownInterval;
let differ = 0;
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
function showWarningMessage() {
    iziToast.warning({
        color: 'red',
    message: 'Please choose a date in the future',
    position: 'center',
    });
}
function addClassOnCountDownStartButton(className) {
    ref.countDownStartbutton.classList.add(className);
    
}
function removeClassOnCountDownStartButton(className) {
    ref.countDownStartbutton.classList.remove(className);
  }

function onCountDownStartButtonClick() {
    ref.countDownStartbutton.removeEventListener('click', onCountDownStartButtonClick);
    removeClassOnCountDownStartButton('is-active');
        countDownInterval = setInterval(() => {
        differ = differ - 1000;
        if (differ <= 0) { clearInterval(countDownInterval); }
        else {
            fillInTimeFields(differ);
        }
    },1000)

}
function fillInTimeFields(differ) {
    const { days, hours, minutes, seconds } = convertMs(differ);
    ref.fieldForDays.textContent = `${days}`;
    ref.fieldForHours.textContent = `${hours}`;
    ref.fieldForMinutes.textContent = `${minutes}`;
    ref.fieldForSeconds.textContent = `${seconds}`;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
         if (options.defaultDate < selectedDates[0]) {
          differ=selectedDates[0]-options.defaultDate;
          addClassOnCountDownStartButton('is-active');
          ref.countDownStartbutton.addEventListener('click', onCountDownStartButtonClick);
          
      }
      else {
          clearInterval(countDownInterval);
          ref.countDownStartbutton.removeEventListener('click', onCountDownStartButtonClick);
          removeClassOnCountDownStartButton('is-active')
          showWarningMessage();
          fillInTimeFields(0);
          
      };
       },
};

flatpickr(ref.inputForPickingDate, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes =addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

