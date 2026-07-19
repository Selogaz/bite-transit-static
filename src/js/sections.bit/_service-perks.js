(() => {
  const el = document.querySelector(".service-perks__slider");
  if (!el || !window.Swiper) return;

  if (el.closest(".service-perks--teu")) {
    const mql = window.matchMedia("(max-width: 991px)");
    let swiper = null;

    const sync = (isMobile) => {
      if (isMobile && !swiper) {
        swiper = new window.Swiper(el, {
          slidesPerView: "auto",
          loop: false,
        });
      } else if (!isMobile && swiper) {
        swiper.destroy(true, true);
        swiper = null;
      }
    };

    sync(mql.matches);
    mql.addEventListener("change", (e) => sync(e.matches));
    return;
  }

  new window.Swiper(el, {
    slidesPerView: "auto",
    loop: false,
    navigation: {
      nextEl: ".service-perks__arrow--next",
      prevEl: ".service-perks__arrow--prev",
    },
  });
})();
