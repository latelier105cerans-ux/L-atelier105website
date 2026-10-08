// Owner-friendly Nuxt Studio. Studio is a <nuxt-studio> element (open shadow DOM) added to the
// page when someone is logged in to the editor. This plugin:
//   1. outlines and scrolls to the element of the page controlled by the focused form field,
//      with the field name in a badge above it;
//   2. shows the French labels and help texts of content.config.ts in the form (Studio 1.7.0
//      ignores editor.label / editor.description and shows the raw keys: "Description 3");
//   3. grows text areas with their content instead of cutting the text.
// It relies on Studio internals (input names, DOM structure): if they change, it simply does
// nothing and Studio keeps working as before. Visitors are not affected (no <nuxt-studio>).
//
// Each form field is mapped to its schema path, e.g. "#accueil/moi/description_3" or
// "#accueil/apa/features/items/description" (the index of the item is read from the open item
// in Studio's form). Top-level inputs are named after their path; inputs inside a list item are
// only named "description", so the path is rebuilt from the form structure (section titles,
// list labels).
// Page elements opt in with markers:
//   data-studio="section ..."                          a section (space-separated keys)
//   data-studio-item="list" + data-studio-index="n"    an item of a list
//   data-studio-list="list"                            a whole list (fallback)
//   data-studio-field="field ..."                      a text/image inside a section or item

// ---------------------------------------------------------------------------------------------
// Styles (app/assets/css/main.css is not loaded by @nuxtjs/tailwindcss, so they live here)

const PAGE_CSS = `
[data-studio-highlight] {
  outline: 3px dashed #e8833a !important;
  outline-offset: 4px;
}
.studio-highlight-badge {
  position: fixed;
  z-index: 2147483000;
  pointer-events: none;
  padding: 2px 10px;
  border-radius: 9999px;
  background: #e8833a;
  color: #fff;
  font: 600 13px/22px Inter, system-ui, sans-serif;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
}`;

const STUDIO_CSS = `
.studio-help { margin: 2px 0 0; font-size: 11px; line-height: 1.35; color: #78716c; }
textarea[name] { resize: vertical; overflow: hidden; }`;

// ---------------------------------------------------------------------------------------------
// Schema access (French labels) – the collections are exposed by Studio's host

type SchemaNode = {
  type?: string;
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  $content?: { editor?: { label?: string; description?: string } };
};

let schemas: Record<string, SchemaNode> = {};

const loadSchemas = async () => {
  const host = (window as any).useStudioHost?.();
  const list = await host?.collection?.list?.();
  if (!Array.isArray(list)) return;
  schemas = Object.fromEntries(
    list.map((c: any) => [c.name, c.schema?.definitions?.[c.name]]).filter(([, s]: any) => s)
  );
};

// "#features/items/description" has no collection: find the "features" list in the schemas
const findList = (node: SchemaNode | undefined, key: string): SchemaNode | undefined => {
  for (const [k, child] of Object.entries(node?.properties ?? {})) {
    if (k === key && child.type === "array") return child;
    const found = findList(child.type === "array" ? child.items : child, key);
    if (found) return found;
  }
};

const resolve = (name: string): SchemaNode | undefined => {
  const [first, ...rest] = name.replace(/^#/, "").split("/");
  let node: SchemaNode | undefined = schemas[first!];
  if (!node) {
    for (const schema of Object.values(schemas)) node ??= findList(schema, first!);
    if (!node) return;
    rest.shift(); // "items"
    node = node.items;
  }
  for (const key of rest) {
    // "items" is a list's items, except for a field really called "items" (the news list)
    node = node?.type === "array" && key === "items" ? node.items : node?.properties?.[key];
    if (!node) return;
  }
  return node;
};

const editorOf = (node?: SchemaNode) => node?.$content?.editor;

// ---------------------------------------------------------------------------------------------
// French labels in Studio's form

// Studio's default label is the key reformatted ("Description 3", "Autres_activites")
const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

const COLLAPSIBLE = '[data-slot="root"][class*="group/collapsible"]';
const TITLE = ":scope > div > div > span";
const LABEL = ':scope > [data-slot="wrapper"] label[data-slot="label"]';
const fieldRootOf = (label: Element) => label.closest('[data-slot="wrapper"]')?.parentElement;
const containerOf = (el: Element) => el.parentElement?.closest(COLLAPSIBLE) ?? null;
const originalText = (el: HTMLElement | null | undefined) =>
  el?.dataset.studioKey ?? el?.textContent?.trim() ?? "";
const isListItem = (container: Element) =>
  /^\d+:/.test(container.querySelector(TITLE)?.textContent?.trim() ?? "");

const childKey = (path: string, text: string) =>
  Object.keys(resolve(path)?.properties ?? {}).find((k) => normalize(k) === normalize(text));

// "#accueil" for the open file: top-level inputs are named "#<collection>/…"
const rootPath = (from: Element) =>
  (from.getRootNode() as ParentNode).querySelector('[name^="#"]')?.getAttribute("name")?.split("/")[0];

// Schema path of a section / list item, e.g. "#accueil/moi" or "#accueil/apa/features/items"
const containerPath = (container: Element): string | undefined => {
  if (isListItem(container)) {
    // The list is the form field (with a label) around its items
    let field = container.parentElement;
    while (field && !field.querySelector(LABEL)) field = field.parentElement;
    if (!field) return;
    const parent = containerOf(field);
    const parentPath = parent ? containerPath(parent) : rootPath(container);
    const key = parentPath && childKey(parentPath, originalText(field.querySelector<HTMLElement>(LABEL)));
    return key ? `${parentPath}/${key}/items` : undefined;
  }
  const parent = containerOf(container);
  const parentPath = parent ? containerPath(parent) : rootPath(container);
  const key = parentPath && childKey(parentPath, originalText(container.querySelector<HTMLElement>(TITLE)));
  return key ? `${parentPath}/${key}` : undefined;
};

// Schema path of a form input. Date fields (segments), selects and switches have no name:
// use the label of their form field instead
const fieldPath = (input: Element) => {
  const name = input.getAttribute("name");
  if (name?.startsWith("#")) return name;
  const container = containerOf(input);
  const path = container ? containerPath(container) : rootPath(input);
  if (!path) return;
  if (name) return `${path}/${name}`;
  let field = input.parentElement;
  while (field && !field.querySelector(LABEL)) field = field.parentElement;
  if (!field || containerOf(field) !== container) return;
  const key = childKey(path, originalText(field.querySelector<HTMLElement>(LABEL)));
  return key ? `${path}/${key}` : undefined;
};

const relabel = (el: HTMLElement, node: SchemaNode | undefined, helpAfter?: Element | null) => {
  const editor = editorOf(node);
  if (!editor?.label) return;
  el.dataset.studioKey ??= el.textContent?.trim() ?? "";
  if (el.textContent !== editor.label) el.textContent = editor.label;
  if (editor.description && helpAfter && !helpAfter.nextElementSibling?.classList.contains("studio-help")) {
    const help = document.createElement("p");
    help.className = "studio-help";
    help.textContent = editor.description;
    helpAfter.after(help);
  }
};

const translateForm = (root: ShadowRoot) => {
  // Section titles first: field paths are rebuilt from their original text
  for (const container of root.querySelectorAll(COLLAPSIBLE)) {
    const title = container.querySelector<HTMLElement>(TITLE);
    if (!title || isListItem(container)) continue;
    const path = containerPath(container);
    if (path) relabel(title, resolve(path));
  }
  // "Ajouter items" (Studio adds the raw key) -> "Ajouter"
  for (const button of root.querySelectorAll("button")) {
    for (const node of button.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && /^Ajouter \S/.test(node.textContent ?? "")) node.textContent = "Ajouter";
    }
  }
  // Field labels (inputs, switches, selects, lists)
  for (const label of root.querySelectorAll<HTMLElement>('label[data-slot="label"]')) {
    const fieldRoot = fieldRootOf(label);
    if (!fieldRoot) continue;
    const container = containerOf(fieldRoot);
    const path = container ? containerPath(container) : rootPath(label);
    const key = path && childKey(path, originalText(label));
    relabel(label, key ? resolve(`${path}/${key}`) : undefined, label.closest('[data-slot="labelWrapper"]'));
  }
};

// Text areas grow with their content
const autosize = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight + 2}px`;
};

// ---------------------------------------------------------------------------------------------
// Highlight of the edited element in the page

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

// Indexes of the open list items around the field, innermost first. Studio's sections are
// collapsibles too, so only count the ones whose title is a list summary ("2: Bien-être…")
const openItemIndexes = (path: EventTarget[]) =>
  path
    .filter((node): node is HTMLElement => node instanceof HTMLElement)
    .filter((el) => el.matches(COLLAPSIBLE) && el.dataset.state === "open" && isListItem(el))
    .map((el) =>
      Array.from(el.parentElement!.children).filter((c) => c.matches(COLLAPSIBLE)).indexOf(el)
    );

const findTarget = (name: string, path: EventTarget[]) => {
  const segments = name.replace(/^#/, "").split("/");
  // Innermost list: "#tarifs/apa/pricing/items/prices/items/amount" -> "prices"
  // ("#accueil/news/items/items/description": the news list is itself called "items")
  const itemsAt = segments.lastIndexOf("items");

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

// ---------------------------------------------------------------------------------------------

const addStyle = (parent: Node, css: string) => {
  const style = document.createElement("style");
  style.textContent = css;
  parent.appendChild(style);
};

export default defineNuxtPlugin(() => {
  let current: HTMLElement | undefined;
  let clearTimer: ReturnType<typeof setTimeout> | undefined;
  let frame = 0;

  addStyle(document.head, PAGE_CSS);
  const badge = document.createElement("div");
  badge.className = "studio-highlight-badge";

  // Fixed position, recomputed every frame: follows scrolling, the sticky header and layout
  // changes while typing
  const placeBadge = () => {
    if (!current) return;
    const rect = current.getBoundingClientRect();
    const above = rect.top > 32;
    badge.style.top = `${above ? rect.top - 30 : rect.top + 6}px`;
    // Right-aligned: texts start on the left, so the badge hides less of the line above
    badge.style.left = `${Math.max(rect.right - badge.offsetWidth, 8)}px`;
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
    if (input instanceof HTMLTextAreaElement) autosize(input);
    const name = input instanceof Element ? fieldPath(input) : undefined;
    if (!name) return;

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
    const label = editorOf(resolve(name))?.label ?? name.split("/").pop();
    badge.textContent = `✏️ ${label}`;
    if (!badge.isConnected) document.body.appendChild(badge);
    cancelAnimationFrame(frame);
    placeBadge();
  });

  document.addEventListener("focusout", (event) => {
    if (!isInStudio(event.composedPath())) return;
    // Keep the outline when moving between fields of the same element
    clearTimeout(clearTimer);
    clearTimer = setTimeout(clear, 300);
  });

  document.addEventListener("input", (event) => {
    const target = event.composedPath()[0];
    if (target instanceof HTMLTextAreaElement && isInStudio(event.composedPath())) autosize(target);
  });

  // Studio's form: French labels and text area sizes, re-applied when it re-renders
  const enhance = async (root: ShadowRoot) => {
    addStyle(root, STUDIO_CSS);
    await loadSchemas();
    let scheduled = false;
    const run = () => {
      scheduled = false;
      translateForm(root);
      root.querySelectorAll<HTMLTextAreaElement>("textarea[name]").forEach(autosize);
    };
    new MutationObserver(() => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(run);
      }
    }).observe(root, { childList: true, subtree: true });
    run();
  };

  // Studio appends <nuxt-studio> to the body once the editor session is checked
  const watchStudio = (retries = 20): boolean => {
    const studio = document.querySelector("nuxt-studio");
    if (studio?.shadowRoot) {
      enhance(studio.shadowRoot);
      return true;
    }
    if (studio && retries > 0) setTimeout(() => watchStudio(retries - 1), 250);
    return Boolean(studio);
  };
  if (!watchStudio()) {
    const observer = new MutationObserver(() => {
      if (watchStudio()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true });
  }
});
