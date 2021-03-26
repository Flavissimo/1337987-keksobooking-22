/* global L:readonly */
import {updateAddress, disableForm, activeForm, disableFilterForm, activeFilterForm, setFilterFormHandler, setButtonResetHandler, setSubmitHandler} from './form.js';
import {filterArray} from './filter.js';
import {createPopup} from './template.js';
import {createFetchGet} from './fetch.js';
import {showAlert} from './util.js';
const TOKYO_CITY_CENTER_COORDS = {lat: 35.68950, lng: 139.69171};
const ZOOM = 10;
const ADVERTS_QTY = 10;

disableFilterForm();
disableForm();

const renderAdverts = (adverts) => {
  filterArray(adverts).slice(0, ADVERTS_QTY).forEach((item) => {
    getUsersPopupMarker(createPopup(item), item);
  });
}

const getUsersPopupMarker = (popupCard, advert) => {

  const adPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  });

  const marker = L.marker(
    {
      lat: advert.location.lat,
      lng: advert.location.lng,
    },
    {
      icon: adPinIcon,
    },
  );
  marker.addTo(adLayer).bindPopup(
    popupCard,
    {
      keepInView: true,
    },
  );

};
const resetMarkers = () => {
  adLayer.clearLayers();
}

const resetMainMarker = () => {
  mainPinMarker.setLatLng(TOKYO_CITY_CENTER_COORDS);
  updateAddress(TOKYO_CITY_CENTER_COORDS);
}

const map = L.map('map-canvas')
  .on('load', () => {
    activeForm();
    updateAddress(TOKYO_CITY_CENTER_COORDS);
    createFetchGet((ads) => {
      activeFilterForm();
      const adverts = ads.slice();
      renderAdverts(adverts);
      setFilterFormHandler(adverts);
      setButtonResetHandler(adverts);
      setSubmitHandler(adverts);
    }, showAlert);
  })
  .setView(
    TOKYO_CITY_CENTER_COORDS, ZOOM);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const adLayer = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  TOKYO_CITY_CENTER_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  updateAddress(evt.target.getLatLng());
});
export {resetMainMarker, renderAdverts, resetMarkers, ADVERTS_QTY};
