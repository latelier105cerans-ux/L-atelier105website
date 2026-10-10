<!-- Block "Témoignage": a quote from a client, with her name and photo. Place several in a Grille -->
<script setup lang="ts">
withDefaults(defineProps<{ photo?: string; nom?: string; precision?: string }>(), {});
</script>

<template>
  <AutoSection bloc="temoignage" v-slot="{ attrs }">
    <figure v-bind="attrs" class="flex flex-col h-full bg-gray-25 text-gray-900 rounded-2xl p-6 desktopview:p-8 shadow-sm text-left">
      <Icon name="lucide:quote" class="w-8 h-8 text-secondary-earth-300 mb-4 shrink-0" />
      <blockquote class="flex-1 italic [&_p]:text-base desktopview:[&_p]:text-lg">
        <slot />
      </blockquote>
      <figcaption v-if="nom || photo" class="flex items-center gap-3 mt-6">
        <img v-if="photo" :src="photo" alt="" class="w-12 h-12 rounded-full object-cover" />
        <div>
          <div v-if="nom" class="font-semibold">{{ nom }}</div>
          <div v-if="precision" class="text-sm text-gray-600">{{ precision }}</div>
        </div>
      </figcaption>
    </figure>
  </AutoSection>
</template>
