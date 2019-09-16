'use strict';
(function () {

  var adFormFieldsets = Array.prototype.slice.call(document.querySelectorAll('.ad-form fieldset'));
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');
  var adFormReset = document.querySelector('.ad-form__reset');

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
  };

  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');
  };

  var activateFieldsets = function () {
    window.util.setFormField(adFormFieldsets, false);
  };

  var deactivateFieldsets = function () {
    window.util.setFormField(adFormFieldsets, true);
  };

  // поле адрес только для чтения
  var formAddressInput = document.querySelector('#address');
  formAddressInput.readOnly = true;

  // находим поле с типом жилья
  var formAccomTypesSelect = document.querySelector('#type');

  var onChangePriceAttributes = function (minValue) {
    var formPriceInput = document.querySelector('#price');
    formPriceInput.setAttribute('placeholder', minValue);
    formPriceInput.setAttribute('min', minValue);
  };

  // обработчик изменения типа жилья
  formAccomTypesSelect.addEventListener('change', function (evt) {
    var currentSelectionValue = evt.target.options[evt.target.selectedIndex].value;
    onChangePriceAttributes(window.data.acomodations[currentSelectionValue].minPrice);
  });

  // Соответсвие количества комнат количеству гостей
  var formRoomsSelect = document.querySelector('#room_number');
  var formCapacitySelect = document.querySelector('#capacity');
  var formCapacityOptions = document.querySelector('#capacity').children;

  var RoomsForGuests = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var getAllowedGuests = function (roomsCount) {
    var roomsValue = roomsCount;

    [].forEach.call(formCapacityOptions, function (option) {
      var isInRoomsArray = RoomsForGuests[roomsValue].includes(option.value);
      if (isInRoomsArray) {
        option.disabled = false;
      } else {
        option.disabled = true;
      }
    });

    var selCapacityOption = formCapacitySelect.options[formCapacitySelect.selectedIndex];

    // Снимаем выделение на опции, которую нельзя выбрать
    if (selCapacityOption.disabled) {
      selCapacityOption.selected = false;
    }
  };

  getAllowedGuests(formRoomsSelect.options[formRoomsSelect.selectedIndex].value);

  formRoomsSelect.addEventListener('change', function (evt) {
    getAllowedGuests(evt.target.options[evt.target.selectedIndex].value);
  });

  // Синхронизируем Поля «Время заезда» и «Время выезда»
  var timeFieldset = document.querySelector('.ad-form__element--time');

  timeFieldset.addEventListener('change', function (evt) {
    var currentSelectionValue = evt.target.options[evt.target.selectedIndex].value;
    var timeSelectFields = timeFieldset.querySelectorAll('select');
    timeSelectFields.forEach(function (field) {
      field.value = currentSelectionValue;
    });
  });


  deactivateFieldsets();

  var resetForm = function () {
    adForm.reset();
    window.map.hide();
    window.pin.resetCoordsMain();
    window.form.deactivateFieldsets();
    window.form.deactivate();
    window.filter.deactivateMapFilters();
    window.map.removePins();
    window.card.delete();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var successHandler = function () {
      window.success.show();
      resetForm();
    };

    var errorHandler = function () {
      window.error.show();
    };

    window.backend.save(new FormData(adForm), successHandler, errorHandler);

  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  window.form = {
    adForm: adForm,
    address: addressField,
    activate: activateForm,
    deactivate: deactivateForm,
    activateFieldsets: activateFieldsets,
    deactivateFieldsets: deactivateFieldsets,
    resetForm: resetForm
  };

})();
