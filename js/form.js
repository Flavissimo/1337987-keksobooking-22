//форма
const form = document.querySelector('.ad-form');
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

//типы жилья, вывести выбранный тип
const typeOfDwelling  = form.querySelector('#type');

typeOfDwelling.addEventListener('change', (event) => {
  const minPrice = document.querySelector('#price');//находим цену
  for (let item of event.target.children) {//выбирает ребенка в цикле
    if (item.selected) {
      const selectedItem = item.value;//выбранный тип жилья
      if (selectedItem === 'bungalow') {
        minPrice.placeholder = '0';
        minPrice.min = 0;
      }
      if (selectedItem === 'flat') {
        minPrice.placeholder = '1 000';
        minPrice.min = 1000;

      }
      if (selectedItem === 'house') {
        minPrice.placeholder = '5 000';
        minPrice.min = 5000;
      }
      if (selectedItem === 'palace') {
        minPrice.placeholder = '10 000';
        minPrice.min = 10000;
      }
      break;
    }
  }
});
//синхронное время
const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');

const onChangeOfTime = (evt) => {
  const itemTime = evt.target.value;
  checkIn.value = itemTime;
  checkOut.value = itemTime;
};

checkIn.addEventListener('change', (evt) => { onChangeOfTime(evt); });
checkOut.addEventListener('change', (evt) => { onChangeOfTime(evt); });

// СТАРАЯ ВЕРСИЯ
// const getTimeInOut = () => {
//   document.querySelector('#timein').addEventListener('change', (event) => {
//     const timeOut = document.querySelector('#timeout');
//     for ( let timeIn of event.target.children){
//       if (timeIn.selected) {
//         const selectedTimeIn = timeIn.value;
//         timeOut.value = selectedTimeIn;
//         break;
//       }
//     }
//   });
// }
// getTimeInOut();
