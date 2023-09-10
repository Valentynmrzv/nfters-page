function updateTimer(targetId) {
  const now = new Date();
  const targetTime = new Date(now);
  targetTime.setHours(24);
  targetTime.setMinutes(0);
  targetTime.setSeconds(0);

  const timeDiff = targetTime - now;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  const hoursElement = document.getElementById(targetId + '_hours');
  const minutesElement = document.getElementById(targetId + '_minutes');
  const secondsElement = document.getElementById(targetId + '_seconds');

  hoursElement.textContent = String(hours).padStart(2, '0') + 'h';
  minutesElement.textContent = String(minutes).padStart(2, '0') + 'm';
  secondsElement.textContent = String(seconds).padStart(2, '0') + 's';
}

// Викликаємо функції оновлення для кожного таймера окремо
setInterval(() => updateTimer('timer1'), 1000);
setInterval(() => updateTimer('timer2'), 1000);
setInterval(() => updateTimer('timer3'), 1000);

// Викликаємо функції оновлення таймерів вперше, щоб відобразити вірний час
updateTimer('timer1');
updateTimer('timer2');
updateTimer('timer3');



const divs = document.querySelectorAll('.live__grid');

divs.forEach((div, index) => {
  div.addEventListener('click', () => {
    // Визначаємо індекс натиснутого div
    const clickedIndex = Array.from(divs).indexOf(div);

    // Переміщуємо всі div один одним місцями
    divs.forEach((otherDiv, otherIndex) => {
      if (otherIndex === clickedIndex) {
        otherDiv.style.transform = 'translateX(0)';
        otherDiv.style.zIndex = 3;
      } else {
        const difference = otherIndex - clickedIndex;
        const translateValue = difference * 60; // Змініть це значення, щоб відповідати вашим потребам
        otherDiv.style.transform = `translateX(${translateValue}px)`;
        otherDiv.style.zIndex = 2 - Math.abs(difference);
      }
    });
  });
});







