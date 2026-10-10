<!-- Block "Texte + image": a text next to a photo. On its own it is a section of the page;
     inside a Section it is one row (to list activities, alternate "cote" droite / gauche) -->
<script setup lang="ts">
import { DANS_UNE_SECTION, iconName, type Fond } from '~/utils/blocs';

// Inside a Section: one row among others, spaced from the previous one
const nested = inject(DANS_UNE_SECTION, false);

withDefaults(
  defineProps<{
    image?: string;
    /** @defaultValue droite */
    cote?: 'droite' | 'gauche';
    icon?: string;
    /** @defaultValue blanc */
    fond?: Fond;
    /** White rounded frame around the text and the photo
     * @defaultValue false */
    encadre?: boolean;
    ancre?: string;
  }>(),
  { cote: 'droite', fond: 'blanc', encadre: false }
);
</script>

<template>
  <BlocShell bloc="texte-image" :fond="fond" :ancre="ancre">
    <div
      class="text-left"
      :class="[
        nested ? 'mt-12 desktopview:mt-20' : '',
        encadre ? 'bg-gray-25 text-gray-900 rounded-2xl px-6 py-10 desktopview:px-12 desktopview:py-16' : '',
      ]"
    >
      <div class="grid gap-8 desktopview:grid-cols-2 desktopview:gap-12 items-center">
        <div
          :class="
            encadre
              ? '[&_h2]:text-3xl desktopview:[&_h2]:text-4xl'
              : '[&_h2]:text-3xl desktopview:[&_h2]:text-3xl [&_h2]:font-semibold'
          "
        >
          <div
            v-if="icon"
            class="rounded-full h-12 w-12 bg-primary-green-100 flex items-center justify-center mb-6"
          >
            <Icon :name="iconName(icon)" class="w-6 h-6 text-primary-green-400" />
          </div>
          <slot />
        </div>
        <img
          v-if="image"
          :src="image"
          alt=""
          class="w-full rounded-2xl object-cover aspect-video desktopview:aspect-auto desktopview:h-full self-stretch"
          :class="[
            cote === 'gauche' ? 'desktopview:order-first' : '',
            encadre ? 'desktopview:min-h-[800px]' : 'desktopview:min-h-[560px]',
          ]"
        />
      </div>
    </div>
  </BlocShell>
</template>
