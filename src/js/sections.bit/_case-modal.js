(() => {
  const modal = document.querySelector(".modal-case");
  if (!modal) return;

  const body = modal.querySelector(".modal-case__body");
  if (!body) return;

  const id = modal.id;
  const endpoint = modal.dataset.caseEndpoint || "";
  const LOADING = "modal-case--loading";
  const ERROR = "modal-case--error";

  const cache = new Map();
  let controller = null;
  let currentId = null;

  if (endpoint && window.location.hash === `#${id}` && window.b_modal) {
    setTimeout(() => window.b_modal.closePop(id));
  }

  const syncScrollable = () => {
    const overlay = modal.closest(".b_modal__overlay");
    if (overlay) {
      overlay.classList.toggle("b_modal--scrollable", modal.getBoundingClientRect().height > window.innerHeight);
    }

    const aligner = modal.closest(".b_modal__aligner");
    if (aligner) aligner.scrollTop = 0;
  };

  const setState = (state) => {
    modal.classList.toggle(LOADING, state === "loading");
    modal.classList.toggle(ERROR, state === "error");
    modal.setAttribute("aria-busy", state === "loading" ? "true" : "false");
    syncScrollable();
  };

  const unwrap = (html) => {
    const holder = document.createElement("template");
    holder.innerHTML = html;

    const nodes = [...holder.content.childNodes].filter((node) => (
      node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
    ));

    const root = nodes.length === 1 && nodes[0].nodeType === Node.ELEMENT_NODE ? nodes[0] : null;
    const wrapper = root && (root.classList.contains("modal-case") || root.classList.contains("b_modal"));
    if (!wrapper) return html;

    const inner = root.querySelector(".modal-case__body");

    return (inner && inner.innerHTML.trim() ? inner.innerHTML : root.innerHTML).trim();
  };

  const render = (html) => {
    body.innerHTML = html;
    setState("ready");
    modal.dispatchEvent(new CustomEvent("case-modal:content", {
      bubbles: true,
      detail: { id: currentId },
    }));
  };

  const load = async (caseId) => {
    if (cache.has(caseId)) {
      render(cache.get(caseId));
      return;
    }

    if (controller) controller.abort();
    controller = new AbortController();

    setState("loading");

    try {
      const url = new URL(endpoint, window.location.href);
      url.searchParams.set("action", "case");
      url.searchParams.set("id", caseId);

      const response = await fetch(url, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Case request failed: ${response.status}`);

      const html = unwrap((await response.text()).trim());
      if (!html) throw new Error("Case request returned an empty body");

      cache.set(caseId, html);
      if (currentId === caseId) render(html);
    } catch (error) {
      if (error.name === "AbortError") return;
      setState("error");
    }
  };

  document.addEventListener("click", (event) => {
    const retry = event.target.closest("[data-case-retry]");
    if (retry && modal.contains(retry)) {
      if (currentId) load(currentId);
      return;
    }

    const trigger = event.target.closest("[data-case-more]");
    if (!trigger) return;

    window.b_modal?.openPop(id);

    currentId = trigger.dataset.caseId || "";
    if (endpoint && currentId) {
      load(currentId);
    } else {
      setState("error");
    }
  }, true);
})();
