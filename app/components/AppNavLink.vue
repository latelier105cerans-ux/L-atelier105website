<template>
  <!-- Links to a section (/#lapa) or another site stay plain <a>: NuxtLink would mark every
       "/#..." link as active on the home page, and can't handle external URLs the same way -->
  <a
    v-if="isExternal"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
  <a v-else-if="href.includes('#')" :href="href">
    <slot />
  </a>
  <NuxtLink v-else :to="href" :active-class="activeClass">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string;
  activeClass?: string;
}>();

const isExternal = computed(() => /^https?:\/\//.test(props.href));
</script>
