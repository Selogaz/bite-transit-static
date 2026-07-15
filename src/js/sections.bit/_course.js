(() => {
  const timers = Array.from(document.querySelectorAll("[data-timer]"));
  if (!timers.length) return;

  const STORAGE_KEY = "bit_course_timer_deadline";
  const DURATION_MS = 15 * 60 * 1000;
  const pad = (value) => String(value).padStart(2, "0");

  const persistDeadline = (deadline) => {
    localStorage.setItem(STORAGE_KEY, deadline);
    const iso = new Date(deadline).toISOString();
    timers.forEach((timer) => timer.setAttribute("data-timer-deadline", iso));
    return deadline;
  };

  const storedDeadline = Number(localStorage.getItem(STORAGE_KEY));
  let deadline = persistDeadline(storedDeadline > Date.now() ? storedDeadline : Date.now() + DURATION_MS);

  const tick = () => {
    let remaining = deadline - Date.now();
    if (remaining <= 0) {
      deadline = persistDeadline(Date.now() + DURATION_MS);
      remaining = deadline - Date.now();
    }

    const totalSeconds = Math.ceil(remaining / 1000);
    const minutes = pad(Math.floor(totalSeconds / 60));
    const seconds = pad(totalSeconds % 60);

    timers.forEach((timer) => {
      const minutesEl = timer.querySelector("[data-timer-minutes]");
      const secondsEl = timer.querySelector("[data-timer-seconds]");
      if (minutesEl) minutesEl.textContent = minutes;
      if (secondsEl) secondsEl.textContent = seconds;
    });
  };

  tick();
  setInterval(tick, 1000);
})();
