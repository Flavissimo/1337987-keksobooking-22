//точка входа
import {createPopup} from './template.js';
import {createHotel} from './data.js';
// TODO эти две строки перенеси в main.js
const advert = createHotel();
createPopup(advert);
