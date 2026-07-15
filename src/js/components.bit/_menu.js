(() => {
  const OPEN = "menu__item--open";
  const items = Array.from(document.querySelectorAll(".menu__item--has-sub"));
  if (!items.length) return;

  const toggles = items
    .map((item) => ({ item, link: item.querySelector(".menu__link--has-sub") }))
    .filter((t) => t.link);

  const setOpen = (t, open) => {
    t.item.classList.toggle(OPEN, open);
    t.link.setAttribute("aria-expanded", String(open));
  };

  const closeAll = (except) => {
    toggles.forEach((t) => {
      if (t !== except) setOpen(t, false);
    });
  };

  toggles.forEach((t) => {
    t.link.addEventListener("click", (e) => {
      e.preventDefault();
      const willOpen = !t.item.classList.contains(OPEN);
      closeAll(t);
      setOpen(t, willOpen);
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".menu__item--has-sub")) return;
    closeAll();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
})();
