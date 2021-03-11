
import {getNoun} from './util.js';

const TRANSLATED_RUS_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};
const map = document.querySelector('#map-canvas');
// TODO popupTemplate
const popupTemplate = document.querySelector('#card').content;

const createPopup = (advert) => {
  // TODO popupElement
  const copiedTemplate = popupTemplate.cloneNode(true);
  // TODO но они уже не template. ты ж уже скопировала этот шаблон и работаешь с копией которую будешь вставлять в разметку
  //  таким образом templateTitle превращается в titleElement
  //  НО. templateTitle используешь только один раз по этому не вижу смысла в переменной
  //  const templateTitle = copiedTemplate.querySelector('.popup__title');
  //  templateTitle.textContent = advert.offer.title;
  //  Проще так
  //  copiedTemplate.querySelector('.popup__title').textContent = advert.offer.title;
  //  С остальными та же песня
  copiedTemplate.querySelector('.popup__title').textContent = advert.offer.title;
  // TODO в слове address две d
  const templateAddress = copiedTemplate.querySelector('.popup__text--address');
  const templatePrice = copiedTemplate.querySelector('.popup__text--price');
  const templateType = copiedTemplate.querySelector('.popup__type');
  const templateCapacity = copiedTemplate.querySelector('.popup__text--capacity');
  const templateTime = copiedTemplate.querySelector('.popup__text--time');
  const templateFeatures = copiedTemplate.querySelector('.popup__features');
  const templatesDescription = copiedTemplate.querySelector('.popup__description');
  const templatePhotos = copiedTemplate.querySelector('.popup__photos');
  const templateImage = copiedTemplate.querySelector('.popup__photo');
  const templateAvatar = copiedTemplate.querySelector('.popup__avatar');
  templateAddress.textContent = advert.offer.address;
  // TODO замени конкатенацию строк форматированными строками
  templatePrice.textContent = `${advert.offer.price} ₽/ночь`;
  templateType.textContent = TRANSLATED_RUS_TYPES[advert.offer.type];
  // TODO замени конкатенацию строк форматированными строками
  templateTime.textContent = `Заезд после ${advert.offer.checkin} , выезд до ${advert.offer.checkout}`;
  templatesDescription.textContent = advert.offer.description;
  templateAvatar.src = advert.author.avatar;
  // TODO это слишком длинная строка
  //  для начала
  //  это getNoun(advert.offer.rooms, 'комната','комнаты','комнат')
  //  и это getNoun(advert.offer.rooms, 'гостя','гостей','гостей')
  //  вынеси в переменные
  const roomEnding = getNoun(advert.offer.rooms, 'комната', 'комнаты', 'комнат');
  const guestEnding = getNoun(advert.offer.rooms, 'гостя', 'гостей', 'гостей');
  // TODO если advert.offer.rooms отсутствует тогда он undefined или NaN или ещё какая ерунда которую js
  //  может превратить в false. А раз так, то:
  if (advert.offer.rooms && advert.offer.guests) {
    templateCapacity.textContent = (`${advert.offer.rooms} ${roomEnding} для ${advert.offer.guests} ${guestEnding}`);
  }
  //  т.е. если поля нормальные, то мы заполняем templateCapacity.textContent иначе оставляем его пустым и идём дальше

  // TODO если тебе нужен этот комментарий что бы понять, что тут происходит, то это звоночек,
  //  что пора создавать новую функцию...я тупая...
  //работа с фотографиями

  const getPhotoLinks = () => {
    const photoLinks = advert.offer.photos;//находим photos и передаем в photoLinks
    const container = document.createDocumentFragment(); //создаем шаблон, пока пустой
    // TODO если photoLinks вообще отсутствует в данных то при обращении к нему вернётся undefined
    (photoLinks || []).forEach((link) => {
      const newImage = templateImage.cloneNode();
      //на каждой итерации клонируем <img src="" class="popup__photo"> и передаем в newImage
      newImage.src = link; //добавляем путь для <img>
      container.appendChild(newImage);//добавляем в наш пустой шаблон
    });
    templatePhotos.innerHTML = '';//убираем из кода первый <img> в HTML

    templatePhotos.appendChild(container);//добавляем заполненный шаблон в код <img>
  };
  getPhotoLinks();

  //console.log(getPhotoLinks());

  // TODO если тебе нужен этот комментарий что бы понять, что тут происходит, то это звоночек,
  //  что пора создавать новую функцию...я тупая №2
  // работа с массивом фич

  templateFeatures.innerHTML = '';
  const features = advert.offer.features;
  const listContainer = document.createDocumentFragment();

  // TODO если features вообще отсутствует в данных то при обращении к нему вернётся undefined
  //  таким не хитрым способом мы решаем эту проблему
  (features || []).forEach((feature) => {
    // TODO featureElement
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    // TODO замени конкатенацию строк форматированными строками
    const className =`popup__feature-- ${feature}`;
    featureElement.classList.add(className);
    listContainer.appendChild(featureElement);
  });
  templateFeatures.appendChild(listContainer);
  //console.log(templatePhotos);

  map.appendChild(copiedTemplate);
}
export {createPopup};
