// Получите чекбокс и элемент <body>
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Обработчик события для переключения темы
themeToggle.addEventListener("change", () => {
  // Если чекбокс отмечен, то включите темную тему
  if (themeToggle.checked) {
    body.classList.add("dark-theme");
  } else {
    // В противном случае, выключите темную тему
    body.classList.remove("dark-theme");
  }
});

// При загрузке страницы проверьте, какая тема была выбрана
window.addEventListener("load", () => {
  // Проверьте состояние чекбокса и установите соответствующую тему
  if (themeToggle.checked) {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }
});
