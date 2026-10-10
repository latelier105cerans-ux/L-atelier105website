<script setup lang="ts">
// For the blocks meant to go inside a section (Grille, Carte, Bouton, FAQ…): inserted directly in
// the page, they get a section frame (background, spacing, container) instead of touching the
// edges. Exactly one element carries data-bloc either way (Studio editor <-> page sync):
// the section frame, or the block itself through the slot's `attrs`.
import { DANS_UNE_SECTION } from '~/utils/blocs';

defineProps<{ bloc: string }>();

const nested = inject(DANS_UNE_SECTION, false);
</script>

<template>
  <slot v-if="nested" :attrs="{ 'data-bloc': bloc }" />
  <BlocShell v-else :bloc="bloc" espacement="compact">
    <slot :attrs="{}" />
  </BlocShell>
</template>
