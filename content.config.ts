import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Each page of the site is one YAML file in /content, edited by the owner through
// Nuxt Studio (/_studio). Labels below are what the owner sees in the Studio forms.

const text = (label: string) => z.string().editor({ label })
const longText = (label: string) => z.string().editor({ label, input: 'textarea' })
const media = (label: string) => z.string().editor({ label, input: 'media' })

// Icons available in the pages' iconMap (lucide-vue-next)
const featureIcon = z
  .enum(['UserRound', 'HandHeart', 'HeartHandshake', 'Ticket', 'Dumbbell', 'RotateCw', 'Baby', 'Salad'])
  .editor({ label: 'Icône' })
const linkIcon = z.enum(['ArrowRight', '']).editor({ label: 'Icône du lien (flèche ou vide)' })

const sectionHeader = {
  title: text('Titre'),
  subtitle: text('Sur-titre'),
  description: longText('Description'),
}

const seo = {
  metaTitle: text('Titre Google (onglet du navigateur)'),
  metaDescription: longText('Description Google'),
}

export default defineContentConfig({
  collections: {
    site: defineCollection({
      type: 'data',
      source: 'site.yml',
      schema: z.object({
        site: z.object({
          name: text('Nom du site'),
          description: longText('Description'),
          keywords: text('Mots-clés'),
        }).editor({ label: 'Site' }),
        navigation: z.object({
          l_espace: text('Menu : L\'Espace'),
          apa: text('Menu : L\'APA'),
          autres_activités: text('Menu : Autres activités'),
          tarifs: text('Menu : Tarifs'),
          moi: text('Menu : À propos'),
          contact: text('Bouton : Contact'),
        }).editor({ label: 'Menu' }),
        header: z.object({
          logo: media('Logo (en-tête)'),
        }).editor({ label: 'En-tête' }),
        footer: z.object({
          logo: media('Logo (pied de page)'),
          copyright: text('Copyright'),
          address: text('Adresse'),
          zip_city: text('Code postal et ville'),
          social: z.object({
            facebook: text('Lien Facebook'),
            instagram: text('Lien Instagram'),
          }).editor({ label: 'Réseaux sociaux' }),
        }).editor({ label: 'Pied de page' }),
      }),
    }),

    accueil: defineCollection({
      type: 'data',
      source: 'accueil.yml',
      schema: z.object({
        title: text('Nom de la page'),
        ...seo,
        hero: z.object({
          title: longText('Titre principal (retour à la ligne possible)'),
          subtitle: longText('Texte 1'),
          subtitle_2: longText('Texte 2'),
          cta: text('Texte du bouton'),
          img: media('Image'),
        }).editor({ label: 'Bienvenue (haut de page)' }),
        news: z.object({
          title: text('Titre'),
          subtitle: text('Sur-titre'),
          items: z.array(z.object({
            description: longText('Actualité'),
          })).editor({ label: 'Actualités (défilent automatiquement)' }),
        }).editor({ label: 'Actualités' }),
        apa: z.object({
          ...sectionHeader,
          features: z.array(z.object({
            icon: featureIcon,
            title: text('Titre'),
            description: longText('Description'),
          })).editor({ label: 'Points clés' }),
          cta: text('Texte du bouton'),
          img: media('Image'),
        }).editor({ label: 'L\'APA' }),
        autres_activites: z.object({
          ...sectionHeader,
          activities: z.array(z.object({
            title: text('Nom de l\'activité'),
            description: longText('Description'),
            description_2: longText('Description (suite, facultatif)'),
            img: media('Image'),
            icon: featureIcon,
            link: z.object({
              href: text('Lien (adresse)'),
              label: text('Texte du lien'),
              icon: linkIcon,
            }).editor({ label: 'Lien' }),
          })).editor({ label: 'Activités' }),
        }).editor({ label: 'Autres activités' }),
        moi: z.object({
          title: text('Titre'),
          subtitle: text('Sur-titre'),
          name: text('Prénom'),
          description: longText('Paragraphe 1'),
          description_2: longText('Paragraphe 2'),
          description_3: longText('Paragraphe 3'),
          description_4: longText('Paragraphe 4'),
          img: media('Photo'),
        }).editor({ label: 'À propos de moi' }),
      }),
    }),

    tarifs: defineCollection({
      type: 'data',
      source: 'tarifs.yml',
      schema: z.object({
        ...seo,
        planning: z.object({
          ...sectionHeader,
          download_link: z.object({
            href: media('Fichier du planning à télécharger'),
            label: text('Texte du lien'),
            icon: z.string().editor({ hidden: true }),
          }).editor({ label: 'Téléchargement' }),
          img: media('Image du planning'),
        }).editor({ label: 'Planning' }),
        apa: z.object({
          ...sectionHeader,
          pricing: z.array(z.object({
            title: text('Formule'),
            prices: z.array(z.object({
              amount: text('Prix'),
              label: text('Précision (facultatif)'),
            })).editor({ label: 'Prix' }),
          })).editor({ label: 'Formules' }),
          disclaimer: longText('Mention en bas'),
        }).editor({ label: 'Tarifs APA' }),
        autres_activites: z.object({
          ...sectionHeader,
          activities: z.array(z.object({
            title: text('Activité'),
            price: text('Prix'),
            description: longText('Description'),
            schedule: z.array(text('Créneau')).editor({ label: 'Créneaux' }),
          })).editor({ label: 'Activités' }),
          disclaimer_1: longText('Mention 1'),
          disclaimer_2: longText('Mention 2'),
        }).editor({ label: 'Tarifs autres activités' }),
      }),
    }),

    contact: defineCollection({
      type: 'data',
      source: 'contact.yml',
      schema: z.object({
        title: text('Titre'),
        subtitle: longText('Sous-titre'),
        ...seo,
        img: media('Image'),
        form: z.object({
          firstname: text('Champ Prénom'),
          firstnamePlaceholder: text('Exemple Prénom'),
          lastname: text('Champ Nom'),
          lastnamePlaceholder: text('Exemple Nom'),
          email: text('Champ Email'),
          emailPlaceholder: text('Exemple Email'),
          phone: text('Champ Téléphone'),
          phonePlaceholder: text('Exemple Téléphone'),
          message: text('Champ Message'),
          messagePlaceholder: text('Exemple Message'),
          submit: text('Bouton Envoyer'),
          sending: text('Texte pendant l\'envoi'),
          success: longText('Message de succès'),
          error: longText('Message d\'erreur'),
        }).editor({ label: 'Formulaire' }),
      }),
    }),
  },
})
