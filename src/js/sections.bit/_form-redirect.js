(() => {
  const FALLBACK = "thanks.html";

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

    window.location.assign(payload.redirect || form.dataset.thanks || FALLBACK);
  });
})();
