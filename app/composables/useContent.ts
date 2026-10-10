// Site content lives in /content/*.yml (editable by the owner via Nuxt Studio at /_studio):
// content.navigation / content.footer (menu-et-pied-de-page.yml), content.pages.tarifs,
// content.pages.contact and content.actualites (news, shared by the home page block and contact).
// Pages built from blocks (content/pages/*.md) are loaded by components/ContentPage.vue.
export const useContent = async () => {
  const { data } = await useAsyncData(
    'site-content',
    async () => {
      const [site, actualites, tarifs, contact] = await Promise.all([
        queryCollection('site').first(),
        queryCollection('actualites').first(),
        queryCollection('tarifs').first(),
        queryCollection('contact').first(),
      ]);
      if (!site || !actualites || !tarifs || !contact) {
        throw createError({ statusCode: 500, statusMessage: 'Contenu du site introuvable' });
      }
      return { ...site, actualites: actualites.news, pages: { tarifs, contact } };
    },
    // Header, footer and page all call this at once: share the pending request
    // instead of cancelling it (Nuxt's default), which would leave earlier callers empty.
    { dedupe: 'defer' },
  );

  return computed(() => data.value!);
};
