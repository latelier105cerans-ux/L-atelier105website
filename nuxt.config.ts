// https://nuxt.com/docs/api/configuration/nuxt-config

// Blocks of app/components/content offered in Studio's "/" menu (names in both cases: Studio
// matches its component names, PascalCase or kebab-case depending on the source)
const withKebab = (names: string[]) =>
  names.flatMap((name) => [name, name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()])
const SECTION_BLOCKS = withKebab([
  'Bienvenue', 'SectionPage', 'TexteImage', 'Actualites', 'Bandeau', 'Localisation', 'Espace',
])
const ITEM_BLOCKS = withKebab([
  'Grille', 'Carte', 'PointsCles', 'Bouton', 'Faq', 'Question', 'Temoignage', 'Photo',
])

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', 'nuxt-studio', '@nuxt/icon'],

  content: {
    build: {
      markdown: {
        remarkPlugins: {
          // Studio's visual editor writes a block holding one paragraph without the paragraph
          // (MDC "auto-unwrap"): parse the files the same way, or every page with a Bouton
          // would show as modified ("Modifié") as soon as it is opened in Studio
          'remark-mdc': { options: { autoUnwrap: true } },
        },
      },
    },
    experimental: {
      // Use Node's built-in SQLite (Node >= 22.5) instead of the better-sqlite3 native package
      sqliteConnector: 'native',
    },
  },

  // Icons picked by the owner in Studio's icon picker (Lucide only), served from the local collection
  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
  },

  // Page blocks (app/components/content) must be global so Studio lists them in its "/" menu
  hooks: {
    'components:extend': (components) => {
      for (const component of components) {
        if (component.filePath.includes('/components/content/')) component.global = true
      }
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
      // The deployed branch: a preview deployment of another branch must not publish to main
      branch: process.env.VERCEL_GIT_COMMIT_REF || 'main',
    },
    i18n: {
      defaultLocale: 'fr',
    },
    git: {
      commit: {
        messagePrefix: 'content:',
      },
    },
    editor: {
      // Page builder: only the site's blocks, grouped like a block library
      components: {
        include: [...SECTION_BLOCKS, ...ITEM_BLOCKS],
        groups: [
          { label: 'Sections de page', include: SECTION_BLOCKS },
          { label: 'Éléments (à placer dans une section)', include: ITEM_BLOCKS },
        ],
        ungrouped: 'omit',
      },
      // Technical entries the owner doesn't need
      commands: {
        exclude: ['codeBlock', 'code', 'video'],
      },
      iconLibraries: ['lucide'],
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
