// let myImageSlider = new Swiper('.live', {
//   effect: "cards",
//   grabCursor: true,
//   slidesPerView: 'auto',
//   slidesPerGroup: 1,
//   mousewheel: true,
//   loop: true,
//   simulateTouch: false,
// });

let myImageSlider = new Swiper('.live', {
  effect: "creative",
  grabCursor: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  mousewheel: true,
  loop: true,
  initialSlide: 1,
  centeredSlides: true,
  slidesPerView: 1,
  creativeEffect: {
    prev: {
      translate: ['20%', 0, -100], //([horizontal, vertical, depth])
    },
    visible: {
      translate: ['0%', 0, 0], //([horizontal, vertical, depth])
    },
    next: {
      translate: ['10%', 0, -50], //([horizontal, vertical, depth])
    },
  }
});