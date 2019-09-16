'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var elemMain = document.querySelector('main');
  var elemCloseButton;
  var onErrorEscPress = function (evt) {
    window.util.isEscEvent(evt, hideErrorMessage);
  };

  var onErrorClick = function () {
    hideErrorMessage();
  };

  var showErrorMessage = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    elemMain.appendChild(errorMessage);
    elemCloseButton = elemMain.querySelector('.error__button');
    elemCloseButton.addEventListener('click', onErrorClick);
    elemMain.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var hideErrorMessage = function () {
    var message = document.querySelector('.error');
    if (message) {
      elemMain.removeChild(message);
      document.removeEventListener('keydown', onErrorEscPress);
      elemCloseButton.removeEventListener('click', onErrorClick);
      elemMain.removeEventListener('click', onErrorClick);
    }
  };

  window.error = {
    show: showErrorMessage,
    hide: hideErrorMessage
  };

})();
