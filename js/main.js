//точка входа
//import _ from 'lodash'; после установки сборщика модулей Webpack, спросить.
import {TITLING_TYPES, HOUSING_TYPES, TIMES, FEATURING_TYPES, DESCRIPTION_TYPES, PHOTO_TYPES, PHOTO_AMOUNT} from './data.js';
import {getRandomNumber, shuffle, myNewFunction, getLocation} from './util.js';//избегай цикличную зависимость!


//Общий объект
const createHotel = () => {
  //случайное число длины
  const randomPhotoLength = getRandomNumber(1, PHOTO_AMOUNT);
  //console.log(randomPhotoLength);
  const newArray = shuffle(FEATURING_TYPES).slice(0, getRandomNumber(1, newArray.length-1));//новый сгенерированный массив//метод slice
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
      types: HOUSING_TYPES[getRandomNumber(0,HOUSING_TYPES.length-1)],
      rooms: getRandomNumber(1, 150),//Любое положительное число
      guests: getRandomNumber(1, 300),//Любое положительное число
      checkin:TIMES[getRandomNumber(0, TIMES.length-1)],
      checkout:TIMES[getRandomNumber(0, TIMES.length-1)],
      featurs: newArray,//массив строк — массив случайной длины из значений
      description: DESCRIPTION_TYPES[getRandomNumber(0, DESCRIPTION_TYPES.length-1)],
      photos: photos,//массив строк — массив случайной длины из значений
    },
    location,//третья - переменная, куда мы записали вызов функции
  };
};
createHotel();
//console.log(createHotel());
