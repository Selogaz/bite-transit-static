// Модалка кейса с подгрузкой тела по id. Оболочка #case-detail одна на весь сайт (tpls/footer.html),
// карточки несут data-case-more + data-case-id, адрес запроса приходит в data-case-endpoint.
// Пустой адрес = режим вёрстки: открывается статичная демо-заглушка, сеть не трогаем.
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

  // b_modal автооткрывает попап, если хэш совпал с id (openb_modalHash), а хэш он же и пишет при
  // каждом открытии — после перезагрузки в динамическом режиме показывать нечего, гасим оболочку.
  // Закрытие отложено намеренно: класс `_show` движок вешает собственным setTimeout, синхронный
  // closePop() его ещё не видит и попап всплывает уже после нас.
  if (endpoint && window.location.hash === `#${id}` && window.b_modal) {
    setTimeout(() => window.b_modal.closePop(id));
  }

  // Высоту попапа b_modal замеряет один раз через 600 мс после открытия, а контент приезжает
  // позже — пересчитываем прокрутку сами, иначе длинный кейс не проскроллить.
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

  // Ответ ждём фрагментом без обёртки, но прислать могут и модалку целиком — тогда снимаем
  // внешний слой, иначе в документе окажется второй #case-detail и модалка внутри модалки.
  // Разбор идёт в <template>: его содержимое инертно, картинки фрагмента не грузятся дважды.
  const unwrap = (html) => {
    const holder = document.createElement("template");
    holder.innerHTML = html;

    const nodes = [...holder.content.childNodes].filter((node) => (
      node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
    ));

    const root = nodes.length === 1 && nodes[0].nodeType === Node.ELEMENT_NODE ? nodes[0] : null;
    const wrapper = root && (root.classList.contains("modal-case") || root.classList.contains("b_modal"));

    return wrapper ? root.innerHTML.trim() : html;
  };

  const render = (html) => {
    body.innerHTML = html;
    setState("ready");
    // Точка расширения: если в теле кейса приедет карусель или форма, их инициализация
    // вешается на это событие — контент к моменту вызова уже в DOM.
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

  // Capture: сработать раньше обработчиков на самих кнопках и поймать карточки,
  // добавленные в DOM после инициализации b_modal.
  document.addEventListener("click", (event) => {
    const retry = event.target.closest("[data-case-retry]");
    if (retry && modal.contains(retry)) {
      if (currentId) load(currentId);
      return;
    }

    const trigger = event.target.closest("[data-case-more]");
    if (!trigger) return;

    window.b_modal?.openPop(id);
    if (!endpoint) return;

    currentId = trigger.dataset.caseId || "";
    if (currentId) {
      load(currentId);
    } else {
      setState("error");
    }
  }, true);
})();
