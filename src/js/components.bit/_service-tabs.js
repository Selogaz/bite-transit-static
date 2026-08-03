(() => {
  const lists = document.querySelectorAll(".service-tabs");
  if (!lists.length) return;

  const OPEN = "service-tabs--open";
  const ACTIVE = "service-tabs__link--active";
  const collapse = window.matchMedia("(max-width: 991px)");

  lists.forEach((list) => {
    const links = list.querySelectorAll(".service-tabs__link");
    const panes = list.closest("section")?.querySelectorAll(".service-pane") || [];
    const hasPanes = links.length > 0 && links.length === panes.length;

    links.forEach((link, index) => {
      link.addEventListener("click", () => {
        if (collapse.matches && !list.classList.contains(OPEN)) {
          list.classList.add(OPEN);
          return;
        }

        links.forEach((other) => other.classList.toggle(ACTIVE, other === link));
        if (hasPanes) panes.forEach((pane, i) => {
          pane.hidden = i !== index;
        });
        list.classList.remove(OPEN);
      });
    });
  });

  document.addEventListener("click", (event) => {
    lists.forEach((list) => {
      if (!list.contains(event.target)) list.classList.remove(OPEN);
    });
  });
})();
