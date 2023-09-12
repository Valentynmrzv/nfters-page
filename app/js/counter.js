function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 250;

  counters.forEach(counter => {
    const target = +counter.innerText.replace('K+', '');
    const increment = target / speed;

    let currentValue = 1;

    const updateCounter = () => {
      if (currentValue < target) {
        counter.innerText = currentValue.toFixed(0) + 'K+';
        currentValue += increment;
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target + 'K+';
      }
    };

    updateCounter();
  });
}

const exploreList = document.querySelector('.explore__list');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(exploreList);
    }
  });
});

observer.observe(exploreList);

// ======================================
const title = document.querySelector('.hero-advantage__title');

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 0.5
};

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      title.style.opacity = '1';
      title.style.transform = 'translateX(0)';
    } else {
      title.style.opacity = '0';
      title.style.transform = 'translateX(-30%)';
      // Восстанавливаем скроллинг при скрытии заголовка
      document.body.style.overflowX = 'auto';
    }
  });
}, options);

intersectionObserver.observe(title);

