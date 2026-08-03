(() => {
  const section = document.querySelector(".services");
  if (!section || !window.Swiper) return;

  const mql = window.matchMedia("(max-width: 991px)");
  let swiper = null;

  const getActivePane = () => Array.from(section.querySelectorAll(".service-pane")).find((p) => !p.hidden);

  const initSwiper = () => {
    const pane = getActivePane();
    if (!pane) return;
    const slider = pane.querySelector(".services__slider");
    if (!slider) return;
    swiper = new window.Swiper(slider, {
      slidesPerView: "auto",
      loop: false,
      navigation: {
        nextEl: ".services__arrow--next",
        prevEl: ".services__arrow--prev",
      },
    });
  };

  const sync = (isMobile) => {
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
    if (isMobile) initSwiper();
  };

  sync(mql.matches);
  mql.addEventListener("change", (e) => sync(e.matches));

  section.querySelector(".service-tabs")?.addEventListener("click", () => {
    if (!mql.matches) return;
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
    initSwiper();
  });
})();
