<script setup lang="ts">
// A page built from blocks in Studio (content/pages/*.md). Hidden pages ("Masquer la page")
// are a 404 for visitors, but stay visible, with a notice, when logged in to Studio.
const props = defineProps<{ path: string }>();

const { data: page } = await useAsyncData(`page:${props.path}`, () =>
  queryCollection('pages').path(props.path).first()
);

// Set by Studio when its editor session is open (readable on the server and in the browser)
const studioSession = useCookie('studio-session-check');
const hidden = computed(() => page.value?.masquer === true);

if (!page.value || (hidden.value && String(studioSession.value) !== 'true')) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable', fatal: true });
}

useSeoMeta({
  title: () => page.value?.seo?.title || page.value?.title,
  description: () => page.value?.seo?.description || page.value?.description,
  ogTitle: () => page.value?.seo?.title || page.value?.title,
  ogDescription: () => page.value?.seo?.description || page.value?.description,
  ogType: 'website',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <div v-if="page">
    <p
      v-if="hidden"
      class="bg-secondary-earth-100 text-secondary-earth-900 text-center text-sm font-semibold py-2 px-4"
    >
      Page masquée : les visiteurs ne la voient pas (désactivez « Masquer la page » dans ses paramètres).
    </p>
    <!-- data-content-root: its children are the page's top-level blocks (Studio editor ↔ page sync) -->
    <ContentRenderer :value="page" data-content-root />
  </div>
</template>
