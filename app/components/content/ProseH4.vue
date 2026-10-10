<!-- "Titre 4" is the small coloured label above a title (sur-titre) -->
<template>
  <h4 :id="id" class="text-sm font-semibold text-secondary-earth-500 mb-2">
    <slot />
  </h4>
</template>

<script setup lang="ts">
defineProps<{ id?: string }>();
</script>
