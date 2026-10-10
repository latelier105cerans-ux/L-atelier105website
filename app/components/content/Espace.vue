<!-- Block "Espace": an empty space between two blocks, with an optional line -->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{ /** @defaultValue moyen */ taille?: 'petit' | 'moyen' | 'grand'; /** @defaultValue false */ ligne?: boolean }>(),
  { taille: 'moyen', ligne: false }
);

const TAILLES = { petit: 'py-4', moyen: 'py-10', grand: 'py-20' } as const;
</script>

<template>
  <div data-bloc="espace" :class="TAILLES[props.taille] ?? TAILLES.moyen" aria-hidden="true">
    <div v-if="ligne" class="container mx-auto px-4">
      <hr class="border-gray-200" />
    </div>
  </div>
</template>
