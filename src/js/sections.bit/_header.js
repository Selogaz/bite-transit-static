(() => {
  const header = document.querySelector(".header");

  if (header) {
    // Прячем шапку при скролле вниз и возвращаем при скролле вверх — только на мобильном/планшетном
    // брейкпоинте (≤991, совпадает с $has-burger); на десктопе поведение не трогаем.
    const hideMql = window.matchMedia("(max-width: 991px)");
    const HIDE_DELTA = 5;
    const isMenuOpen = () => document.body.classList.contains("_lock");

    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;

      const currentScrollY = window.scrollY;
      header.classList.toggle("header--scrolled", currentScrollY > 20);

      if (!hideMql.matches || isMenuOpen()) {
        header.classList.remove("header--hidden");
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= 0) {
        header.classList.remove("header--hidden");
      } else if (Math.abs(currentScrollY - lastScrollY) > HIDE_DELTA) {
        header.classList.toggle("header--hidden", currentScrollY > lastScrollY);
      }

      lastScrollY = currentScrollY;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    hideMql.addEventListener("change", update);
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
