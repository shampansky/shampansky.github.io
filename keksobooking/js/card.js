'use strict';

(function () {
  var PHOTO_WIDTH = '45';
  var PHOTO_HEIGHT = '40';

  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('article');
  var cardElement;
  var elemCloseCard;

  var createCard = function (cardData) {
    cardElement = cardTemplate.cloneNode(true);
    elemCloseCard = cardElement.querySelector('.popup__close');

    var cardAvatar = cardElement.querySelector('img');
    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var featuresList = cardElement.querySelector('.popup__features');
    var cardDescription = cardElement.querySelector('.popup__description');
    var photos = cardElement.querySelector('.popup__photos');

    // Удаляем опции из шаблона
    while (featuresList.firstChild) {
      featuresList.removeChild(featuresList.firstChild);
    }

    // Удаляем фото из шаблона
    while (photos.firstChild) {
      photos.removeChild(photos.firstChild);
    }

    cardAvatar.setAttribute('src', cardData.author.avatar);
    cardTitle.textContent = cardData.offer.title;
    cardAddress.textContent = cardData.offer.address;
    cardPrice.innerHTML = cardData.offer.price + '&#x20bd;<span>/ночь</span>';
    cardType.textContent = window.data.acomodations[cardData.offer.type].name;
    cardCapacity.textContent =
    cardData.offer.rooms +
    ' ' +
    window.util.numToString(cardData.offer.rooms, ['комната', 'комнаты', 'комнат']) +
    ' для '
    + cardData.offer.guests +
    ' ' +
    window.util.numToString(cardData.offer.guests, ['гостя', 'гостей', 'гостей']);
    cardTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

    // Добавляем опции из данных с сервера
    cardData.offer.features.forEach(function (feature) {
      var elemFeatureItem = document.createElement('li');
      elemFeatureItem.classList.add('popup__feature', 'popup__feature--' + feature);
      featuresList.appendChild(elemFeatureItem);
    });

    cardDescription.textContent = cardData.offer.description;

    // Добавляем фото из данных с сервера
    cardData.offer.photos.forEach(function (photo) {
      var elemPhoto = document.createElement('img');
      elemPhoto.setAttribute('src', photo);
      elemPhoto.setAttribute('width', PHOTO_WIDTH);
      elemPhoto.setAttribute('height', PHOTO_HEIGHT);
      elemPhoto.setAttribute('alt', 'Фотография жилья');
      elemPhoto.classList.add('popup__photo');
      photos.appendChild(elemPhoto);
    });

    elemCloseCard.addEventListener('click', onElemCloseCardClick);
    document.addEventListener('keydown', onCardEscPress);

    return cardElement;
  };

  var onElemCloseCardClick = function () {
    removeCard();
  };

  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, removeCard);
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      window.map.element.removeChild(card);
      elemCloseCard.removeEventListener('click', onElemCloseCardClick);
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  window.card = {
    create: createCard,
    delete: removeCard
  };

})();
