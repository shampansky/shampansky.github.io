'use strict';
(function () {
  var MIN_MAP_Y = 130;
  var MAX_MAP_Y = 630;
  var PINS_ON_MAP = 5;

  var map = document.querySelector('.map');

  var revealMap = function () {
    map.classList.remove('map--faded');
  };

  var fadeMap = function () {
    map.classList.add('map--faded');
  };

  // Добавляем пины в разметку через элемент documentFragment

  var createPinsOnMap = function (data) {
    var fragment = document.createDocumentFragment();
    var pinsCount = data.length > PINS_ON_MAP ? PINS_ON_MAP : data.length;
    for (var j = 0; j < pinsCount; j++) {
      fragment.appendChild(window.pin.create(data[j]));
    }

    window.pin.list.appendChild(fragment);

    window.pin.list.addEventListener('click', function (evt) {
      var target = evt.target;
      while (target !== window.pin.list) {
        if (target.classList.contains('app-pin')) {
          window.card.delete();
          createCardOnMap(target.pin);
        }
        target = target.parentNode;
      }

    });
  };

  var removePinsOnMap = function () {
    var pins = document.querySelectorAll('.app-pin');
    Array.prototype.forEach.call(pins, function (node) {
      node.parentNode.removeChild(node);
    });
  };

  var createCardOnMap = function (data) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.create(data));
    map.insertBefore(fragment, window.pin.list);
  };

  window.map = {
    element: map,
    reveal: revealMap,
    hide: fadeMap,
    createPins: createPinsOnMap,
    removePins: removePinsOnMap,
    createCard: createCardOnMap,
    minY: MIN_MAP_Y,
    maxY: MAX_MAP_Y
  };

})();
