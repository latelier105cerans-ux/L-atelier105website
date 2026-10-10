<!-- Block "Grille": puts the blocks inside it (Carte, Témoignage, Photo…) side by side -->
<script setup lang="ts">
const props = withDefaults(defineProps<{ /** @defaultValue 3 */ colonnes?: '1' | '2' | '3' | '4' }>(), { colonnes: '3' });

const COLONNES = {
  '1': '',
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 desktopview:grid-cols-3',
  '4': 'grid-cols-2 desktopview:grid-cols-4',
} as const;
</script>

<template>
  <AutoSection bloc="grille" v-slot="{ attrs }">
    <div
      v-bind="attrs"
      class="grid gap-6 desktopview:gap-8 mt-10 first:mt-0 text-left"
      :class="COLONNES[props.colonnes] ?? COLONNES['3']"
    >
      <slot />
    </div>
  </AutoSection>
</template>
