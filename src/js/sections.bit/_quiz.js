(() => {
  const section = document.querySelector(".quiz");
  if (!section || !window.Swiper) return;

  const sliderEl = section.querySelector(".quiz__slider");
  const dots = [...section.querySelectorAll(".quiz__dot")];
  if (!sliderEl) return;

  const steps = [...sliderEl.querySelectorAll(".quiz__step")];

  const swiper = new window.Swiper(sliderEl, {
    slidesPerView: 1,
    spaceBetween: 40,
    allowTouchMove: false,
    speed: 350,
  });

  const hasOptions = (index) => !!(steps[index] && steps[index].querySelector(".quiz-option__input"));

  const isAnswered = (index) => {
    const step = steps[index];
    return !!(step && step.querySelector(".quiz-option__input:checked"));
  };

  const setInvalid = (index, invalid) => {
    const options = steps[index] && steps[index].querySelector(".quiz__options");
    if (options) options.classList.toggle("is-invalid--highlighted", invalid);
  };

  const renderProgress = () => {
    const active = swiper.activeIndex;
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === active);
      dot.classList.toggle("is-done", i < active);
    });
  };

  sliderEl.addEventListener("change", (e) => {
    if (!e.target.matches(".quiz-option__input")) return;
    setInvalid(swiper.activeIndex, false);
  });

  sliderEl.addEventListener("click", (e) => {
    if (e.target.closest(".quiz__back")) {
      swiper.slidePrev();
      return;
    }

    if (e.target.closest(".quiz__submit")) {
      const index = swiper.activeIndex;

      if (hasOptions(index) && !isAnswered(index)) {
        setInvalid(index, true);
        return;
      }

      swiper.slideNext();
    }
  });

  swiper.on("slideChange", renderProgress);
  renderProgress();
})();
