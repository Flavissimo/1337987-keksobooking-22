
//Задание №1. Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomNumber(min, max) {
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
 console.log(getRandomNumber(2, 6,));


//Задание №2. Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
function getRandomQuantity(min, max, precision) { //
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
  let randomQuantity = min + ((Math.floor(((Math.random() * (max - min + 1))) * 10 ** precision)) / (10 ** precision));
  return randomQuantity;
}
console.log(getRandomQuantity(2, 31, 5));
