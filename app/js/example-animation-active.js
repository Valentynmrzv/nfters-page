// Функция, которая будет вызываться при входе или выходе элементов в область видимости
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    const target = entry.target;

    if (entry.isIntersecting) {
      // Если элемент входит в область видимости, добавляем ему класс "active"
      target.classList.add('active');
    } else {
      // Если элемент выходит из области видимости, убираем у него класс "active"
      target.classList.remove('active');
    }
  });
}

// Создаем новый экземпляр IntersectionObserver
const observer = new IntersectionObserver(handleIntersection, {
  root: null, // Используем viewport как корневой элемент
  rootMargin: '0px', // Нет отступов
  threshold: 0.5, // Порог входа - 0.5 (половина элемента должна быть видима)
});

// Получаем все элементы с классом "example__item"
const items = document.querySelectorAll('.example__item');

// Начинаем наблюдение за каждым элементом
items.forEach((item) => {
  observer.observe(item);
});
