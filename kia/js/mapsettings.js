'use strict';
ymaps.ready(init);

function init () {
  var myMap = new ymaps.Map("map", {
  center:[45.017811, 38.936781],
  zoom: 16,
  controls: []
});

var myGeoObjects = [];

myGeoObjects = new ymaps.Placemark([45.017955, 38.935322],
  {
    balloonContentBody: 'Автохолдинг',
  },
  {
    iconLayout: 'default#image',
    iconImageHref: 'img/icon-location.svg',
    iconImageSize: [31, 42],
    iconImageOffset: [-15, -42]
  }
);

var clusterer = new ymaps.Clusterer({
  clusterDisableClickZoom: false,
  clusterOpenBalloonOnClick: false,
});
  clusterer.add(myGeoObjects);
  myMap.geoObjects.add(clusterer);
  myMap.behaviors.disable('scrollZoom');
}
