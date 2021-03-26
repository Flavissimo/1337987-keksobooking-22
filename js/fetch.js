const createFetchGet = (onSuccess, onError) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onError)
};

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
      throw new Error ('Ошибка отправки данных');
    })
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
};


export {createFetchGet,createFetchPost};
