(() => {
  const section = document.querySelector(".team");
  if (!section || !window.Swiper) return;

  const el = section.querySelector(".team__slider");
  if (!el) return;

  const mql = window.matchMedia("(max-width: 991px)");
  let swiper = null;

  const sync = (isMobile) => {
    if (isMobile && !swiper) {
      swiper = new window.Swiper(el, {
        slidesPerView: "auto",
        loop: false,
        navigation: {
          nextEl: ".team__arrow--next",
          prevEl: ".team__arrow--prev",
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
