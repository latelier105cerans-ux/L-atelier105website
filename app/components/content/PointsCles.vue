<!-- Block "Points clés": the blocks inside it (Carte…) are shared between two columns around a
     photo on a computer (first half on the left, second half on the right), stacked on mobile -->
<script setup lang="ts">
import { Comment, Fragment, Text, h, type VNode } from 'vue';

const props = defineProps<{ image?: string }>();
const slots = useSlots();

const flatten = (nodes: VNode[]): VNode[] =>
  nodes.flatMap((node) => (node.type === Fragment ? flatten(node.children as VNode[]) : [node]));

// Rendered once (no mobile/desktop copies): the editor ↔ page sync counts the blocks in order
const Layout = () => {
  const items = flatten(slots.default?.() ?? []).filter(
    (node) => node.type !== Comment && !(node.type === Text && !String(node.children).trim())
  );
  const half = Math.ceil(items.length / 2);
  const column = 'flex flex-col gap-10 desktopview:gap-12';
  return [
    h('div', { class: `${column} order-1 desktopview:order-none` }, items.slice(0, half)),
    props.image
      ? h('img', {
          src: props.image,
          alt: '',
          class:
            'w-full rounded-2xl object-cover aspect-video desktopview:aspect-auto desktopview:h-full self-stretch order-3 desktopview:order-none',
        })
      : null,
    h('div', { class: `${column} order-2 desktopview:order-none` }, items.slice(half)),
  ];
};
</script>

<template>
  <AutoSection bloc="points-cles" v-slot="{ attrs }">
    <div
      v-bind="attrs"
      class="grid gap-10 desktopview:grid-cols-3 desktopview:gap-16 items-start mt-10 first:mt-0 text-left"
    >
      <Layout />
    </div>
  </AutoSection>
</template>
