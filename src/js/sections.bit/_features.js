(() => {
  const section = document.querySelector(".features");
  if (!section || !window.Swiper) return;

  const el = section.querySelector(".features__slider");
  if (!el) return;

  const mql = window.matchMedia("(max-width: 1439px)");
  let swiper = null;

  const sync = (isMobile) => {
    if (isMobile && !swiper) {
      swiper = new window.Swiper(el, {
        slidesPerView: "auto",
        loop: false,
        navigation: {
          nextEl: ".features__arrow--next",
          prevEl: ".features__arrow--prev",
        },
      });
    } else if (!isMobile && swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
  };

  sync(mql.matches);
  mql.addEventListener("change", (e) => sync(e.matches));
})();
