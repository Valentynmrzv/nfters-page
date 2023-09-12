const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__input');

searchForm.addEventListener('click', () => {
  searchForm.classList.add('active');
  searchInput.focus();
});

document.addEventListener('click', (event) => {
  if (!searchForm.contains(event.target)) {
    searchForm.classList.remove('active');
  }
});

searchForm.addEventListener('click', (event) => {
  event.stopPropagation();
});

searchInput.addEventListener('blur', () => {
  searchForm.classList.remove('active');
});


