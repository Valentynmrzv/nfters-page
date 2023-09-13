document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.section-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: {
      eventsTarget: ".section-slider",
      enabled: true,
      releaseOnEdges: true, // Разрешить прокрутку при достижении края слайдера
    },
    keyboard: {
      enabled: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    autoHeight: false,
  });

  // Обработчик события перед прокруткой слайдера
  swiper.on('beforeInit', function () {
    swiper.mousewheel.disable(); // Отключаем прокрутку мышью при инициализации
  });

  // Обработчик события перед уничтожением слайдера
  swiper.on('beforeDestroy', function () {
    swiper.mousewheel.enable(); // Включаем прокрутку мышью перед уничтожением
  });

  // Обработчик события нажатия клавиши
  window.addEventListener('keydown', function (e) {
    if (e.ctrlKey) {
      swiper.mousewheel.disable(); // Отключаем прокрутку мышью, если клавиша Ctrl зажата
    }
  });

  // Обработчик события отпускания клавиши
  window.addEventListener('keyup', function (e) {
    if (!e.ctrlKey) {
      swiper.mousewheel.enable(); // Включаем прокрутку мышью, если клавиша Ctrl не зажата
    }
  });
});
