window.onload=function(){var e=document.querySelector(".about__list");if(e)new Masonry(e,{itemSelector:".about__item",columnWidth:362,gutter:30,percentPosition:!0});var t=document.querySelectorAll(".masonry__list");t&&Array.prototype.slice.call(t,0).forEach(function(e){new Masonry(e,{itemSelector:".masonry__item",columnWidth:264,gutter:30,percentPosition:!0})});function n(){var e=o.options[o.selectedIndex].value;r.textContent=i[e]}var o=document.getElementById("category"),r=document.querySelector(".newsletter__title"),i={all:"Будьте в курсе новостей",vacancy:"Будьте в курсе вакансий",events:"Будьте в курсе мероприятий",news:"Будьте в курсе новостей"};o&&(n(),o.addEventListener("change",n)),document.querySelector(".articles")&&new Swiper(".articles",{slidesPerView:"auto",centeredSlides:!0,spaceBetween:30,initialSlide:1,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},scrollbar:{el:".swiper-scrollbar"}})};