let collectionsSlider = new Swiper('#collections-swiper', {
  effect: "fade",
  simulateTouch: true,
  slideToClickedSlide: true,
  slidesPerView: 'auto',
  loopedSlides: 1,
  loop: true,
  initialSlide: 0,
  centeredSlides: true,
  slidesPerView: 1,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});