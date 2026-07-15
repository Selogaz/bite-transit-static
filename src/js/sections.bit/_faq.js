(() => {
  const section = document.querySelector(".faq");
  if (!section) return;

  const tabsList = section.querySelector(".faq__tabs");
  if (!tabsList) return;

  const tabs = section.querySelectorAll(".faq__tab");
  const panels = section.querySelectorAll(".faq__panel");

  const OPEN = "faq__tabs--open";
  const collapse = window.matchMedia("(max-width: 991px)");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (collapse.matches && !tabsList.classList.contains(OPEN)) {
        tabsList.classList.add(OPEN);
        return;
      }

      const target = tab.dataset.faqTab;

      tabs.forEach((other) => {
        other.classList.toggle("faq__tab--active", other === tab);
      });

      panels.forEach((panel) => {
        panel.classList.toggle("faq__panel--active", panel.dataset.faqPanel === target);
      });

      tabsList.classList.remove(OPEN);
    });
  });

  document.addEventListener("click", (event) => {
    if (!tabsList.contains(event.target)) tabsList.classList.remove(OPEN);
  });
})();
