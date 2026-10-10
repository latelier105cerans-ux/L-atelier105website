<!-- Block "Section" (named SectionPage: <section> is an HTML tag, which Markdown would render
     as is): a band of the page with a background. Write a title and a text, then insert
     other blocks inside (Grille, Points clés, Texte + image, FAQ, Bouton…) -->
<script setup lang="ts">
import type { Fond } from '~/utils/blocs';

withDefaults(
  defineProps<{
    /** @defaultValue blanc */
    fond?: Fond;
    /** @defaultValue centre */
    alignement?: 'centre' | 'gauche';
    /** Name used by the menu links: "lapa" for /#lapa */
    ancre?: string;
  }>(),
  { fond: 'blanc', alignement: 'centre' }
);
</script>

<template>
  <BlocShell bloc="section-page" :fond="fond" :ancre="ancre">
    <!-- The introduction under the title is larger and a bit lighter (its own paragraphs only,
         not those of the blocks inside) -->
    <div
      class="desktopview:[&>p]:text-xl [&>p]:opacity-80"
      :class="alignement === 'centre' ? 'text-center' : ''"
    >
      <slot />
    </div>
  </BlocShell>
</template>
