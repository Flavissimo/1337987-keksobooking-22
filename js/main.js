//точка входа
import {createPopup, map} from './template.js';
import {createHotel} from './data.js';
const popup = createPopup(advert);
const advert = createHotel();
map.appendChild( popup);
