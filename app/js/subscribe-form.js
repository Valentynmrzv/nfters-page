document.querySelector('.footer-subscribe__submit-email').addEventListener('mousedown', (e) => {
  e.preventDefault();
  document.querySelector('.footer-subscribe__subscription').classList.add('done');
});