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
    },
    autoHeight: true,
  });

  // Обработчик события нажатия клавиши Ctrl
  window.addEventListener('keydown', function (e) {
    if (e.ctrlKey) {
      swiper.mousewheel.disable(); // Отключаем прокрутку мышью, если клавиша Ctrl зажата
    }
  });

  // Обработчик события отпускания клавиши Ctrl
  window.addEventListener('keyup', function (e) {
    if (!e.ctrlKey) {
      swiper.mousewheel.enable(); // Включаем прокрутку мышью, если клавиша Ctrl не зажата
    }
  });
});
