import { defineCollection, defineContentConfig, property } from '@nuxt/content'
import type { EditorOptions } from '@nuxt/content'
import { z } from 'zod/v4'

// Each page of the site is one YAML file in /content, edited by the owner through
// Nuxt Studio (/_studio). Labels below are what the owner sees in the Studio forms.
//
// Zod v4 (zod/v4) + property().editor() is required: with Zod v3, editor options set on
// an object/array hide the options of every field inside it (no labels, no textarea, no media picker).

const edit = <T extends z.ZodType>(schema: T, editor: EditorOptions): T =>
  property(schema as any).editor(editor) as unknown as T

const text = (label: string, description?: string) => edit(z.string(), { label, description })
const longText = (label: string, description?: string) =>
  edit(z.string(), { label, description, input: 'textarea' })
const media = (label: string, description = 'JPG, PNG ou WEBP, idéalement environ 2000 pixels de large') =>
  edit(z.string(), { label, description, input: 'media' })
const group = <T extends z.ZodRawShape>(label: string, shape: T) => edit(z.object(shape), { label })
const list = <T extends z.ZodType>(label: string, item: T, description?: string) =>
  edit(z.array(item), { label, description })
// Optional, so existing entries without the field stay visible
const hidden = (what = 'cet élément') =>
  edit(z.boolean(), { label: 'Masquer sur le site', description: `Activez pour cacher ${what} du site, sans rien supprimer` }).optional()
// Page collections get these fields from Nuxt Content; they're unused by the site, so hide them in Studio.
// Never hide a key that exists in a YAML file: Studio drops hidden keys before comparing with GitHub,
// which shows a permanent "Conflit détecté" (and publishing would delete the key)
const pageMeta = {
  title: edit(z.string(), { hidden: true }).optional(),
  description: edit(z.string(), { hidden: true }).optional(),
  seo: edit(z.any(), { hidden: true }).optional(),
  navigation: edit(z.any(), { hidden: true }).optional(),
}
const href = () => text('Lien', 'Ex. /tarifs, /contact, /#lapa (section de l\'accueil) ou https://… (autre site)')

const sectionHeader = {
  title: text('Titre'),
  subtitle: text('Sur-titre', 'Petit texte coloré au-dessus du titre'),
  description: longText('Description'),
}

const seo = {
  metaTitle: text('Titre Google', 'Affiché dans l\'onglet du navigateur et dans les résultats Google'),
  metaDescription: longText('Description Google', 'Affichée sous le titre dans les résultats Google'),
}

export default defineContentConfig({
  collections: {
    site: defineCollection({
      type: 'data',
      source: 'menu-et-pied-de-page.yml',
      schema: z.object({
        header: group('En-tête', {
          logo: media('Logo (en-tête)', 'SVG ou PNG'),
        }),
        navigation: group('Menu', {
          links: list('Liens du menu', z.object({
            label: text('Texte'),
            href: href(),
            hidden: hidden('ce lien'),
          }), 'Affichés dans l\'en-tête (ordinateur et mobile) et dans le pied de page, dans cet ordre'),
          contact: group('Bouton vert (à droite du menu et dans le pied de page)', {
            label: text('Texte'),
            href: href(),
          }),
        }),
        footer: group('Pied de page', {
          logo: media('Logo (pied de page)', 'SVG ou PNG'),
          copyright: text('Copyright'),
          address: text('Adresse'),
          zip_city: text('Code postal et ville'),
          phone: text('Téléphone', 'Facultatif, cliquable sur mobile. Laisser vide pour ne pas l\'afficher').optional(),
          email: text('Email', 'Facultatif. Laisser vide pour ne pas l\'afficher').optional(),
          social: group('Réseaux sociaux', {
            facebook: text('Lien Facebook', 'Adresse complète, commençant par https://'),
            instagram: text('Lien Instagram', 'Adresse complète, commençant par https://'),
          }),
        }),
      }),
    }),

    // Site pages built from blocks (Markdown + MDC components of app/components/content),
    // edited in Studio's visual editor. content/pages/index.md is the home page, any other file
    // is a page at its own address (content/pages/stages.md -> /stages)
    pages: defineCollection({
      type: 'page',
      source: { include: 'pages/**/*.md', prefix: '/' },
      schema: z.object({
        title: text('Titre de la page', 'Affiché dans l\'onglet du navigateur et dans les résultats Google'),
        description: longText('Description Google', 'Affichée sous le titre dans les résultats Google'),
        // false by default (a missing boolean is stored as false), like the other "Masquer" switches
        masquer: edit(z.boolean(), {
          label: 'Masquer la page',
          description: 'Activez pour cacher la page aux visiteurs (elle reste visible dans l\'éditeur)',
        }).optional(),
        seo: edit(z.any(), { hidden: true }).optional(),
        navigation: edit(z.any(), { hidden: true }).optional(),
      }),
    }),

    // News shown by the "Actualités" block and on the contact page (one place for all pages)
    actualites: defineCollection({
      type: 'data',
      source: 'actualites.yml',
      schema: z.object({
        news: group('Actualités', {
          title: text('Titre'),
          subtitle: text('Sur-titre', 'Petit texte coloré au-dessus du titre'),
          items: list('Actualités', z.object({
            description: longText('Actualité'),
            hidden: hidden('cette actualité'),
            // Studio's date picker (input 'date' isn't in EditorOptions' type but Studio supports it);
            // stays a plain string (YYYY-MM-DD or empty) so a cleared date never fails validation
            until: edit(z.string(), {
              label: 'Afficher jusqu\'au',
              description: 'Facultatif. Le lendemain de cette date, l\'actualité disparaît du site.',
              input: 'date' as EditorOptions['input'],
            }).optional(),
          }), 'Elles défilent automatiquement toutes les 5 secondes'),
        }),
      }),
    }),

    tarifs: defineCollection({
      type: 'page',
      source: 'tarifs.yml',
      schema: z.object({
        ...pageMeta,
        apa: group('Tarifs APA', {
          hidden: hidden('toute cette section'),
          ...sectionHeader,
          pricing: list('Formules', z.object({
            hidden: hidden('cette formule'),
            title: text('Formule'),
            prices: list('Prix', z.object({
              amount: text('Prix', 'Ex. 60€/mois'),
              label: text('Précision', 'Facultatif, ex. (engagement trimestriel)'),
            })),
          })),
          disclaimer: longText('Mention en bas'),
        }),
        autres_activites: group('Tarifs autres activités', {
          hidden: hidden('toute cette section'),
          ...sectionHeader,
          activities: list('Activités', z.object({
            hidden: hidden('cette activité'),
            title: text('Activité'),
            price: text('Prix'),
            description: longText('Description'),
            schedule: list('Créneaux', text('Créneau', 'Ex. Lundi de 18h à 19h')),
          })),
          disclaimer_1: longText('Mention 1'),
          disclaimer_2: longText('Mention 2'),
        }),
        planning: group('Planning', {
          hidden: hidden('toute cette section'),
          ...sectionHeader,
          download_link: group('Téléchargement', {
            href: media('Fichier du planning à télécharger', 'Choisissez la même image que « Image du planning »'),
            label: text('Texte du lien'),
            icon: edit(z.string(), { hidden: true }),
          }),
          img: media('Image du planning'),
        }),
        ...seo,
      }),
    }),

    contact: defineCollection({
      type: 'page',
      source: 'contact.yml',
      schema: z.object({
        ...pageMeta,
        // Visible heading of the contact page (stored in Nuxt Content's own `title` field)
        title: text('Titre'),
        subtitle: longText('Sous-titre'),
        img: media('Image'),
        form: group('Formulaire', {
          firstname: text('Champ Prénom'),
          firstnamePlaceholder: text('Exemple Prénom', 'Texte grisé dans le champ vide'),
          lastname: text('Champ Nom'),
          lastnamePlaceholder: text('Exemple Nom', 'Texte grisé dans le champ vide'),
          email: text('Champ Email'),
          emailPlaceholder: text('Exemple Email', 'Texte grisé dans le champ vide'),
          phone: text('Champ Téléphone'),
          phonePlaceholder: text('Exemple Téléphone', 'Texte grisé dans le champ vide'),
          message: text('Champ Message'),
          messagePlaceholder: text('Exemple Message', 'Texte grisé dans le champ vide'),
          submit: text('Bouton Envoyer'),
          sending: text('Texte pendant l\'envoi'),
          success: longText('Message de succès'),
          error: longText('Message d\'erreur'),
        }),
        ...seo,
      }),
    }),
  },
})
