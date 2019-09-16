'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var housingPhotoContainer = document.querySelector('.ad-form__photo-container');
  var housingEmptyDiv = document.querySelector('div.ad-form__photo');
  var avatarPeview = document.querySelector('.ad-form-header__preview img');
  var avatarImageChooser = document.querySelector('#avatar');
  var housingImageChooser = document.querySelector('#images');

  var addImagePreview = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  housingImageChooser.addEventListener('change', function () {
    var housingImage = document.createElement('img');
    housingImage.classList.add('ad-form__photo');
    addImagePreview(housingImageChooser, housingImage);
    housingPhotoContainer.insertBefore(housingImage, housingEmptyDiv);
  });

  avatarImageChooser.addEventListener('change', function () {
    addImagePreview(avatarImageChooser, avatarPeview);
  });
})();
