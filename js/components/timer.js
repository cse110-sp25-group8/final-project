let intervalId = null;

// helper method for text to speech
function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
}

function updateDisplay(displayEl, totalSeconds) {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        '0'
    );
    const secs = String(totalSeconds % 60).padStart(2, '0');
    displayEl.textContent = `${hrs}:${mins}:${secs}`;
}

export function startTimerFromInputs() {
    const h = parseInt(document.getElementById('hours')?.value) || 0;
    const m = parseInt(document.getElementById('minutes')?.value) || 0;
    const s = parseInt(document.getElementById('seconds')?.value) || 0;
    const total = h * 3600 + m * 60 + s;

    if (h < 0 || m < 0 || s < 0 || h > 12 || m > 59 || s > 59) {
        speak(
            'Invalid timer input. Check hours, minutes, and seconds. Cannot exceed 12 hours total'
        );
        return;
    }

    if (total <= 0) {
        speak('Timer must be greater than 0');
        return;
    }

    if (total > 43200) {
        speak('Timer cannot exceed 12 hours');
        return;
    }

    const display = document.querySelector('.timer-display');
    const progressCircle = document.querySelector('.timer-progress');
    if (!display || !progressCircle) {
        return;
    }

    clearInterval(intervalId);

    let remaining = total;
    updateDisplay(display, remaining);
    progressCircle.style.strokeDashoffset = '0';

    intervalId = setInterval(() => {
        remaining--;

        if (remaining < 0) {
            clearInterval(intervalId);
            display.textContent = '00:00:00';
            progressCircle.style.strokeDashoffset = '282.6';
            speak('Time is up! Step is complete');
            return;
        }
        updateDisplay(display, remaining);

        const offset = 282.6 * (1 - remaining / total);
        progressCircle.style.strokeDashoffset = offset;
    }, 1000);

    ['hours', 'minutes', 'seconds'].forEach((id) => {
        const input = document.getElementById(id);
        if (input) {
            input.value = '';
        }
    });
}

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
