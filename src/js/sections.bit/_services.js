(() => {
  const el = document.querySelector(".services__slider");
  if (!el || !window.Swiper) return;

  const mql = window.matchMedia("(max-width: 991px)");
  let swiper = null;

  const sync = (isMobile) => {
    if (isMobile && !swiper) {
      swiper = new window.Swiper(el, {
        slidesPerView: "auto",
        loop: false,
        navigation: {
          nextEl: ".services__arrow--next",
          prevEl: ".services__arrow--prev",
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
