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
  const randomQuantity = min + ((Math.floor(((Math.random() * (max - min + 1))) * 10 ** precision)) / (10 ** precision));
  return randomQuantity;
}
//массив строк — массив случайной длины из значений
const features = (array) => { //взято: https://learn.javascript.ru/task/shuffle
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
export {getRandomNumber, getRandomQuantity, features, myNewFunction, getLocation};