var mainNavButton=document.querySelector(".main-nav__menu-btn"),header=document.querySelector(".page-header");header.classList.remove("page-header--nojs"),header&&mainNavButton.addEventListener("click",function(){header.classList.contains("page-header--opened")?header.classList.remove("page-header--opened"):header.classList.add("page-header--opened")});var modalButton,modalSuccess=document.querySelector(".modal--success"),modalError=document.querySelector(".modal--error"),formReview=document.querySelector(".review"),formInputs=document.querySelectorAll(".review input"),formSubmitButton=document.querySelector(".review__submit"),closeModal=function(){modalSuccess.classList.remove("modal--show"),modalError.classList.remove("modal--show"),modalButton.removeEventListener("click",onButtonClick)},onButtonClick=function(){closeModal()},showMessage=function(e){e.classList.add("modal--show"),(modalButton=e.querySelector(".modal__button")).addEventListener("click",onButtonClick)};formSubmitButton&&formSubmitButton.addEventListener("click",function(e){e.preventDefault();for(var o=!1,t=0;t<formInputs.length;t++){if(!formInputs[t].checkValidity()){o=!0;break}}showMessage(o?modalError:modalSuccess)});var elBookingMapImage=document.querySelector(".booking__map-image"),elBookingMapFrame=document.querySelector(".booking__map");elBookingMapImage&&elBookingMapFrame&&(elBookingMapImage.style.display="none",elBookingMapFrame.style.display="block");