import './modal.js';
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
    .then((json) => { //resolve
      onSuccess(json);
    })
    .catch((err) => {//если ошибка парсинга - прекратит передачу
      onError(err);
    });
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
      }
      throw new Error;
    })
    .then(() => { //resolve
      onSuccess();
    })
    .catch(() => {//если ошибка парсинга - прекратит передачу
      onError();
    });
};


export {createFetchGet,createFetchPost};
