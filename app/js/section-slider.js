document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.section-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: {
      eventsTarget: ".section-slider",
      enabled: true,
    },
    keyboard: {
      enabled: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + "</span>";
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});