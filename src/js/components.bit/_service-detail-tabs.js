(() => {
  const roots = document.querySelectorAll(".service-detail");
  if (!roots.length) return;

  const OPEN = "service-detail__tabs--open";
  const ACTIVE = "service-detail__tab-link--active";
  const collapse = window.matchMedia("(max-width: 991px)");

  roots.forEach((root) => {
    const tabs = root.querySelector(".service-detail__tabs");
    const links = root.querySelectorAll(".service-detail__tab-link");
    const panes = root.querySelectorAll(".service-detail__pane");
    if (!tabs || links.length === 0 || links.length !== panes.length) return;

    links.forEach((link, index) => {
      link.addEventListener("click", () => {
        if (collapse.matches && !tabs.classList.contains(OPEN)) {
          tabs.classList.add(OPEN);
          return;
        }

        links.forEach((other) => other.classList.toggle(ACTIVE, other === link));
        panes.forEach((pane, i) => {
          pane.hidden = i !== index;
        });
        tabs.classList.remove(OPEN);
      });
    });
  });

  document.addEventListener("click", (event) => {
    roots.forEach((root) => {
      const tabs = root.querySelector(".service-detail__tabs");
      if (tabs && !tabs.contains(event.target)) tabs.classList.remove(OPEN);
    });
  });
})();
