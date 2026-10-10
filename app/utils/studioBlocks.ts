// Studio's visual editor (TipTap) for the pages built from blocks (content/pages/*.md):
// French names of the blocks and of their settings, and the content a block gets when inserted.
// Used by plugins/studio-highlight.client.ts.

/** "TexteImage", "texte-image" or "Texte Image" (Studio's display) -> "texteimage" */
export const blockKey = (name?: string) => (name ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

/** Names shown in the "/" menu, on the blocks in the editor, and in the page's orange badge */
export const BLOCK_LABELS: Record<string, string> = {
  bienvenue: 'Bienvenue (haut de page)',
  sectionpage: 'Section',
  texteimage: 'Texte + image',
  actualites: 'Actualités',
  bandeau: 'Bandeau',
  localisation: 'Localisation (plan)',
  espace: 'Espace',
  grille: 'Grille',
  carte: 'Carte',
  pointscles: 'Points clés autour d\'une photo',
  bouton: 'Bouton',
  faq: 'FAQ (questions fréquentes)',
  question: 'Question',
  temoignage: 'Témoignage',
  photo: 'Photo',
};

export const blockLabel = (tag?: string) => BLOCK_LABELS[blockKey(tag)] ?? tag ?? 'Bloc';

/** Settings of the blocks: Studio shows the prop name with a capital ("Cote", "Icon") */
export const PROP_LABELS: Record<string, string> = {
  Icon: 'Icône',
  Fond: 'Couleur de fond',
  Cote: 'Côté de la photo',
  Encadre: 'Encadré blanc',
  Ancre: 'Ancre (lien du menu : /#ancre)',
  Alignement: 'Alignement du texte',
  Lien: 'Lien (/contact, /#lapa, https://…)',
  Apparence: 'Apparence',
  Colonnes: 'Nombre de colonnes',
  Precision: 'Précision (ex. Pilates depuis 2024)',
  Adresse: 'Adresse (pour le plan)',
  Taille: 'Taille',
  Ligne: 'Ligne de séparation',
};

// --- Content of a block just inserted with "/" ----------------------------------------------
// Studio inserts a block with one empty text area; these presets fill it like an example, so a
// new block already looks right on the page (Storyblok-like "presets").

type Json = Record<string, unknown>;
const text = (value: string) => [{ type: 'text', text: value }];
const p = (value = '') => ({ type: 'paragraph', content: value ? text(value) : [] });
const heading = (level: number, value: string) => ({ type: 'heading', attrs: { level }, content: text(value) });
const block = (tag: string, props: Record<string, string>, content: Json[]) => ({
  type: 'element',
  attrs: { tag, props },
  content: [{ type: 'slot', attrs: { name: 'default', props: {} }, content }],
});
const carte = (icon: string, title: string) => block('carte', { icon }, [heading(3, title), p('Un court texte pour présenter ce point.')]);
const question = (value: string, answer: string) => block('question', {}, [heading(3, value), p(answer)]);

const PRESETS: Record<string, { props?: Record<string, string>; content: () => Json[] }> = {
  bienvenue: {
    props: { image: '/img-hero.svg' },
    content: () => [
      heading(1, 'Le titre de la page'),
      p('Une phrase d\'introduction.'),
      block('bouton', { lien: '/contact' }, [p('Me contacter')]),
    ],
  },
  sectionpage: {
    content: () => [heading(4, 'Sur-titre'), heading(2, 'Le titre de la section'), p('Un texte d\'introduction. Tapez « / » pour ajouter des blocs dans cette section.')],
  },
  texteimage: {
    props: { image: '/img-hero.svg' },
    content: () => [heading(2, 'Un titre'), p('Votre texte, à côté de la photo.')],
  },
  bandeau: {
    content: () => [
      heading(2, 'Votre message'),
      p('Un texte court pour le mettre en avant.'),
      block('bouton', { lien: '/contact', apparence: 'clair' }, [p('Me contacter')]),
    ],
  },
  localisation: {
    props: { adresse: '105 Rue nationale, 72330 Cérans-Foulletourte' },
    content: () => [heading(2, 'Venir à l\'Atelier'), p('105 Rue nationale, 72330 Cérans-Foulletourte')],
  },
  grille: {
    content: () => [
      carte('i-lucide-heart', 'Première carte'),
      carte('i-lucide-star', 'Deuxième carte'),
      carte('i-lucide-smile', 'Troisième carte'),
    ],
  },
  carte: {
    props: { icon: 'i-lucide-heart' },
    content: () => [heading(3, 'Titre de la carte'), p('Un court texte pour présenter ce point.')],
  },
  pointscles: {
    props: { image: '/img-hero.svg' },
    content: () => [
      carte('i-lucide-heart', 'Premier point'),
      carte('i-lucide-star', 'Deuxième point'),
      carte('i-lucide-smile', 'Troisième point'),
      carte('i-lucide-sun', 'Quatrième point'),
    ],
  },
  bouton: { props: { lien: '/contact' }, content: () => [p('Texte du bouton')] },
  faq: {
    content: () => [
      question('Votre première question ?', 'La réponse s\'affiche quand le visiteur clique sur la question.'),
      question('Votre deuxième question ?', 'Une autre réponse.'),
    ],
  },
  question: { content: () => [heading(3, 'Votre question ?'), p('La réponse.')] },
  temoignage: { props: { nom: 'Prénom' }, content: () => [p('Le témoignage d\'une cliente, en quelques phrases.')] },
  photo: { props: { image: '/img-hero.svg' }, content: () => [p('Une légende (facultative)')] },
};

type PmNode = {
  type: { name: string };
  attrs: { tag?: string; props?: Record<string, unknown>; name?: string };
  childCount: number;
  firstChild: PmNode | null;
  content: { size: number };
};

/**
 * A block exactly as Studio inserts it: no settings, and one empty text area (just after the
 * insertion) or no content at all (once Studio has saved and reloaded it)
 */
export const isNewBlock = (node: PmNode) => {
  if (node.type.name !== 'element' || Object.keys(node.attrs.props ?? {}).length) return false;
  if (node.childCount === 0) return true;
  const slot = node.firstChild;
  const paragraph = slot?.firstChild;
  return (
    node.childCount === 1 &&
    slot?.type.name === 'slot' &&
    slot.childCount === 1 &&
    paragraph?.type.name === 'paragraph' &&
    paragraph.content.size === 0
  );
};

export const hasPreset = (tag?: string) => Boolean(PRESETS[blockKey(tag)]);

/** TipTap JSON of a block with its example content (or empty, for blocks without preset) */
export const blockJSON = (tag: string) => {
  const preset = PRESETS[blockKey(tag)];
  return {
    type: 'element',
    attrs: { tag, props: { ...preset?.props } },
    content: [
      { type: 'slot', attrs: { name: 'default', props: {} }, content: preset ? preset.content() : [p()] },
    ],
  };
};
