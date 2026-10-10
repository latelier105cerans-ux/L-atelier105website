<!-- Block "Question" (in a FAQ): its first line (Titre 3) is the question, the text below is the
     answer, shown when the visitor clicks the question -->
<script setup lang="ts">
import { Comment, Fragment, Text, type VNode } from 'vue';

const slots = useSlots();

const flatten = (nodes: VNode[]): VNode[] =>
  nodes.flatMap((node) => (node.type === Fragment ? flatten(node.children as VNode[]) : [node]));
const parts = () => {
  const nodes = flatten(slots.default?.() ?? []).filter(
    (node) => node.type !== Comment && !(node.type === Text && !String(node.children).trim())
  );
  return { question: nodes.slice(0, 1), answer: nodes.slice(1) };
};
const Question = () => parts().question;
const Answer = () => parts().answer;
</script>

<template>
  <AutoSection bloc="question" v-slot="{ attrs }">
    <details v-bind="attrs" class="group py-5">
      <summary
        class="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden [&_h3]:mb-0 [&_p]:mb-0 [&_*]:font-semibold [&_*]:text-lg desktopview:[&_*]:text-xl"
      >
        <span><Question /></span>
        <Icon name="lucide:chevron-down" class="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div class="pt-3 [&_p]:text-base desktopview:[&_p]:text-base">
        <Answer />
      </div>
    </details>
  </AutoSection>
</template>
