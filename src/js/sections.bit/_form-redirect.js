(() => {
  // Первое совпадение сверху вниз; селекторы идут от частного к общему —
  // карточки услуг, курса и футера тоже несут класс `audit__card`.
  const ROUTES = [
    [".quiz__card", "thanks-audit"],
    [".audit-b__form-card", "thanks-audit"],
    [".footer__tour-card", "thanks-tour"],
    [".course-cta__form-card", "thanks-course"],
  ];
  const FALLBACK = "thanks";

  function resolveSlug(form) {
    const route = ROUTES.find(([selector]) => form.matches(selector));
    return route ? route[1] : FALLBACK;
  }

  // В вёрстке страницы лежат файлами, в CMS — папками с адресом вида `/thanks/`.
  function resolveUrl(slug) {
    return window.location.pathname.endsWith(".html") ? `${slug}.html` : `/${slug}/`;
  }

  document.addEventListener("submit-success", (event) => {
    const { form, result } = event.detail;
    if (!form) return;

    // Успехом считаем только явный ответ обработчика: formich не смотрит на статус
    // ответа, поэтому до этого события долетают и 404, и 500.
    let payload;
    try {
      payload = JSON.parse(result);
    } catch (error) {
      return;
    }

    if (!payload || payload.success !== true) return;

    window.location.assign(payload.redirect || resolveUrl(resolveSlug(form)));
  });
})();
