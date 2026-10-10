// Shared styles of the page blocks (app/components/content). Every class is written in full:
// Tailwind only keeps classes it can read as complete strings in the source.

/** Background of a page section, chosen by the owner ("Fond" in Studio) */
export const FONDS = {
  blanc: 'bg-gray-25 text-gray-900',
  beige: 'bg-secondary-earth-50 text-gray-900',
  'vert-clair': 'bg-primary-green-100 text-gray-900',
  vert: 'bg-primary-green-400 text-gray-25',
} as const;
export type Fond = keyof typeof FONDS;

/** Background of a card-like element (Carte, Temoignage…) */
export const FONDS_CARTE = {
  aucun: '',
  blanc: 'bg-gray-25 text-gray-900 rounded-2xl p-6 desktopview:p-8 shadow-sm',
  beige: 'bg-secondary-earth-50 text-gray-900 rounded-2xl p-6 desktopview:p-8',
  'vert-clair': 'bg-primary-green-100 text-gray-900 rounded-2xl p-6 desktopview:p-8',
  vert: 'bg-primary-green-400 text-gray-25 rounded-2xl p-6 desktopview:p-8',
} as const;
export type FondCarte = keyof typeof FONDS_CARTE;

/** Vertical spacing of a page section */
export const ESPACEMENTS = {
  normal: 'py-12 desktopview:py-20',
  hero: 'py-12 desktopview:py-16',
  compact: 'py-10 desktopview:py-14',
} as const;

/** Internal links stay in the site, the others open in a new tab */
export const isExternal = (link?: string) => /^(https?:)?\/\//.test(link ?? '');

// Provided by a page-level section to the blocks inside it (they then drop their own section frame)
export const DANS_UNE_SECTION = Symbol('dans-une-section');

/** Studio's icon picker stores "i-lucide:baby" (or "i-lucide-baby"): @nuxt/icon wants "lucide:baby" */
export const iconName = (icon?: string) => {
  const name = (icon ?? '').trim().replace(/^i-/, '');
  return name.includes(':') ? name : name.replace('-', ':');
};
