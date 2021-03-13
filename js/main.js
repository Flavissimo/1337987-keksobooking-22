//точка входа
import {createPopup, map} from './template.js';
import {createHotel} from './data.js';
const advert = createHotel();
const popup = createPopup(advert);
map.appendChild(popup);
