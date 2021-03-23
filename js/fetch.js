// TODO этот импорт тут ненужен
//создаем функцию, которая возвращает callbackи
const createFetchGet = (onSuccess, onError) => {
  //получение данных с сервера
  //фетч превращается в модуль!
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    //выполнение get-запроса
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
      //console.log(response.status);//посмотреть статус
      //console.log(response.ok);//если ошибка - false
    })
  //  TODO давай лучше используем упрощённую запись, А то создавать функцию которая просто вызывает одну другую функцию. Лишний шаг на пути к светлому будущему:)
    .then(onSuccess)//resolve
    .catch(onError)//если ошибка парсинга - прекратит передачу

};

//отправка данных на сервер. 10. Надо подкачаться
const createFetchPost = (data, onSuccess, onError ) => {
  const formData = new FormData(data);
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        return;
      } // TODO давай добавим какой-нибудь текст ошибки.
      throw new Error ('Ошибка отправки данных');
    })
    .then(() => { //resolve
      onSuccess();
    })
    .catch(() => {//если ошибка парсинга - прекратит передачу
      onError();
    });
};


export {createFetchGet,createFetchPost};
