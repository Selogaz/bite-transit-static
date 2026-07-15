(() => {
  const el = document.querySelector(".customs-benefits__slider");
  if (!el || !window.Swiper) return;

  new window.Swiper(el, {
    slidesPerView: "auto",
    loop: false,
    navigation: {
      nextEl: ".customs-benefits__arrow--next",
      prevEl: ".customs-benefits__arrow--prev",
    },
  });
})();
