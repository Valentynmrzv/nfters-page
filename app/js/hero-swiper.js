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
  effect: "cards",
  grabCursor: true,
  simulateTouch: true,
  slidesPerView: 'auto',
  loopedSlides: 1,
  mousewheel: {
    sensitivity: 1,
    eventsTarget: ".live"
  },
  loop: false,
  initialSlide: 0,
  centeredSlides: true,
  slidesPerView: 1,
  cardsEffect: {
    perSlideRotate: 0,
    perSlideOffset: 12,
  },
});