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
  slidesPerView: 'auto',
  loopedSlides: 1,
  slidesPerGroup: 1,
  mousewheel: true,
  loop: true,
  initialSlide: 0,
  centeredSlides: true,
  slidesPerView: 1,

  slideShadows: true,
  creativeEffect: {
    prev: {
      translate: ['24%', 0, -200], //([horizontal, vertical, depth])
    },
    // visible: {
    //   translate: ['0%', 0, 0], //([horizontal, vertical, depth])
    // },
    next: {
      translate: ['12%', 0, -100], //([horizontal, vertical, depth])
    },
  }
});