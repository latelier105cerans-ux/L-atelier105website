<!-- Block "Bandeau": a coloured band to highlight a message, with buttons (style "clair" on green) -->
<script setup lang="ts">
import type { Fond } from '~/utils/blocs';

withDefaults(defineProps<{ /** @defaultValue vert */ fond?: Fond; ancre?: string }>(), { fond: 'vert' });
</script>

<template>
  <BlocShell bloc="bandeau" :fond="fond" :ancre="ancre" espacement="compact">
    <div class="text-center max-w-3xl mx-auto">
      <slot />
    </div>
  </BlocShell>
</template>
