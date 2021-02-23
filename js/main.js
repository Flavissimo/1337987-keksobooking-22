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

//ищем случайное число
const getRandomNumber = (min, max) => {
  //если max меньше min, введем переменную буфер
  if (max < min) {
    let buffer = max;
    max = min;
    min = buffer;
  }
  if (max === min) {
    //если max строго равно min, вернем min
    return min;
  }
  min = Math.ceil(min); //округляем число в большую сторону до целого
  max = Math.floor(max); //округляем число в меньшую сторону до целого
  // возвращаем случайное число с помощью метода Math.random и округляя число до целого
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//ищем случайное число с плавающей точкой
const getRandomQuantity = (min, max, precision) => {
  if (max < min) {
    let buffer = max;
    max = min;
    min = buffer;
  }
  if (max === min) {
    return min;
  }
  //создадим искуственный отрезок от 0 до 5 у аргумента presicion, чтобы не перегружать память и не делать бесконеный "хвост"
  if (precision > 5){
    precision = 5;
  }
  const randomQuantity = min + ((Math.floor(((Math.random() * (max - min + 1))) * 10 ** precision)) / (10 ** precision));
  return randomQuantity;
}
//массив строк — массив случайной длины из значений
const shuffle = (array) => { //взято: https://learn.javascript.ru/task/shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];//перемешали элементы массива
  }

  return array;
};

const myNewFunction = (array1, size) => {
  const photos = [];//новый массив, куда записываем случайный элемент
  for (let i = 0; i < size; i++) {
    const element = array1[0, getRandomNumber(0, array1.length-1)];
    photos.push(element);
  }
  return photos;
};
//координаты в плавающей точкой
const getLocation = () =>{
  const location = {
    x: getRandomQuantity(35.6500, 35.7000, 5),
    y: getRandomQuantity(139.7000, 139.8000, 5),
  };
  return location;
};
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
    location:{
      x: getRandomQuantity(35.6500, 35.7000, 5),
      y: getRandomQuantity(139.7000, 139.8000, 5),
    },
  };
};
createHotel();
//console.log(createHotel());
