const createFetchGet = (Success, Error) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(Success)
    .catch(Error)
};

const createFetchPost = (data, Success, Error ) => {
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
      Success();
    })
    .catch(() => {
      Error();
    });
};


export {createFetchGet,createFetchPost};
