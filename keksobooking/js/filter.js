'use strict';

(function () {
  var mapFilters = [].slice.call(document.querySelector('.map__filters').children);

  var filters = window.map.element.querySelector('.map__filters');

  var housingTypeFilter = filters.querySelector('#housing-type');
  var housingPriceFilter = filters.querySelector('#housing-price');
  var housingRoomsFilter = filters.querySelector('#housing-rooms');
  var housingGuestsFilter = filters.querySelector('#housing-guests');

  var features = filters.querySelectorAll('input[name=features]');

  var updatePins = function () {
    var apartments = window.data.apartments;

    var selectedType = housingTypeFilter.value;
    var selectedPrice = housingPriceFilter.value;
    var selectedRooms = housingRoomsFilter.value;
    var selectedGuests = housingGuestsFilter.value;

    var checkType = function (it) {
      return (selectedType === 'any') ? it : it.offer.type === selectedType;
    };

    var checkPrice = function (it) {
      return (selectedPrice === 'any') ? it : selectedPrice === window.util.getPriceRank(it.offer.price);
    };

    var checkRooms = function (it) {
      return (selectedRooms === 'any') ? it : it.offer.rooms === parseInt(selectedRooms, 10);
    };

    var checkGuests = function (it) {
      return (selectedGuests === 'any') ? it : it.offer.guests === parseInt(selectedGuests, 10);
    };

    var checkOptions = function (it) {
      var isMatched = [];
      features.forEach(function (feature) {
        if (feature.checked && !it.offer.features.includes(feature.value)) {
          isMatched.push(false);
        } else {
          isMatched.push(true);
        }
      });
      return (!isMatched.includes(false)) ? it : false;
    };

    var filteredApartments = apartments
      .filter(checkType)
      .filter(checkPrice)
      .filter(checkRooms)
      .filter(checkGuests)
      .filter(checkOptions);


    window.map.createPins(filteredApartments);
  };

  var activateMapFilters = function () {
    window.util.setFormField(mapFilters, false);
  };

  var deactivateMapFilters = function () {
    window.util.setFormField(mapFilters, true);
  };

  var onFilterChange = window.debounce(function () {
    updatePins();
  });

  filters.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.map.removePins();
    window.card.delete();
    onFilterChange();
  });

  window.filter = {
    activateMapFilters: activateMapFilters,
    deactivateMapFilters: deactivateMapFilters,
  };

  deactivateMapFilters();

})();
