//модуль, который создаёт данные
import {getRandomNumber, features, myNewFunction, getLocation} from './util.js';//избегай цикличную зависимость!

const TITLING_TYPES = [
  'Приветствие 1',
  'Приветствие 2',
  'Приветствие 3',
  'Приветствие 4',
];
const HOUSING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURING_TYPES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION_TYPES =[
  'Просторная комната',
  'Вид из окон на море',
  'Раздельный санузел',
  'Большая кухня-гостинная',
  'Удобное расположение от ресепшена',
];
const PHOTO_TYPES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const PHOTO_AMOUNT = 10;//длина

//Общий объект
const createHotel = () => {
  //случайное число длины
  const randomPhotoLength = getRandomNumber(1, PHOTO_AMOUNT);
  //console.log(randomPhotoLength);
  const newArray = features(FEATURING_TYPES).slice(0, getRandomNumber(1, FEATURING_TYPES.length-1));//новый сгенерированный массив//метод slice
  //console.log(newArray);
  const photos = myNewFunction(PHOTO_TYPES, randomPhotoLength);
  //перезаписываем координаты в новую переменную
  const location = getLocation();
  return  {
    author:{//первый объект
      avatar: `img/avatars/user0${getRandomNumber(1,8)}.png`,
    },
    offer:{//второй объект
      title: TITLING_TYPES[getRandomNumber(0, TITLING_TYPES.length -1)],
      address: (`${location.x}, ${location.y}`),//интерполяция
      price: getRandomNumber(1, 1000000),//Любое положительное число
      type: HOUSING_TYPES[getRandomNumber(0,HOUSING_TYPES.length-1)],
      rooms: getRandomNumber(1, 150),//Любое положительное число
      guests: getRandomNumber(1, 300),//Любое положительное число
      checkin:TIMES[getRandomNumber(0, TIMES.length-1)],
      checkout:TIMES[getRandomNumber(0, TIMES.length-1)],
      features: newArray,//массив строк — массив случайной длины из значений
      description: DESCRIPTION_TYPES[getRandomNumber(0, DESCRIPTION_TYPES.length-1)],
      photos: photos,//массив строк — массив случайной длины из значений
    },
    location,//третья - переменная, куда мы записали вызов функции
  };
};

export {createHotel};
