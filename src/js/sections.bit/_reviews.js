(() => {
  const reviewsSlider = document.querySelector(".reviews__slider");
  if (!reviewsSlider || !window.Swiper) return;

  new window.Swiper(reviewsSlider, {
    loop: true,
    slidesPerView: "auto",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".reviews__pagination",
      clickable: true,
      bulletClass: "reviews__dot",
      bulletActiveClass: "is-active",
    },
    navigation: {
      nextEl: ".reviews__button--next",
      prevEl: ".reviews__button--prev",
    },
  });
})();
