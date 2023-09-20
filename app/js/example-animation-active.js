function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    const target = entry.target;

    if (entry.isIntersecting) {
      target.classList.add('active');
    } else {
      target.classList.remove('active');
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: '80px',
  threshold: 0.5,
});

const items = document.querySelectorAll('.example__item');

items.forEach((item) => {
  observer.observe(item);
});
