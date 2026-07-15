(() => {
  const el = document.querySelector(".benefits__slider");
  if (!el || !window.Swiper) return;

  new window.Swiper(el, {
    slidesPerView: "auto",
    loop: false,
    navigation: {
      nextEl: ".benefits__arrow--next",
      prevEl: ".benefits__arrow--prev",
    },
  });
})();
