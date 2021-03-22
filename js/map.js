/* global L:readonly */
import {updateAdress, disableFilterForm, activeFilterForm, disableForm, activeForm} from './form.js';
import {createPopup} from './template.js';
import {createFetchGet} from './fetch.js';
import {showAlert} from './util.js';
const TOKYO_CITY_CENTER_COORDS = {lat: 35.68950, lng: 139.69171};
const ZOOM = 10;
//блокировка фильтров и формы
disableFilterForm();
disableForm();

//создаем функцию, где используем готовую карточку, а информацию берем с сервера. Функция является колбэком succes createFetchGet(renderAdverts, showAlert);
const renderAdverts = (adverts) => {
  adverts.forEach((item) => {
    getUsersPopupMarker(createPopup(item), item);
  });

}

const map = L.map('map-canvas')
  .on('load', () => {//когда карта будет готова
    activeFilterForm();
    activeForm();
    updateAdress(TOKYO_CITY_CENTER_COORDS);
    createFetchGet(renderAdverts, showAlert);
  })
  .setView(//устанавливаем представление о карте
    TOKYO_CITY_CENTER_COORDS, ZOOM);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({//большая красна метка
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],//это координаты кончика хвоста метки
});

const mainPinMarker = L.marker(//главный маркер
  TOKYO_CITY_CENTER_COORDS,
  {
    draggable: true, //маркер можно передвигать по карте
    icon: mainPinIcon,//добавляем иконку
  },
);
mainPinMarker.addTo(map);
//это должна быть функция т.к. объявлений будет много.
const getUsersPopupMarker = (popupCard, advert) => {
  //создаем иконку для маркера объявлений
  const adPinIcon = L.icon({//большая красна метка
    iconUrl: 'img/pin.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 26],//это координаты кончика хвоста метки
  });
  //добавляем маркер объявления и шаблон!!
  //иконка не в той секции. посмотри как сделано в mainPin-е
  const marker = L.marker(
    {
      lat: advert.location.lat,
      lng: advert.location.lng,
    },
    {
      icon: adPinIcon,
    },
  );
  marker.addTo(map).bindPopup( //балун
    popupCard,//сама карточка товара
    {
      keepInView: true,
    },
  );
  //mainPinMarker.remove();если хотим удалить
};

const resetMainMarker = () => {
  mainPinMarker.setLatLng(TOKYO_CITY_CENTER_COORDS);
  updateAdress(TOKYO_CITY_CENTER_COORDS);
}

mainPinMarker.on('moveend', (evt) => {
  updateAdress(evt.target.getLatLng());//координаты метки
});
export {resetMainMarker};
