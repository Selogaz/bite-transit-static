(() => {
  const triggers = document.querySelectorAll("[data-b_modal-open][data-form-name]");
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const id = trigger.dataset.b_modalOpen;
      const popup = document.getElementById(id);
      if (!popup) return;

      const formName = popup.querySelector('input[name="form_name"]');
      if (formName) formName.value = trigger.dataset.formName;
    });
  });
})();
