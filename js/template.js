import {createHotel} from './data.js';
import {getNoun} from './util.js';

const TRANSLATED_RUS_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

const map = document.querySelector('#map-canvas');
const template = document.querySelector('#card').content;

const copiedTemplate = template.cloneNode(true);
const templateTitle = copiedTemplate.querySelector('.popup__title');
const templateAdress = copiedTemplate.querySelector('.popup__text--address');
const templatePrice = copiedTemplate.querySelector('.popup__text--price');
const templateType = copiedTemplate.querySelector('.popup__type');
const templateCapacity = copiedTemplate.querySelector('.popup__text--capacity');
const templateTime = copiedTemplate.querySelector('.popup__text--time');
const templateFeatures = copiedTemplate.querySelector('.popup__features');
const templatesDescription = copiedTemplate.querySelector('.popup__description');
const templatePhotos = copiedTemplate.querySelector('.popup__photos');
const templateImage = copiedTemplate.querySelector('.popup__photo');
const templateAvatar = copiedTemplate.querySelector('.popup__avatar');

const advert = createHotel();
templateTitle.textContent = advert.offer.title;
templateAdress.textContent = advert.offer.address;
templatePrice.textContent = advert.offer.price + ' ₽/ночь';
templateType.textContent = TRANSLATED_RUS_TYPES[advert.offer.type];
templateTime.textContent ='Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
templatesDescription.textContent = advert.offer.description;
templateAvatar.src = advert.author.avatar;
templateCapacity.textContent = (`${advert.offer.rooms} ${getNoun(advert.offer.rooms, 'комната','комнаты','комнат')} для ${advert.offer.guests} ${getNoun(advert.offer.rooms, 'гостя','гостей','гостей')}`);

//работа с фотографиями
const photoLinks = advert.offer.photos;
const container = document.createDocumentFragment();

photoLinks.forEach((link) => {
  const newImage = templateImage.cloneNode();
  newImage.src = link;
  container.appendChild(newImage);
});
templatePhotos.innerHTML = '';

templatePhotos.appendChild(container);

// работа с массивом фич
templateFeatures.innerHTML = '';
const features = advert.offer.features;
const listContainer = document.createDocumentFragment();

features.forEach((feature) => {
  const liElement = document.createElement('li');
  liElement.classList.add('popup__feature');
  const className = 'popup__feature--' + feature;
  liElement.classList.add(className);
  listContainer.appendChild(liElement);
});
templateFeatures.appendChild(listContainer);

//console.log(templatePhotos);

map.appendChild(copiedTemplate);
