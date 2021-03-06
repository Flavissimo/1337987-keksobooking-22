import {getNoun} from './util.js';

const TRANSLATED_RUS_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

const popupTemplate = document.querySelector('#card').content;

const getPhotoLinks = (advert, templateImage, templatePhotos) => {
  const photoLinks = advert.offer.photos;
  const container = document.createDocumentFragment();
  (photoLinks || []).forEach((link) => {
    const newImage = templateImage.cloneNode();
    newImage.src = link;
    container.appendChild(newImage);
  });
  templatePhotos.innerHTML = '';

  templatePhotos.appendChild(container);
};

const createFeatures = (features, templateFeatures) => {
  templateFeatures.innerHTML = '';
  const listContainer = document.createDocumentFragment();
  (features || []).forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    const className =`popup__feature--${feature}`;
    featureElement.classList.add(className);
    listContainer.appendChild(featureElement);
  });
  templateFeatures.appendChild(listContainer);
}

const createPopup = (advert) => {
  const popupElement = popupTemplate.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = advert.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = TRANSLATED_RUS_TYPES[advert.offer.type];
  const templateCapacity = popupElement.querySelector('.popup__text--capacity');
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin} , выезд до ${advert.offer.checkout}`;
  const templateFeatures = popupElement.querySelector('.popup__features');
  popupElement.querySelector('.popup__description').textContent = advert.offer.description;
  const templatePhotos = popupElement.querySelector('.popup__photos');
  const templateImage = popupElement.querySelector('.popup__photo');
  popupElement.querySelector('.popup__avatar').src = advert.author.avatar;

  const roomEnding = getNoun(advert.offer.rooms, 'комната', 'комнаты', 'комнат');
  const guestEnding = getNoun(advert.offer.rooms, 'гостя', 'гостей', 'гостей');
  if (advert.offer.rooms && advert.offer.guests) {
    templateCapacity.textContent = (`${advert.offer.rooms} ${roomEnding} для ${advert.offer.guests} ${guestEnding}`);
  }

  getPhotoLinks(advert, templateImage, templatePhotos);
  createFeatures(advert.offer.features, templateFeatures);
  return  popupElement;
}
export {createPopup};
