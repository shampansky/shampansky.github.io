'use strict';

var pageHeaderPrimary = document.querySelector('.page-header__primary');
var mainNav = document.querySelector('.main-nav');
var toggle = document.querySelector('.page-header__toggle');

toggle.addEventListener('click', function () {
  if (pageHeaderPrimary.classList.contains('page-header--opened')) {
    mainNav.style.display = 'none';
    pageHeaderPrimary.classList.remove('page-header--opened');
    pageHeaderPrimary.classList.add('page-header--closed');
  } else {
    mainNav.style.display = 'block';
    pageHeaderPrimary.classList.add('page-header--opened');
    pageHeaderPrimary.classList.remove('page-header--closed');
  }
});
