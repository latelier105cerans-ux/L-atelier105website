<template>
  <h3
    :id="id"
    class="font-semibold text-xl desktopview:text-2xl leading-snug mb-2 [&_em]:font-roustel [&_em]:font-normal [&_em]:not-italic"
  >
    <slot />
  </h3>
</template>

<script setup lang="ts">
defineProps<{ id?: string }>();
</script>
