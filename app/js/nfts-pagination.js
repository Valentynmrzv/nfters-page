document.addEventListener("DOMContentLoaded", () => {
  // Определите переменные для работы с страницами
  let currentPage = 1; // Текущая страница
  const itemsPerPage = 8; // Количество элементов на странице (измените по вашему усмотрению)
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Общее количество страниц (замените totalItems на общее количество ваших элементов)

  // Функция для отображения элементов на текущей странице
  function showPage(page) {
    const items = document.querySelectorAll(".nfts__wrapper .item"); // Замените ".item" на селектор, который соответствует вашим элементам
    items.forEach((item, index) => {
      if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Функция для создания числовых ссылок на страницы
  function createPageNumbers() {
    const pageNumbersContainer = document.getElementById("pageNumbers");
    pageNumbersContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageNumber = document.createElement("span");
      pageNumber.innerText = i;
      pageNumber.className = i === currentPage ? "active" : "";
      pageNumber.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
        updatePageNumbers();
      });
      pageNumbersContainer.appendChild(pageNumber);
    }
  }

  // Функция для обновления стилей активной страницы
  function updatePageNumbers() {
    const pageNumbers = document.querySelectorAll(".page-numbers span");
    pageNumbers.forEach((pageNumber, index) => {
      pageNumber.className = index + 1 === currentPage ? "active" : "";
    });
  }

  // Инициализируйте отображение первой страницы и числовых ссылок при загрузке страницы
  showPage(currentPage);
  createPageNumbers();

  // Обработчик клика для кнопки "Следующая страница"
  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
      updatePageNumbers();
    }
  });

  // Обработчик клика для кнопки "Предыдущая страница"
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
      updatePageNumbers();
    }
  });
});
