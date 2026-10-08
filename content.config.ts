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
  edit(z.boolean(), { label: 'Masquer sur le site', description: `Activez pour cacher ${what} sans le supprimer` }).optional()
// Page collections get these fields from Nuxt Content; they're unused by the site, so hide them in Studio
const pageMeta = {
  title: edit(z.string(), { hidden: true }).optional(),
  description: edit(z.string(), { hidden: true }).optional(),
  seo: edit(z.any(), { hidden: true }).optional(),
  navigation: edit(z.any(), { hidden: true }).optional(),
}
const href = () => text('Lien', 'Ex. /tarifs, /contact, /#lapa (section de l\'accueil) ou https://… (autre site)')

// Icons available in the pages' iconMap (lucide-vue-next)
const featureIcon = edit(
  z.enum(['UserRound', 'HandHeart', 'HeartHandshake', 'Ticket', 'Dumbbell', 'RotateCw', 'Baby', 'Salad']),
  { label: 'Icône' },
)
const linkIcon = edit(z.enum(['ArrowRight', '']), { label: 'Icône du lien', description: 'ArrowRight = flèche, vide = pas d\'icône' })

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
        // Not displayed anywhere on the site: hidden to avoid confusion
        site: edit(z.object({
          name: text('Nom du site'),
          description: longText('Description'),
          keywords: text('Mots-clés', 'Séparés par des virgules'),
        }), { hidden: true }),
      }),
    }),

    accueil: defineCollection({
      // 'page' gives each file a path, so Studio opens the matching page in the preview (and vice versa)
      type: 'page',
      source: 'accueil.yml',
      schema: z.object({
        ...pageMeta,
        hero: group('Bienvenue (haut de page)', {
          title: longText('Titre principal', 'Un retour à la ligne ici = un retour à la ligne sur le site'),
          subtitle: longText('Texte 1'),
          subtitle_2: longText('Texte 2'),
          cta: text('Texte du bouton'),
          img: media('Image'),
        }),
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
        apa: group('L\'APA', {
          hidden: hidden('toute cette section'),
          ...sectionHeader,
          features: list('Points clés', z.object({
            icon: featureIcon,
            title: text('Titre'),
            description: longText('Description'),
          })),
          cta: text('Texte du bouton'),
          img: media('Image'),
        }),
        autres_activites: group('Autres activités', {
          hidden: hidden('toute cette section'),
          ...sectionHeader,
          activities: list('Activités', z.object({
            hidden: hidden('cette activité'),
            title: text('Nom de l\'activité'),
            description: longText('Description'),
            description_2: longText('Description (suite)', 'Facultatif, laisser vide si inutile'),
            img: media('Image'),
            icon: featureIcon,
            link: group('Lien', {
              href: text('Adresse du lien', 'Ex. /tarifs, /contact ou /tarifs#autres-activites'),
              label: text('Texte du lien'),
              icon: linkIcon,
            }),
          })),
        }),
        moi: group('À propos de moi', {
          hidden: hidden('toute cette section'),
          title: text('Titre'),
          subtitle: text('Sur-titre', 'Petit texte coloré au-dessus du titre'),
          name: text('Prénom', 'Écrit en police manuscrite'),
          description: longText('Paragraphe 1'),
          description_2: longText('Paragraphe 2'),
          description_3: longText('Paragraphe 3'),
          description_4: longText('Paragraphe 4'),
          img: media('Photo'),
        }),
        ...seo,
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
