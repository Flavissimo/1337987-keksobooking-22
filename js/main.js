//точка входа
import {createPopup, map} from './template.js';
import {createHotel} from './data.js';
import './form.js';

const advert = createHotel();
const popup = createPopup(advert);
map.appendChild(popup);
