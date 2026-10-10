<template>
  <h2
    :id="id"
    class="font-bold text-3xl desktopview:text-5xl leading-tight mb-4 [&_em]:block [&_em]:font-roustel [&_em]:font-normal [&_em]:not-italic [&_em]:mt-2"
  >
    <slot />
  </h2>
</template>

<script setup lang="ts">
defineProps<{ id?: string }>();
</script>
