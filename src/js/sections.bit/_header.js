(() => {
  const header = document.querySelector(".header");

  if (header) {
    const onScroll = () => {
      header.classList.toggle("header--scrolled", window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const timer = document.querySelector(".topbar__timer[data-timer]");
  const minutesEl = timer && timer.querySelector("[data-timer-minutes]");
  const secondsEl = timer && timer.querySelector("[data-timer-seconds]");

  if (timer && minutesEl && secondsEl) {
    const STORAGE_KEY = "bit_topbar_timer_deadline";
    const DURATION_MS = (9 * 60 + 34) * 1000;
    const pad = (value) => String(value).padStart(2, "0");

    const persistDeadline = (deadline) => {
      localStorage.setItem(STORAGE_KEY, deadline);
      timer.setAttribute("data-timer-deadline", new Date(deadline).toISOString());
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
      minutesEl.textContent = pad(Math.floor(totalSeconds / 60));
      secondsEl.textContent = pad(totalSeconds % 60);
    };

    tick();
    setInterval(tick, 1000);
  }
})();
