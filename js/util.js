//модуль с утилитарными функциями
const ALERT_SHOW_TIME = 5000;
// Используем функцию от tomfun для склонения существительных в рус.яз.
// https://gist.github.com/tomfun/830fa6d8030d16007bbab50a5b21ef97
const getNoun = (number, one, two, five) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}
//объявление об ошибке загрузки
const showAlert = (err) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = `${err} Ошибка загрузки данных об объявлениях с сервера. Попробуйте снова через 5 секунд.`;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getNoun, showAlert};
