(() => {
  const el = document.querySelector(".service-perks__slider");
  if (!el || !window.Swiper) return;

  if (el.closest(".service-perks--teu")) return;

  new window.Swiper(el, {
    slidesPerView: "auto",
    loop: false,
    navigation: {
      nextEl: ".service-perks__arrow--next",
      prevEl: ".service-perks__arrow--prev",
    },
  });
})();
