import {ADVERTS_QTY} from './map.js';

const PriceRange = {
  low: {
    MIN: 0,
    MAX: 10000,
  },
  middle: {
    MIN: 10000,
    MAX: 50000,
  },
  high: {
    MIN: 50000,
    MAX: Infinity,
  },
};
//фильтр под картой
const filterForm = document.querySelector('.map__filters');

const selectHouseType = filterForm.querySelector('#housing-type');
const selectHousePrice = filterForm.querySelector('#housing-price');
const selectHouseRoom = filterForm.querySelector('#housing-rooms');
const selectHouseGuest = filterForm.querySelector('#housing-guests');
const selectHouseFeature = filterForm.querySelector('#housing-features');

const validatePrice = (offer) => {
  const currentPrice = selectHousePrice.value;
  return currentPrice === 'any' || (
    PriceRange[currentPrice].MIN <= offer.price &&
    PriceRange[currentPrice].MAX >= offer.price
  );
}

const validateType = (offer) => {
  const currentType = selectHouseType.value;
  return currentType === 'any' || currentType === offer.type;
}

const validateRooms = (offer) => {
  return selectHouseRoom.value === 'any' || selectHouseRoom.value === offer.rooms.toString();
}

const validateGuests = (offer) => {
  return selectHouseGuest.value === 'any' || selectHouseGuest.value === offer.guests.toString();
}

const validateFeatures = (offer) => {
  return [...selectHouseFeature.querySelectorAll('input:checked')].every((feature) => offer.features.includes(feature.value));
}

const isSuitableItem = (card) => {
  const offer = card.offer;
  return validatePrice(offer) &&
    validateType(offer) &&
    validateRooms(offer) &&
    validateGuests(offer) &&
    validateFeatures(offer);
}


const filterArray = (cards) => {
  const filteredCards = [];
  for (let card of cards) {
    if (isSuitableItem(card)) {
      filteredCards.push(card);
      if (filteredCards.length >= ADVERTS_QTY) {
        break;
      }
    }
  }
  return filteredCards;
}


export {filterArray};
