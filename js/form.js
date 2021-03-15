const PRICE_TYPE = {//заведем внешний глобальный объект
  bungalow: {
    placeholder: '0',
    min: 0,
  },
  flat: {
    placeholder: '1 000',
    min: 1000,
  },
  house: {
    placeholder: '5 000',
    min: 5000,
  },
  palace: {
    placeholder: '10 000',
    min: 10000,
  },
}


//форма
const form = document.querySelector('.ad-form');
//типы жилья, вывести выбранный тип
const typeOfDwelling  = form.querySelector('#type');
//синхронное время
const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');

const typeofDwellingHandler = (evt) => {
  const minPrice = document.querySelector('#price');//находим цену
  const selectedItem = evt.target.value; //означает выделенный параметр selected (выбранный тип жилья)
  const setting = PRICE_TYPE[selectedItem];//нашли соответствующие параметры в объекте
  if (setting) { //проверка, действительно ли мы параметры нашли
    minPrice.placeholder = setting.placeholder;//установили их
    minPrice.min = setting.min;
  }
};

const onChangeOfTime = (evt) => {
  const itemTime = evt.target.value;
  checkIn.value = itemTime;
  checkOut.value = itemTime;
};

checkIn.addEventListener('change', onChangeOfTime);//установка слушателей вконце!
checkOut.addEventListener('change', onChangeOfTime);
typeOfDwelling.addEventListener('change', typeofDwellingHandler);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
