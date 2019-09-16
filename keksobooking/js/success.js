'use strict';

(function () {
  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var body = document.querySelector('body');

  var onSuccessEscPress = function (evt) {
    window.util.isEscEvent(evt, hideSuccessMessage);
  };

  var onSuccessClick = function () {
    hideSuccessMessage();
  };

  var showSuccessMessage = function () {
    var successMessage = successTemplate.cloneNode(true);
    body.appendChild(successMessage);
    body.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var hideSuccessMessage = function () {
    var message = document.querySelector('.success');
    if (message) {
      document.querySelector('body').removeChild(message);
      document.removeEventListener('keydown', onSuccessEscPress);
      body.removeEventListener('click', onSuccessClick);
    }
  };

  window.success = {
    show: showSuccessMessage,
    hide: hideSuccessMessage
  };

})();
