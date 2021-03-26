import {onFormReset} from './form.js';

const main = document.querySelector('main');
const templateSuccess = document.querySelector('#success').content;
const successCard = templateSuccess.querySelector('.success').cloneNode(true);
const templateError = document.querySelector('#error').content;
const errorCard = templateError.querySelector('.error').cloneNode(true);

const onSuccessModal = (adverts) => {
  onFormReset(adverts);
  main.appendChild(successCard);
  openModal();
};

const onErrorModal = () => {
  main.appendChild(errorCard);
  openModal();
};


const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onClick = () => {
  closeModal();
}

const openModal = () => {
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onClick);
};

const closeModal = () => {
  if (main.contains(successCard)) {
    main.removeChild(successCard);
  } else {
    main.removeChild(errorCard);
  }
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onClick);
};


export {onSuccessModal, onErrorModal};
