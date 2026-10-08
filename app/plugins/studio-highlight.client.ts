// While editing in Nuxt Studio, outline and scroll to the part of the page that the focused
// form field controls. Studio is a <nuxt-studio> element (open shadow DOM) on the same page,
// and each form input is named after its schema path:
//   "#accueil/apa/description"          -> section "apa", field "description"
//   "#features/items/description"       -> item of the "features" list (index read from the open item)
// Page elements opt in with data-studio="section" / "section.field" (space-separated list), or
// data-studio-item="list" + data-studio-index="n" (or data-studio-list="list" for the whole list). Relies on Studio internals: if they change,
// this simply does nothing.

// Nested lists that highlight their parent item instead (a price is inside a pricing plan)
const PARENT_LIST: Record<string, string> = { prices: "pricing" };

// Last visible match: mobile/desktop variants are hidden with CSS, and when matches are
// nested (header > menu links) the inner, more precise one comes last in document order
const findVisible = (selector: string) =>
  Array.from(document.querySelectorAll<HTMLElement>(selector))
    .filter((el) => el.getClientRects().length > 0)
    .pop();

// Indexes of the open array items around the field, innermost first
const openItemIndexes = (path: EventTarget[]) =>
  path
    .filter((node): node is HTMLElement => node instanceof HTMLElement)
    .filter(
      (el) =>
        el.dataset.state === "open" &&
        el.className.includes("group/collapsible") &&
        Array.from(el.parentElement?.children ?? []).every((sibling) =>
          sibling.className.includes("group/collapsible")
        )
    )
    .map((el) => Array.from(el.parentElement!.children).indexOf(el));

const findTarget = (name: string, path: EventTarget[]) => {
  const segments = name.replace(/^#/, "").split("/");
  // From 1: the news list is itself called "items" ("#items/items/description")
  const itemsAt = segments.indexOf("items", 1);

  if (itemsAt > 0) {
    const list = segments[itemsAt - 1]!;
    const indexes = openItemIndexes(path);
    const parent = PARENT_LIST[list];
    const [key, index] = parent ? [parent, indexes[1]] : [list, indexes[0]];
    return (
      (index !== undefined &&
        findVisible(`[data-studio-item="${key}"][data-studio-index="${index}"]`)) ||
      // e.g. news: only the current slide is on screen, so outline the whole list
      findVisible(`[data-studio-list~="${key}"]`)
    );
  }

  const [, section, field] = segments;
  if (!section) return;
  return (
    (field && findVisible(`[data-studio~="${section}.${field}"]`)) ||
    findVisible(`[data-studio~="${section}"]`)
  );
};

export default defineNuxtPlugin(() => {
  let current: HTMLElement | undefined;
  let clearTimer: ReturnType<typeof setTimeout> | undefined;

  const clear = () => {
    current?.removeAttribute("data-studio-highlight");
    current = undefined;
  };

  document.addEventListener("focusin", (event) => {
    const path = event.composedPath();
    if (!path.some((node) => (node as Element).tagName === "NUXT-STUDIO")) return;

    const name = (path[0] as Element).getAttribute?.("name");
    if (!name?.startsWith("#")) return;

    const target = findTarget(name, path);
    if (!target) return;

    clearTimeout(clearTimer);
    if (target !== current) {
      clear();
      current = target;
      // An attribute, not a class: Vue rewrites `class` on elements with a :class binding
      target.setAttribute("data-studio-highlight", "");
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  document.addEventListener("focusout", (event) => {
    if (!event.composedPath().some((node) => (node as Element).tagName === "NUXT-STUDIO")) return;
    // Keep the outline when moving between fields of the same element
    clearTimeout(clearTimer);
    clearTimer = setTimeout(clear, 300);
  });
});
