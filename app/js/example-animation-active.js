function handleIntersection(entries, observer) {
  const isAnyElementVisible = entries.some((entry) => entry.isIntersecting);

  if (isAnyElementVisible) {
    items.forEach((item) => {
      item.classList.add('active');
    });
  } else {
    items.forEach((item) => {
      item.classList.remove('active');
    });
  }
}

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: '100px',
  threshold: 0.5,
});

const items = document.querySelectorAll('.example__item');

items.forEach((item) => {
  observer.observe(item);
});
