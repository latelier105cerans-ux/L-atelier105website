<!-- Block "FAQ": a list of questions that open on click. Insert "Question" blocks inside -->
<template>
  <AutoSection bloc="faq" v-slot="{ attrs }">
    <div
      v-bind="attrs"
      class="mt-10 first:mt-0 max-w-3xl mx-auto text-left border-y border-gray-200 divide-y divide-gray-200"
    >
      <slot />
    </div>
  </AutoSection>
</template>
