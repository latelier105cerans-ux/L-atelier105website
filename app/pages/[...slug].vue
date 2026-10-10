<!-- Any other page built from blocks in Studio: content/pages/stages.md is /stages.
     The pages with their own file here (tarifs, contact) take precedence. -->
<script setup lang="ts">
const route = useRoute();
const path = computed(() => {
  const slug = route.params.slug;
  return `/${(Array.isArray(slug) ? slug : [slug]).filter(Boolean).join('/')}`.replace(/\/$/, '') || '/';
});
</script>

<template>
  <ContentPage :key="path" :path="path" />
</template>
