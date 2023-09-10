function addUnderlineToCurrentPage() {
  // Получаем текущее название файла
  var currentFileName = window.location.pathname.split('/').pop();

  // Находим элементы ссылок навигационного меню
  var navigationLinks = document.getElementsByClassName('navigation__link');

  // Перебираем найденные ссылки
  for (var i = 0; i < navigationLinks.length; i++) {
    var link = navigationLinks[i];

    // Получаем название файла из ссылки
    var linkFileName = link.getAttribute('href').split('/').pop();

    // Проверяем, соответствует ли название файла текущему файлу
    if (linkFileName === currentFileName) {
      // Добавляем класс "active"
      link.classList.add('current-page');
    }
  }
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', addUnderlineToCurrentPage);
