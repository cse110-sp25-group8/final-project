let intervalId = null;

function updateDisplay(displayEl, totalSeconds) {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  displayEl.textContent = `${hrs}:${mins}:${secs}`;
}

export function startTimerFromInputs() {
  const h = parseInt(document.getElementById('hours')?.value) || 0;
  const m = parseInt(document.getElementById('minutes')?.value) || 0;
  const s = parseInt(document.getElementById('seconds')?.value) || 0;
  const total = h * 3600 + m * 60 + s;

  if (h < 0 || m < 0 || s < 0 || h > 12 || m > 59 || s > 59) {
	alert('Invalid timer input. Check hours, minutes, and seconds. Cannot exceed 12 hours total');
    return;
  }

  if (total <= 0) {
	alert('Timer must be greater than 0');
    return;
  }

  if (total > 43200) {
    alert('Timer cannot exceed 12 hours');
    return;
  }

  const display = document.querySelector('.timer-display');
  if (!display) {
    return;
  }

  clearInterval(intervalId);
  updateDisplay(display, total);

  let remaining = total;

  intervalId = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(intervalId);
      display.textContent = '00:00:00';
      alert('Time up!');
      return;
    }
    updateDisplay(display, remaining);
  }, 1000);
}

export function clearTimer() {
  clearInterval(intervalId);
  intervalId = null;
  const display = document.querySelector('.timer-display');
  if (display) {
    display.textContent = '00:00:00';
  }
}