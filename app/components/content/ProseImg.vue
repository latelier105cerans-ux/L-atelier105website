<template>
  <img :src="src" :alt="alt || ''" :width="width" :height="height" class="rounded-2xl w-full h-auto my-4" loading="lazy" />
</template>

<script setup lang="ts">
defineProps<{ src?: string; alt?: string; width?: string | number; height?: string | number }>();
</script>
