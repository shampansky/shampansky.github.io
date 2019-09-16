'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    numToString: function (n, textForms) {
      n = Math.abs(n) % 100; var n1 = n % 10;
      if (n > 10 && n < 20) {
        return textForms[2];
      }
      if (n1 > 1 && n1 < 5) {
        return textForms[1];
      }
      if (n1 === 1) {
        return textForms[0];
      }
      return textForms[2];
    },
    getPriceRank: function (price) {
      if (price < 10000) {
        return 'low';
      } else if (price >= 10000 && price <= 50000) {
        return 'middle';
      } else if (price > 50000) {
        return 'high';
      }
      return false;
    },
    setFormField: function (fieldSetArr, isDisabled) {
      fieldSetArr.forEach(function (fieldSet) {
        if (isDisabled) {
          fieldSet.setAttribute('disabled', 'disabled');
        } else {
          fieldSet.removeAttribute('disabled');
        }
      });
    }
  };
})();
