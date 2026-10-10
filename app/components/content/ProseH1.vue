<!-- Text written in the page blocks (Studio's visual editor). In titles, italic text is shown in
     the site's handwritten font on its own line, e.g. "Bonjour, moi c'est *Lou-Anne*" -->
<template>
  <h1
    :id="id"
    class="font-semibold text-4xl desktopview:text-6xl leading-tight mb-6 [&_em]:block [&_em]:font-roustel [&_em]:font-normal [&_em]:not-italic [&_em]:mt-2"
  >
    <slot />
  </h1>
</template>

<script setup lang="ts">
defineProps<{ id?: string }>();
</script>
