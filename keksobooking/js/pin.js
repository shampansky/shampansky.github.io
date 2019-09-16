'use strict';

(function () {
  var PIN_SIZE_X = 50;
  var PIN_SIZE_Y = 70;

  var MAIN_PIN_X = 65;
  var MAIN_PIN_Y = 82;

  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;

  // Блок с пинами в разметке
  var pinList = document.querySelector('.map__pins');
  // Главный пин
  var mainPin = document.querySelector('.map__pin--main');
  // Блок шаблона пина
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('button');

  // Создание пина
  var createPin = function (pin) {
    var style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';

    var pinElement = pinTemplate.cloneNode(true);

    pinElement.setAttribute('style', style);
    pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
    pinElement.classList.add('app-pin');
    pinElement.pin = pin;
    return pinElement;
  };

  var addMainPinCoordinates = function (pin, pinWidth, pinHeight, input) {
    var xCoord = parseInt(pin.style.left, 10) + Math.floor(pinWidth / 2);
    var yCoord = parseInt(pin.style.top, 10) + pinHeight;
    input.value = xCoord + ', ' + yCoord;
  };

  var resetMainPinCoords = function () {
    window.pin.main.style.top = MAIN_PIN_DEFAULT_Y + 'px';
    window.pin.main.style.left = MAIN_PIN_DEFAULT_X + 'px';
  };

  // Обработчик перетаскивания
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinBorders = {
      minX: 0,
      maxX: window.map.element.clientWidth - MAIN_PIN_X,
      minY: window.map.minY,
      maxY: window.map.maxY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // координаты главного пина в разметке
      var mainPinYpos = window.pin.main.offsetTop - shift.y;
      var mainPinXpos = window.pin.main.offsetLeft - shift.x;

      // Ограничиваем область перемещения главного пина
      if (mainPinYpos < pinBorders.minY) {
        mainPinYpos = pinBorders.minY;
      }

      if (mainPinYpos > pinBorders.maxY) {
        mainPinYpos = pinBorders.maxY;
      }

      if (mainPinXpos < pinBorders.minX) {
        mainPinXpos = pinBorders.minX;
      }

      if (mainPinXpos > pinBorders.maxX) {
        mainPinXpos = pinBorders.maxX;
      }

      // Задаем координаты главного пина в стилях
      window.pin.main.style.top = mainPinYpos + 'px';
      window.pin.main.style.left = mainPinXpos + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      addMainPinCoordinates(mainPin, MAIN_PIN_X, MAIN_PIN_Y, window.form.address);
      // активируем элементы интерфейса
      if (window.map.element.classList.contains('map--faded')) {
        window.map.reveal();
        window.map.createPins(window.data.apartments);
        window.form.activate();
        window.form.activateFieldsets();
        window.filter.activateMapFilters();
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    list: pinList,
    main: mainPin,
    create: createPin,
    size: {
      x: PIN_SIZE_X,
      y: PIN_SIZE_Y
    },
    sizeMain: {
      x: MAIN_PIN_X,
      y: MAIN_PIN_Y
    },
    addCoordsMain: addMainPinCoordinates,
    resetCoordsMain: resetMainPinCoords
  };

})();
