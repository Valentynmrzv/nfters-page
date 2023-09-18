// document.addEventListener('DOMContentLoaded', function () {
//   const swiper = new Swiper('.section-slider', {
//     direction: 'horizontal',
//     slidesPerView: 1,
//     spaceBetween: 0,
//     mousewheel: {
//       enabled: false,
//       sensitivity: 10,
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     on: {
//       slideChange: function () {
//         if (swiper.isBeginning) {
//           document.querySelector('.swiper-button-prev').style.display = 'none';
//         } else {
//           document.querySelector('.swiper-button-prev').style.display = 'block';
//         }

//         if (swiper.isEnd) {
//           document.querySelector('.swiper-button-next').style.display = 'none';
//         } else {
//           document.querySelector('.swiper-button-next').style.display = 'block';
//         }
//       },
//     },
//     keyboard: {
//       enabled: true,
//     },
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//       dynamicBullets: true,
//     },
//     autoHeight: false,
//   });
//   //  ========= ctrlKey =========
//   window.addEventListener('keydown', function (e) {
//     if (e.ctrlKey) {
//       swiper.mousewheel.disable();
//     }
//   });

//   window.addEventListener('keyup', function (e) {
//     if (!e.ctrlKey) {
//       swiper.mousewheel.enable();
//     }
//   });
// });
