// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', 'nuxt-studio'],

  content: {
    experimental: {
      // Use Node's built-in SQLite (Node >= 22.5) instead of the better-sqlite3 native package
      sqliteConnector: 'native',
    },
  },

  // Visual editor for the owner, available at /_studio. Publishing commits to GitHub,
  // which triggers a Vercel deployment.
  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'latelier105cerans-ux',
      repo: 'L-atelier105website',
      branch: 'main',
    },
    i18n: {
      defaultLocale: 'fr',
    },
    git: {
      commit: {
        messagePrefix: 'content:',
      },
    },
  },

  runtimeConfig: {
    public: {
      web3formsAccessKey: '',
    },
  },

  app: {
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
