// While editing in Nuxt Studio, outline and scroll to the part of the page that the focused
// form field controls. Studio is a <nuxt-studio> element (open shadow DOM) on the same page,
// and each form input is named after its schema path:
//   "#accueil/moi/description_3"   -> section "moi", field "description_3"
//   "#features/items/description"  -> "description" of an item of the "features" list
//                                     (index read from the open item in Studio's form)
// Page elements opt in with markers:
//   data-studio="section ..."                          a section (space-separated keys)
//   data-studio-item="list" + data-studio-index="n"    an item of a list
//   data-studio-list="list"                            a whole list (fallback)
//   data-studio-field="field ..."                      a text/image inside a section or item
// The most precise visible element wins. Relies on Studio internals: if they change, this
// simply does nothing.

// Nested lists that highlight their parent item instead (a price is inside a pricing plan)
const PARENT_LIST: Record<string, string> = { prices: "pricing" };

// Mobile/desktop variants are hidden with CSS: only keep what is on screen
const visible = (selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.getClientRects().length > 0
  );

const SCOPE = "[data-studio], [data-studio-item]";

// The field inside one of the scopes (section or item); fields of nested scopes don't count,
// e.g. an activity's "description" is not the section's "description". Falls back to the scope.
const fieldIn = (scopes: HTMLElement[], field?: string) => {
  // Inner scopes come last in document order (header > menu links): try them first
  for (const scope of [...scopes].reverse()) {
    const match = field
      ? visible(`[data-studio-field~="${field}"]`, scope).find(
          (el) => el.parentElement?.closest(SCOPE) === scope
        )
      : undefined;
    if (match) return match;
  }
  return scopes.at(-1);
};

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
    const [key, index, field] = parent
      ? [parent, indexes[1], undefined]
      : [list, indexes[0], segments[itemsAt + 1]];
    const items =
      index === undefined
        ? []
        : visible(`[data-studio-item="${key}"][data-studio-index="${index}"]`);
    // e.g. news: only the current slide is on screen, so outline the whole list
    return items.length ? fieldIn(items, field) : visible(`[data-studio-list~="${key}"]`).pop();
  }

  const [, section, field] = segments;
  if (!section) return;
  const scopes = visible(`[data-studio~="${section}"]`);
  return scopes.length ? fieldIn(scopes, field) : undefined;
};

// Label of the focused field in Studio's form ("Paragraphe 3"), shown on the page next to the outline
const fieldLabel = (input: Element) => {
  if (!input.id) return;
  const root = input.getRootNode() as ParentNode;
  return root
    .querySelector(`label[for="${CSS.escape(input.id)}"]`)
    ?.textContent?.trim();
};

export default defineNuxtPlugin(() => {
  let current: HTMLElement | undefined;
  let clearTimer: ReturnType<typeof setTimeout> | undefined;
  let frame = 0;

  const badge = document.createElement("div");
  badge.className = "studio-highlight-badge";

  // Fixed position, recomputed every frame: follows scrolling, the sticky header and layout
  // changes while typing
  const placeBadge = () => {
    if (!current) return;
    const rect = current.getBoundingClientRect();
    const above = rect.top > 32;
    badge.style.top = `${above ? rect.top - 30 : rect.top + 6}px`;
    badge.style.left = `${Math.max(rect.left, 8)}px`;
    frame = requestAnimationFrame(placeBadge);
  };

  const clear = () => {
    current?.removeAttribute("data-studio-highlight");
    current = undefined;
    cancelAnimationFrame(frame);
    badge.remove();
  };

  const isInStudio = (path: EventTarget[]) =>
    path.some((node) => (node as Element).tagName === "NUXT-STUDIO");

  document.addEventListener("focusin", (event) => {
    const path = event.composedPath();
    if (!isInStudio(path)) return;

    const input = path[0] as Element;
    const name = input.getAttribute?.("name");
    if (!name?.startsWith("#")) return;

    const target = findTarget(name, path);
    if (!target) return;

    clearTimeout(clearTimer);
    const label = fieldLabel(input);
    if (target !== current) {
      clear();
      current = target;
      // An attribute, not a class: Vue rewrites `class` on elements with a :class binding
      target.setAttribute("data-studio-highlight", "");
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (label) {
      badge.textContent = `✏️ ${label}`;
      if (!badge.isConnected) document.body.appendChild(badge);
      cancelAnimationFrame(frame);
      placeBadge();
    } else {
      badge.remove();
    }
  });

  document.addEventListener("focusout", (event) => {
    if (!isInStudio(event.composedPath())) return;
    // Keep the outline when moving between fields of the same element
    clearTimeout(clearTimer);
    clearTimer = setTimeout(clear, 300);
  });
});
