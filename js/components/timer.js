let intervalId = null;

function updateDisplay(displayEl, totalSeconds) {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  displayEl.textContent = `${hrs}:${mins}:${secs}`;
}

export function startTimerFromInputs() {
  const h = parseInt(document.getElementById("hours")?.value) || 0;
  const m = parseInt(document.getElementById("minutes")?.value) || 0;
  const s = parseInt(document.getElementById("seconds")?.value) || 0;
  const total = h * 3600 + m * 60 + s;

  if (total <= 0) return;

  if (total >= 43200) {
    alert("Timer cannot exceed 12 hours (11:59:59).");
    return;
  }

  const display = document.querySelector(".timer-display");
  if (!display) return;

  clearInterval(intervalId);
  updateDisplay(display, total);

  let remaining = total;

  intervalId = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(intervalId);
      display.textContent = "00:00:00";
      alert("Time's up!");
      return;
    }
    updateDisplay(display, remaining);
  }, 1000);
}

export function clearTimer() {
  clearInterval(intervalId);
  intervalId = null;
  const display = document.querySelector(".timer-display");
  if (display) {
    display.textContent = "00:00:00";
  }
}