
let myImageSlider = new Swiper('.live', {
  effect: "cards",
  // grabCursor: true,
  simulateTouch: true,
  slideToClickedSlide: true,
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
    perSlideOffset: 15,
  },
});