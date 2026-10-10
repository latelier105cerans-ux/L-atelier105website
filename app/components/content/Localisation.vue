<!-- Block "Localisation": a text (address, opening hours…) next to a Google map of the address -->
<script setup lang="ts">
import type { Fond } from '~/utils/blocs';

const props = withDefaults(
  defineProps<{ adresse?: string; /** @defaultValue blanc */ fond?: Fond; ancre?: string }>(),
  { fond: 'blanc' }
);

const map = computed(() =>
  props.adresse
    ? `https://maps.google.com/maps?q=${encodeURIComponent(props.adresse)}&z=15&output=embed`
    : undefined
);
</script>

<template>
  <BlocShell bloc="localisation" :fond="fond" :ancre="ancre">
    <div class="grid gap-8 desktopview:grid-cols-2 desktopview:gap-12 items-center text-left">
      <div>
        <slot />
      </div>
      <iframe
        v-if="map"
        :src="map"
        title="Plan d'accès"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="w-full h-80 desktopview:h-96 rounded-2xl border-0"
      />
    </div>
  </BlocShell>
</template>
