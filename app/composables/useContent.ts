// Site content lives in /content/*.yml (editable by the owner via Nuxt Studio at /_studio).
// Keeps the same shape as the former app/content/fr.ts: content.site, content.footer, content.pages.accueil...
export const useContent = async () => {
  const { data } = await useAsyncData(
    'site-content',
    async () => {
      const [site, accueil, tarifs, contact] = await Promise.all([
        queryCollection('site').first(),
        queryCollection('accueil').first(),
        queryCollection('tarifs').first(),
        queryCollection('contact').first(),
      ]);
      if (!site || !accueil || !tarifs || !contact) {
        throw createError({ statusCode: 500, statusMessage: 'Contenu du site introuvable' });
      }
      return { ...site, pages: { accueil, tarifs, contact } };
    },
    // Header, footer and page all call this at once: share the pending request
    // instead of cancelling it (Nuxt's default), which would leave earlier callers empty.
    { dedupe: 'defer' },
  );

  return computed(() => data.value!);
};
