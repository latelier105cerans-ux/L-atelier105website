<!-- Block "Carte": an icon, a title (Titre 3) and a text. Place several in a Grille -->
<script setup lang="ts">
import { FONDS_CARTE, iconName, type FondCarte } from '~/utils/blocs';

withDefaults(defineProps<{ icon?: string; /** @defaultValue aucun */ fond?: FondCarte }>(), { fond: 'aucun' });
</script>

<template>
  <AutoSection bloc="carte" v-slot="{ attrs }">
    <div
      v-bind="attrs"
      class="flex flex-col text-left [&_h3]:text-xl desktopview:[&_h3]:text-xl [&_p]:text-base desktopview:[&_p]:text-base [&_li]:text-base desktopview:[&_li]:text-base"
      :class="FONDS_CARTE[fond] ?? ''"
    >
      <div
        v-if="icon"
        class="rounded-full h-12 w-12 bg-primary-green-100 flex items-center justify-center mb-4 shrink-0"
      >
        <Icon :name="iconName(icon)" class="w-6 h-6 text-primary-green-400" />
      </div>
      <slot />
    </div>
  </AutoSection>
</template>
