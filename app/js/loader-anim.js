document.addEventListener('DOMContentLoaded', function () {
  // После полной загрузки страницы скрываем анимацию загрузки
  window.addEventListener('load', function () {
    const loaderOverlay = document.querySelector('.loader-overlay');
    loaderOverlay.style.display = 'none';
  });
});