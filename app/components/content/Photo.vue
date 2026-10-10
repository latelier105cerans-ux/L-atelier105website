<!-- Block "Photo": a picture with an optional caption. Several in a Grille make a gallery -->
<script setup lang="ts">
defineProps<{ image?: string }>();
</script>

<template>
  <AutoSection bloc="photo" v-slot="{ attrs }">
    <figure v-bind="attrs" class="text-left">
      <img v-if="image" :src="image" alt="" class="w-full rounded-2xl object-cover aspect-[4/3]" loading="lazy" />
      <figcaption class="mt-2 text-sm text-gray-600 [&_p]:text-sm desktopview:[&_p]:text-sm [&_p]:mb-0">
        <slot />
      </figcaption>
    </figure>
  </AutoSection>
</template>
