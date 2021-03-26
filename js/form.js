import {onSuccessModal, onErrorModal} from './modal.js';
import {createFetchPost} from './fetch.js';
import {resetMainMarker, renderAdverts, resetMarkers} from './map.js';

const PRICE_TYPE = {
  bungalow: {
    placeholder: '0',
    min: 0,
  },
  flat: {
    placeholder: '1 000',
    min: 1000,
  },
  house: {
    placeholder: '5 000',
    min: 5000,
  },
  palace: {
    placeholder: '10 000',
    min: 10000,
  },
}

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const form = document.querySelector('.ad-form');

const filterForm = document.querySelector('.map__filters');

const coordinateInput = form.querySelector('#address');

const typeOfDwelling  = form.querySelector('#type');

const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');

const roomInput = form.querySelector('#room_number');
const guestInput = form.querySelector('#capacity');
const minInput = form.querySelector('#price');

const buttonReset = document.querySelector('.ad-form__reset');

const updateAddress = (coordinates) => {
  coordinateInput.value = `${coordinates.lat.toFixed(5)} ${coordinates.lng.toFixed(5)}`;
};


const disableForm = () => {
  form.classList.add('ad-form--disabled');
  [...form.children].forEach((item) => {
    item.disabled = true;
  });
}

const activeForm = () => {
  form.classList.remove('ad-form--disabled');
  [...form.children].forEach((item) => {
    item.disabled = false;
  });
}


const disableFilterForm = () => {
  filterForm.classList.add('map__filters--disabled');
  [...filterForm.children].forEach((item) => {
    item.disabled = true;
  });
};

const activeFilterForm = () => {
  filterForm.classList.remove('map__filters--disabled');
  [...filterForm.children].forEach((item) => {
    item.disabled = false;
  });
};

const onTypeofDwellingHandler = () => {
  const selectedItem = typeOfDwelling.value;
  const setting = PRICE_TYPE[selectedItem];
  if (setting) {
    minInput.placeholder = setting.placeholder;
    minInput.min = setting.min;
  }
};

const onChangeOfTime = (evt) => {
  const itemTime = evt.target.value;
  checkIn.value = itemTime;
  checkOut.value = itemTime;
};

const onratioOfRoomsToGuests = () => {
  const rooms = parseInt(roomInput.value, 10);
  const guests = parseInt(guestInput.value, 10);
  if (rooms === 100 ^ guests === 0) {
    guestInput.setCustomValidity('Вы выбрали вариант не подходящий для заселения');
  } else if (rooms < guests) {
    guestInput.setCustomValidity('Невозможно заселить. Выберите большее количество комнат');
  } else {
    guestInput.setCustomValidity('');
  }
  guestInput.reportValidity();
}

const onFormReset = (adverts) => {
  form.reset();
  filterForm.reset();
  resetMainMarker();
  resetMarkers();
  renderAdverts(adverts);
}

const setSubmitHandler = (adverts) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    onTypeofDwellingHandler();
    if (form.checkValidity()) {
      createFetchPost(evt.target, () => onSuccessModal(adverts), onErrorModal);
    } else {
      form.reportValidity();
    }
  });
}

const setButtonResetHandler = (adverts) => {
  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    onFormReset(adverts)
  });
}

const setFilterFormHandler = (adverts) => {
  filterForm.addEventListener('change', () => {
    resetMarkers();
    renderAdverts(adverts);
  });
}

checkIn.addEventListener('change', onChangeOfTime);
checkOut.addEventListener('change', onChangeOfTime);
typeOfDwelling.addEventListener('change', onTypeofDwellingHandler);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

const titleUserInput = form.querySelector('#title');

titleUserInput.addEventListener('input', (evt) => {
  const valueLength = evt.target.value.length;
  titleUserInput.setCustomValidity('');
  if (valueLength < MIN_TITLE_LENGTH) {
    titleUserInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
  }
  if (valueLength > MAX_TITLE_LENGTH) {
    titleUserInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
  }
  titleUserInput.reportValidity();
});


const priceUserInput = form.querySelector('#price');

priceUserInput.addEventListener('input', (evt) => {
  const valuePrice = evt.target.value;
  priceUserInput.setCustomValidity('');
  if (valuePrice > MAX_PRICE) {
    priceUserInput.setCustomValidity('Вы превысили допустимое значение.');
  }
  if (valuePrice < priceUserInput.min) {
    priceUserInput.setCustomValidity('Слишком низкая цена.');
  }
  priceUserInput.reportValidity();
});


roomInput.addEventListener('change', onratioOfRoomsToGuests);



export {updateAddress, disableForm, activeForm, onFormReset, disableFilterForm, activeFilterForm, setFilterFormHandler, setButtonResetHandler, setSubmitHandler};
