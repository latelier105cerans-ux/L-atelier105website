# L'Atelier 105

Site vitrine de L'Atelier 105 (Nuxt 4 + Tailwind), déployé sur Vercel à chaque push sur `main`.

## Contenu

Tous les textes, prix et images sont dans [`content/`](content/) (un fichier YAML par page) et décrits dans [`content.config.ts`](content.config.ts).
Les pages les lisent via `useContent()`.

La propriétaire modifie le contenu elle-même avec **Nuxt Studio** sur `https://<domaine>/_studio` :
chaque publication crée un commit sur `main`, ce qui redéploie le site sur Vercel.
Guide utilisateur : [`docs/guide-modifier-le-site.md`](docs/guide-modifier-le-site.md).

> Pour éviter les conflits, faites `git pull` avant de modifier le code : la propriétaire commite aussi sur `main`.

### Configuration de Nuxt Studio (une seule fois)

1. Sur le compte GitHub `latelier105cerans-ux` : *Settings → Developer settings → OAuth Apps → New OAuth App*
   - Homepage URL : `https://<domaine>`
   - Authorization callback URL : `https://<domaine>/__nuxt_studio/auth/github`
2. Dans Vercel → *Settings → Environment Variables*, ajouter `STUDIO_GITHUB_CLIENT_ID` et `STUDIO_GITHUB_CLIENT_SECRET`, puis redéployer.
3. Vercel → *Settings → General → Node.js Version* : 22.x ou plus (SQLite natif de Node).

## Développement

```bash
npm install
npm run dev     # http://localhost:3000 — Studio local sur /_studio (modifie directement les fichiers)
npm run build
```

Copier `.env.example` en `.env` et renseigner les clés.
