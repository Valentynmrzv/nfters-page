document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.section-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: {
      eventsTarget: ".section-slider",
      enabled: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: function () {
        // Перевіряємо, чи є слайди для переходу назад і вперед
        if (swiper.isBeginning) {
          // Приховуємо кнопку "Попередній слайд", якщо немає слайдів назад
          document.querySelector('.swiper-button-prev').style.display = 'none';
        } else {
          // Показуємо кнопку "Попередній слайд", якщо є слайди назад
          document.querySelector('.swiper-button-prev').style.display = 'block';
        }

        if (swiper.isEnd) {
          // Приховуємо кнопку "Наступний слайд", якщо немає слайдів вперед
          document.querySelector('.swiper-button-next').style.display = 'none';
        } else {
          // Показуємо кнопку "Наступний слайд", якщо є слайди вперед
          document.querySelector('.swiper-button-next').style.display = 'block';
        }
      },
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
