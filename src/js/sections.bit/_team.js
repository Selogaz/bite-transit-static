(() => {
  const section = document.querySelector(".team");
  if (!section || !window.Swiper) return;

  const el = section.querySelector(".team__slider");
  if (!el) return;

  // 9 карточек не помещаются в ряд ни на одном брейкпоинте — свайпер держим
  // активным всегда (паттерн `_reviews.js`), без mobile-only переключения.
  new window.Swiper(el, {
    slidesPerView: "auto",
    loop: false,
    navigation: {
      nextEl: ".team__arrow--next",
      prevEl: ".team__arrow--prev",
    },
  });
})();
