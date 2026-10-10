<!-- Block "Bouton": write its text; set the link and the look in its settings.
     Several buttons in a row stay side by side -->
<script setup lang="ts">
import { isExternal } from '~/utils/blocs';

const props = withDefaults(
  defineProps<{
    /** /contact, /tarifs, /#lapa or https://… */
    lien?: string;
    /** @defaultValue plein */
    apparence?: 'plein' | 'contour' | 'clair' | 'lien';
  }>(),
  { lien: '/contact', apparence: 'plein' }
);

const APPARENCES = {
  plein: 'h-11 px-6 rounded-full bg-primary-green-400 text-gray-25 hover:bg-primary-green-300',
  contour: 'h-11 px-6 rounded-full border-2 border-primary-green-400 text-primary-green-600 hover:bg-primary-green-50',
  clair: 'h-11 px-6 rounded-full bg-gray-25 text-primary-green-600 hover:bg-gray-100',
  lien: 'text-primary-green-400 hover:underline',
} as const;
</script>

<template>
  <AutoSection bloc="bouton" v-slot="{ attrs }">
    <NuxtLink
      v-bind="attrs"
      :to="props.lien || '/'"
      :target="isExternal(props.lien) ? '_blank' : undefined"
      class="inline-flex items-center justify-center gap-2 font-semibold transition-colors mt-4 mr-3 align-middle [&_p]:mb-0 [&_p]:text-[length:inherit]"
      :class="APPARENCES[props.apparence] ?? APPARENCES.plein"
    >
      <slot mdc-unwrap="p" />
      <Icon v-if="props.apparence === 'lien'" name="lucide:arrow-right" class="w-5 h-5" />
    </NuxtLink>
  </AutoSection>
</template>
