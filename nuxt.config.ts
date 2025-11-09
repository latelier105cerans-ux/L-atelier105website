// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    public: {
      web3formsAccessKey: '',
    },
  },

  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/Atelier-105/' : '/',
    head: {
      htmlAttrs: {
        lang: 'fr',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roustel&display=swap',
        },
      ],
    },
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
})
