<template>
  <NuxtLink
    :to="href"
    :target="target || (isExternal(href) ? '_blank' : undefined)"
    class="font-semibold underline underline-offset-2 decoration-from-font hover:opacity-75 transition-opacity"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { isExternal } from '~/utils/blocs';

defineProps<{ href?: string; target?: string }>();
</script>
