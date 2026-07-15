(() => {
  const fields = document.querySelectorAll('[data-mask="phone"]');
  if (!fields.length || typeof window.Inputmask === "undefined") return;

  fields.forEach((field) => {
    window.Inputmask({
      mask: "+7 (999) 999 99 99",
      showMaskOnHover: false,
      clearIncomplete: false,
    }).mask(field);
  });
})();
