(() => {
  const el = document.querySelector(".videos__slider");
  if (!el || !window.Swiper) return;

  const mql = window.matchMedia("(max-width: 991px)");
  const navigation = {
    nextEl: ".videos__arrow--next",
    prevEl: ".videos__arrow--prev",
  };

  const columnGap = () => (parseFloat(getComputedStyle(document.documentElement).fontSize) || 10) * 2.1;

  let swiper = null;

  const build = (isMobile) => new window.Swiper(el, isMobile
    ? {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: { rows: 2, fill: "row" },
      spaceBetween: columnGap(),
      loop: false,
      navigation,
    }
    : {
      slidesPerView: "auto",
      loop: false,
      navigation,
    });

  const sync = (isMobile) => {
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
    swiper = build(isMobile);
  };

  sync(mql.matches);
  mql.addEventListener("change", (e) => sync(e.matches));
})();
