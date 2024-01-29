import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import debounce from "lodash.debounce";
// Знаходимо в розмітці  форму, інпут де вказується затримка та один з елементів вибору
const notificationForm = {
  submitForm: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stateFulFilled: document.querySelector('input[value="fulfilled"]'),
};
const debouncedInputValue=debounce(ondelayInputInput,1000)
// Додаємо прослуховувач подій на форму
notificationForm.submitForm.addEventListener('submit', onFormSubmit);
// Додаємо прослуховувач подій на поле для вводу затримки часу
notificationForm.delayInput.addEventListener('input', debouncedInputValue);
//Функція перевірки чи додатня величиниа затримки повідомлення
function ondelayInputInput(event) {
  let inputValue = event.target.value;
  if (inputValue < 0) {
    showNotificationForNegativeValueOfTimeDelay();
    notificationForm.submitForm.reset();
     }
  
};
// вказуємо що робити при "сабміті" форми
function onFormSubmit(event) {
  event.preventDefault();
  
    const delay = notificationForm.delayInput.value;
    let state = notificationForm.stateFulFilled.checked
      ? 'resolve'
      : 'reject';
    executePromise(state, delay)
      .then(showFulfilledNotification)
      .catch(showRejectNotification);
    notificationForm.submitForm.reset();
 };
// Створюємо функцію яка показує повідомлення при вдалому виконанні промісу
function showFulfilledNotification(delay) {
  setTimeout(() => {
      iziToast.success({
      timeout: 3000,
      title: '',
      icon: '',
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topCenter',
    });
  }, delay);
};
// Створюємо функцію яка показує повідомлення при виконанні промісу з відмовою
function showRejectNotification(delay) {
  setTimeout(() => {
      iziToast.error({
      timeout: 3000,
      title: '',
      icon: '',
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topCenter',
    });
  }, delay);
};
// Створюємо функцію яка  показує попередження про введення відємного відліку часу
function showNotificationForNegativeValueOfTimeDelay() {
  iziToast.error({
      timeout: 3000,
      title: '',
      message: `Please enter positive value for time delay`,
      position: 'topCenter',
    });
}
// Створюємо проміс
function executePromise(state, delay) {
    return new Promise((resolve, reject) => { if (state === 'resolve') { resolve(delay); } else { reject(delay); }; });
};


