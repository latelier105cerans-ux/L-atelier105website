<script setup lang="ts">
// Renders the owner's text with a tiny, safe subset of Markdown, typed with the formatting
// toolbar added to Studio (plugins/studio-highlight.client.ts):
//   **gras**   *italique*   ++plus grand++   --plus petit--
//   [texte du lien](https://… | /contact | /#lapa | mailto:… | tel:…)
// Everything else is plain text (no HTML is ever interpreted). Sizes are relative to the
// surrounding text, so they stay consistent on mobile. Line breaks are kept by the parent's
// `whitespace-pre-line`.
import { h, type VNode } from "vue";
import { NuxtLink } from "#components";

const props = defineProps<{ text?: string | null }>();

// Markers must hug the text ("++ a ++" stays as typed) to avoid catching "--" in a sentence
const TOKEN =
  /\*\*(\S(?:.*?\S)?)\*\*|\*(\S(?:.*?\S)?)\*|\+\+(\S(?:.*?\S)?)\+\+|--(\S(?:.*?\S)?)--|\[([^\]]+)\]\(([^)\s]+)\)/gs;
const SAFE_URL = /^(https?:\/\/|\/|#|mailto:|tel:)/i;
const LINK_CLASS = "underline underline-offset-2 font-medium hover:opacity-80";

const link = (href: string, children: (VNode | string)[]) => {
  if (href.startsWith("/") && !href.includes("#")) return h(NuxtLink, { to: href, class: LINK_CLASS }, () => children);
  if (/^https?:/i.test(href)) return h("a", { href, class: LINK_CLASS, target: "_blank", rel: "noopener noreferrer" }, children);
  return h("a", { href, class: LINK_CLASS }, children);
};

const render = (text: string): (VNode | string)[] => {
  const nodes: (VNode | string)[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const [whole, bold, italic, bigger, smaller, label, href] = match;
    if (match.index! > last) nodes.push(text.slice(last, match.index));
    if (bold) nodes.push(h("strong", { class: "font-semibold" }, render(bold)));
    else if (italic) nodes.push(h("em", render(italic)));
    else if (bigger) nodes.push(h("span", { class: "text-[1.25em] leading-snug" }, render(bigger)));
    else if (smaller) nodes.push(h("span", { class: "text-[0.85em]" }, render(smaller)));
    else if (label && href && SAFE_URL.test(href)) nodes.push(link(href, render(label)));
    else nodes.push(whole);
    last = match.index! + whole.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

const Rendered = () => render(props.text ?? "");
</script>

<template>
  <Rendered />
</template>
