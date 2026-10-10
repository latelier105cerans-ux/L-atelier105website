<!-- Block "Bienvenue": the top of a page. A big title (Titre 1), a text, buttons, and a photo -->
<script setup lang="ts">
import type { Fond } from '~/utils/blocs';

withDefaults(
  defineProps<{
    image?: string;
    /** @defaultValue beige */
    fond?: Fond;
    ancre?: string;
  }>(),
  { fond: 'beige' }
);
</script>

<template>
  <BlocShell bloc="bienvenue" :fond="fond" :ancre="ancre" espacement="hero" largeur="large">
    <div class="bg-gray-25 text-gray-900 rounded-3xl p-6 desktopview:p-12 flex flex-col desktopview:flex-row desktopview:items-center gap-10">
      <div class="flex-1 [&_p]:desktopview:text-lg">
        <slot />
      </div>
      <div v-if="image" class="flex-1 flex desktopview:justify-end">
        <img
          :src="image"
          alt=""
          class="w-full desktopview:max-w-[560px] h-auto aspect-video desktopview:aspect-auto desktopview:max-h-[640px] object-cover rounded-2xl"
        />
      </div>
    </div>
  </BlocShell>
</template>
