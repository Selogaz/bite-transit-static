(() => {
  const lists = document.querySelectorAll(".service-tabs");
  if (!lists.length) return;

  const OPEN = "service-tabs--open";
  const ACTIVE = "service-tabs__link--active";
  const collapse = window.matchMedia("(max-width: 991px)");

  lists.forEach((list) => {
    const links = list.querySelectorAll(".service-tabs__link");
    const panes = list.closest("section")?.querySelectorAll(".service-pane") || [];

    links.forEach((link, index) => {
      link.addEventListener("click", () => {
        if (collapse.matches && !list.classList.contains(OPEN)) {
          list.classList.add(OPEN);
          return;
        }

        // Вкладка знает свою панель по слагу; порядок — запасной вариант, если слага нет.
        const target = link.dataset.serviceTab;

        links.forEach((other) => other.classList.toggle(ACTIVE, other === link));
        panes.forEach((pane, i) => {
          pane.hidden = target ? pane.dataset.servicePane !== target : i !== index;
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
