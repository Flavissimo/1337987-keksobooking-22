
const HOUSING_PRICE = {
  'low':  10000,
  'high': 50000,
}
//фильтр под картой
const filterForm = document.querySelector('.map__filters');

const selectHouseType = filterForm.querySelector('#housing-type');
const selectHousePrice = filterForm.querySelector('#housing-price');
const selectHouseRoom = filterForm.querySelector('#housing-rooms');
const selectHouseGuest = filterForm.querySelector('#housing-guests');
const selectHouseFeature = filterForm.querySelector('#housing-features');


const getSelectedFeatures = () => {
  return [...selectHouseFeature.querySelectorAll('input:checked')].map((item) => {
    return item.value;
  });
}

const getSelectedFilters = () => {
  return {
    type: selectHouseType.value,
    price: selectHousePrice.value,
    rooms: selectHouseRoom.value,
    guests: selectHouseGuest.value,
    features: getSelectedFeatures(),
  }
}


const isSuitableItem = (card) => {//деструктуризация
  const filter = getSelectedFilters();

  const isNotAny = (string) => {
    return string !== 'any';
  };

  const {
    type,
    price,
    //rooms,
    //guests,
    //features,
  } = card.offer;
  const flags = [];
  //что то не так в параметре - нужна помощь
  if (filter.features.length !== 0) { //features
    flags.push(filter.features.every(feature => card.offer.features.includes(feature)));
  }

  if (isNotAny(filter.price)) { //фильтруем цену
    switch (filter.price) {
      case 'low':
        flags.push (price < HOUSING_PRICE[filter.price]);
        break;
      case 'high':
        flags.push (price > HOUSING_PRICE[filter.price]);
        break;
      case 'middle':
        flags.push (price >= HOUSING_PRICE['low']) && (price <= HOUSING_PRICE['hight']);
        break;
      default:
        flags.push (false);
        break;
    }
  }

  if (filter.type === 'any') { //фильтруем тип жилья
    flags.push(true);
  } else {
    if (type !== filter.type) {
      flags.push(false);
    }
    flags.push(true);
  }
  if (isNotAny(filter.type)) {
    flags.push(filter.type === card.offer.type);
  }

  if (isNotAny(filter.rooms)) {
    flags.push(filter.rooms === card.offer.rooms.toString())
  }

  if (isNotAny(filter.guests)) {
    flags.push(filter.guests === card.offer.guests.toString())
  }

  return !flags.includes(false);
}


const filterArray = (array) => {
  let resultArray = array.slice();//копия массива с карточками
  return resultArray.filter((item) => { return isSuitableItem(item) });
}

/*const setFilterChahge = (parametrs) => {//не уверена
filterForm.addEventListener('change', () => {
  filter = getSelectedFilters();
    parametrs();
})
}*/

export {filterArray};
