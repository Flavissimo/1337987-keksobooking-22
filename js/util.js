//модуль с утилитарными функциями
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
  return min + ((Math.floor(((Math.random() * (max - min + 1))) * 10 ** precision)) / (10 ** precision));
}
// TODO зачем тут переменная?
//  лучше сразу return min + ((Math.тра-та-та


//массив строк — массив случайной длины из значений
const features = (array) => { //взято: https://learn.javascript.ru/task/shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];//перемешали элементы массива
  }

  return array;
};
// TODO исправь имя функции
const getRandomArray = (array, size) => {
  const photos = [];//новый массив, куда записываем случайный элемент
  for (let i = 0; i < size; i++) {
    const element = array[0, getRandomNumber(0, array.length-1)];
    photos.push(element);
  }
  return photos;
};
//координаты в плавающей точкой
const getLocation = () =>{
  // TODO замени x и y на lat и lng
  return {
    lat: getRandomQuantity(35.6500, 35.7000, 5),
    lng: getRandomQuantity(139.7000, 139.8000, 5),
  };
};


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

export {getRandomNumber, getRandomQuantity, features, getRandomArray, getLocation, getNoun};
