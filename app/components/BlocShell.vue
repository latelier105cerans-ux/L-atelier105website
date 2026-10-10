<script setup lang="ts">
// Frame of the section-level blocks (Bienvenue, Section, TexteImage, Bandeau…). At the top of a
// page it is a full-width <section> with the background, spacing and container of the site.
// Inside another section (e.g. a TexteImage in a Section) it is a plain <div>: no second frame.
// Its root carries data-bloc: one per block, in page order, for the Studio editor ↔ page sync.
import { DANS_UNE_SECTION, ESPACEMENTS, FONDS, type Fond } from '~/utils/blocs';

const props = withDefaults(
  defineProps<{
    bloc: string;
    fond?: Fond;
    ancre?: string;
    espacement?: keyof typeof ESPACEMENTS;
    /** Inner width: the site's 6xl column, or the full container (hero) */
    largeur?: 'normale' | 'large';
  }>(),
  { fond: 'blanc', espacement: 'normal', largeur: 'normale' }
);

const nested = inject(DANS_UNE_SECTION, false);
provide(DANS_UNE_SECTION, true);

// "#lapa" or "lapa" both work for the menu links (/#lapa)
const id = computed(() => props.ancre?.replace(/^#/, '').trim() || undefined);
</script>

<template>
  <div v-if="nested" :id="id" :data-bloc="bloc" class="scroll-mt-24">
    <slot />
  </div>
  <section
    v-else
    :id="id"
    :data-bloc="bloc"
    class="scroll-mt-20"
    :class="[FONDS[fond] ?? FONDS.blanc, ESPACEMENTS[espacement]]"
  >
    <div class="container mx-auto px-4">
      <div :class="largeur === 'normale' ? 'max-w-6xl mx-auto' : ''">
        <slot />
      </div>
    </div>
  </section>
</template>
