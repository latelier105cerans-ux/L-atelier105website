<!-- Block "Actualités": the news carousel. The news themselves are edited once, in the
     "actualites" file, and shown everywhere this block is used (and on the contact page) -->
<script setup lang="ts">
const content = await useContent();
</script>

<template>
  <div data-bloc="actualites">
    <NewsCarousel
      :title="content.actualites.title"
      :subtitle="content.actualites.subtitle"
      :items="content.actualites.items"
    />
  </div>
</template>
