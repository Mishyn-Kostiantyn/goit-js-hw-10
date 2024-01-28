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
let isActive = false;
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
function showWarningMessage() {
    iziToast.warning({
        color: 'red',
    message: 'Please choose a date in the future',
    position: 'topCenter',
    });
};
function showErrorMessage() {
    iziToast.error({
    title: '',
    message: 'RESTART THE PAGE TO START NEW COUNTDOWN! OR WAIT TILL THE END OF CURRENT COUNTDOWN!',
    position: 'topCenter',
});
}
function onCountDownStartButtonClick() {
    ref.countDownStartbutton.removeEventListener('click', onCountDownStartButtonClick);
    ref.countDownStartbutton.classList.remove('is-active');
    isActive = true;
    let dif = differ
        countDownInterval = setInterval(() => {
         dif = dif - 1000;
            if (dif <= 0) { clearInterval(countDownInterval); isActive = false; }
        else {
            fillInTimeFields(dif);
        }
    },1000)

};
function fillInTimeFields(differ) {
    const { days, hours, minutes, seconds } = convertMs(differ);
    ref.fieldForDays.textContent = `${addLeadingZero(days)}`;
    ref.fieldForHours.textContent = `${addLeadingZero(hours)}`;
    ref.fieldForMinutes.textContent = `${addLeadingZero(minutes)}`;
    ref.fieldForSeconds.textContent = `${addLeadingZero(seconds)}`;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (options.defaultDate >= selectedDates[0] && !isActive)
        { 
        ref.countDownStartbutton.removeEventListener('click', onCountDownStartButtonClick)    
        ref.countDownStartbutton.classList.remove('is-active');
        showWarningMessage();
                };
        if (options.defaultDate < selectedDates[0] && !isActive) {
            differ = selectedDates[0] - options.defaultDate;
        ref.countDownStartbutton.classList.add('is-active');
            ref.countDownStartbutton.addEventListener('click', onCountDownStartButtonClick);
        };
        if (isActive) { showErrorMessage() };
    },
    
};

flatpickr(ref.inputForPickingDate, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes =Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

