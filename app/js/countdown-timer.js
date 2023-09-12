function updateTimer(targetId, targetTime) {
  const now = new Date();
  const timeDiff = targetTime - now;

  if (timeDiff <= 0) {
    return;
  }

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

const targetTime1 = new Date();
targetTime1.setHours(24, 0, 0, 0); // 00:00:00 (12:00 AM)

const targetTime2 = new Date();
targetTime2.setHours(22, 30, 0, 0); // 22:30:00 (10:30 PM)

const targetTime3 = new Date();
targetTime3.setHours(21, 0, 0, 0); // 21:00:00 (9:00 PM)

setInterval(() => updateTimer('timer1', targetTime1), 1000);
setInterval(() => updateTimer('timer2', targetTime2), 1000);
setInterval(() => updateTimer('timer3', targetTime3), 1000);

updateTimer('timer1', targetTime1);
updateTimer('timer2', targetTime2);
updateTimer('timer3', targetTime3);
