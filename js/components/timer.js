// Keeps reference to the countdown so we can stop it later
let intervalId = null;

/**
 * Formats and updates the time display (HH:MM:SS)
 * @param {HTMLElement} displayEl - The timer display HTMLElement
 * @param {Number} totalSeconds - The total number of seconds to display
 */
function updateDisplay(displayEl, totalSeconds) {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        '0'
    );
    const secs = String(totalSeconds % 60).padStart(2, '0');
    displayEl.textContent = `${hrs}:${mins}:${secs}`;
}

/**
 * Starts a countdown timer using input values (hours, minutes, seconds)
 */
export function startTimerFromInputs() {
    const h = parseInt(document.getElementById('hours')?.value) || 0;
    const m = parseInt(document.getElementById('minutes')?.value) || 0;
    const s = parseInt(document.getElementById('seconds')?.value) || 0;
    const total = h * 3600 + m * 60 + s;
  
    // Validate inputs
    if (h < 0 || m < 0 || s < 0 || h > 12 || m > 59 || s > 59) {
        alert(
            'Invalid timer input. Check hours, minutes, and seconds. Cannot exceed 12 hours total'
        );
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
    const progressCircle = document.querySelector('.timer-progress');
    if (!display || !progressCircle) {
        return;
    }

    clearInterval(intervalId); // Stop any previous timer

    let remaining = total;
    updateDisplay(display, remaining);
    progressCircle.style.strokeDashoffset = '0';

    // Start countdown
    intervalId = setInterval(() => {
        remaining--;

        if (remaining < 0) {
            clearInterval(intervalId);
            display.textContent = '00:00:00';
            progressCircle.style.strokeDashoffset = '282.6';
            alert('Time up!');
            return;
        }
        updateDisplay(display, remaining);

        const offset = 282.6 * (1 - remaining / total);
        progressCircle.style.strokeDashoffset = offset;
    }, 1000);

    // Clear input fields
    ['hours', 'minutes', 'seconds'].forEach((id) => {
        const input = document.getElementById(id);
        if (input) {
            input.value = '';
        }
    });
}

/**
 * Stops the timer and resets the display and progress circle
 */
export function clearTimer() {
    clearInterval(intervalId);
    intervalId = null;
    const display = document.querySelector('.timer-display');
    const progressCircle = document.querySelector('.timer-progress');

    if (display) {
        display.textContent = '00:00:00';
    }
    if (progressCircle) {
        progressCircle.style.strokeDashoffset = '282.6';
    }
}

/**
 * Updates the display and progress bar as the user types input
 */
export function updateTimerPreview() {
    const h = parseInt(document.getElementById('hours')?.value) || 0;
    const m = parseInt(document.getElementById('minutes')?.value) || 0;
    const s = parseInt(document.getElementById('seconds')?.value) || 0;

    const total = h * 3600 + m * 60 + s;

    const display = document.querySelector('.timer-display');
    if (display) {
        display.textContent = `${String(h).padStart(2, '0')}:${String(
            m
        ).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    const progressCircle = document.querySelector('.timer-progress');
    if (progressCircle) {
        const max = 43200;
        const offset = 282.6 * (1 - Math.min(total / max, 1));
        progressCircle.style.strokeDashoffset = offset;
    }
}
