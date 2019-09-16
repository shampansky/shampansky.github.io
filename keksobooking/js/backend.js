'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var SUCCESS = 200;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS) {
          onLoad(xhr.response);
        } else {
          onError('Ошибка при обработке запроса: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.open('GET', URL_GET);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      // Создаем объект запроса
      var xhr = new XMLHttpRequest();
      // Задаем тип передаваемых данных
      xhr.responseType = 'json';
      // Обработчик загруженных данных
      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS) {
          onLoad();
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      // Открываем соединение
      xhr.open('POST', URL_POST);
      // Отправляем запрос
      xhr.send(data);
    }
  };

})();
