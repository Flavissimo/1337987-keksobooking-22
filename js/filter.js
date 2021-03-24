/*const HOUSING_PRICE = {
  'low':  10000,
  'high': 50000,
};*/

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

  const {
    type,
    // price,
    // rooms,
    // guests,
    // features
  } = card.offer;
  const flags = [];

  if (filter.type === 'any') {//фильтруем тип жилья
    flags.push(true);
  } else {
    if (type !== filter.type) {
      flags.push(false);
    }
    flags.push(true);
  }

  return !flags.includes(false);
}

const filterArray = (array) => {
  let resultArray = array.slice();//копия массива с карточками
  return resultArray.filter((item) => { return isSuitableItem(item) });
}

export {filterArray};
