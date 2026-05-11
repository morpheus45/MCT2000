# MCT2000 — Motorcycle Club Platform

Plateforme web moderne pour le club moto **MCT2000** : landing immersive, chat temps réel, feed communautaire, calendrier des sorties, bibliothèque d'itinéraires, profils membres.

> **Stack** : Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Supabase (Auth + Postgres + Realtime).

---

## Aperçu des fonctionnalités

| Page | Description |
|---|---|
| `/` | Landing immersive — hero animé, marquee, timeline, sorties à l'affiche |
| `/feed` | Mur du club : publication, likes, temps réel |
| `/chat` | Chat multi-canaux temps réel (Supabase Realtime) |
| `/events` | Calendrier des sorties + inscription |
| `/rides` | Bibliothèque d'itinéraires |
| `/members` | Roster des membres (pseudo, moto, ville, KM) |
| `/login` · `/signup` | Auth email + mot de passe |
| `/about` | Histoire du club |

---

## Lancer en local

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer en mode "vitrine" (sans backend)

```bash
npm run dev
```

Ouvre `http://localhost:3000`. La landing, `/events`, `/rides`, `/members` (données démo), `/about` fonctionnent sans configuration. `/feed` et `/chat` afficheront un encart "Supabase non configuré".

### 3. Activer le backend (chat, auth, feed)

#### a. Créer un projet Supabase

1. Va sur [app.supabase.com](https://app.supabase.com) → **New project**.
2. Note la **Project URL** et l'**anon public key** (Settings → API).

#### b. Initialiser la base

1. Dans Supabase → **SQL Editor** → **New query**.
2. Colle le contenu de [`supabase/schema.sql`](supabase/schema.sql) → **Run**.

Cela crée toutes les tables (`profiles`, `channels`, `messages`, `posts`, `events`...), les vues, le trigger auto-profil, les politiques RLS, et active Realtime sur les tables clés.

#### c. Connecter le front

Copie `.env.local.example` → `.env.local` et remplis :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
```

Redémarre `npm run dev` — chat & feed sont maintenant fonctionnels.

---

## Déployer sur GitHub Pages (recommandé)

Le projet est pré-configuré pour `https://<user>.github.io/MCT2000/` :
- `next.config.js` → `output: "export"` + `basePath: "/MCT2000"`
- `.github/workflows/deploy.yml` → build + push automatique vers GitHub Pages

### 1. Créer le repo et pousser

```bash
# Depuis le dossier MCT2000/
gh repo create MCT2000 --public --source=. --remote=origin --push
# ou manuellement :
#   git remote add origin https://github.com/<user>/MCT2000.git
#   git push -u origin main
```

### 2. Activer Pages

Repo → **Settings** → **Pages** → **Source : GitHub Actions**.

### 3. Ajouter les secrets Supabase

Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** (×2) :

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `ey...` |

Re-déclenche le workflow (**Actions → Deploy → Run workflow**) ou pousse un commit — le site sera live à **`https://<user>.github.io/MCT2000/`**.

### Alternative — Vercel (plus simple, sans basePath)

1. [vercel.com](https://vercel.com) → **Import** ce repo.
2. **Environment Variables** : `NEXT_PUBLIC_SUPABASE_*` **et** `NEXT_PUBLIC_BASE_PATH=""` (chaîne vide).
3. Deploy.

---

## Structure

```
.
├── app/
│   ├── layout.tsx              # Layout global (Navbar + Footer)
│   ├── page.tsx                # Landing
│   ├── globals.css             # Tailwind + thème dark/flame
│   ├── login/  signup/         # Auth
│   ├── chat/   feed/           # Temps réel (Supabase)
│   ├── events/ rides/ members/ # Pages contenu
│   └── about/                  # Histoire du club
├── components/                 # UI réutilisable (Hero, Navbar, ChatClient, FeedClient...)
├── lib/
│   ├── supabase/{client,server}.ts
│   └── utils.ts
├── supabase/schema.sql         # Schéma DB + RLS + triggers + realtime
├── tailwind.config.ts
└── package.json
```

---

## Design system

- **Couleurs** : palette `ink` (sombre charbon) + `flame` (orange/feu) sur fond `#06060a`.
- **Typo** : Bebas Neue (display, titres), Inter (texte), JetBrains Mono (data).
- **Effets** : grain photographique global, scanlines subtiles, glow flame, gradients animés, framer-motion sur les apparitions et la nav.
- **Style** : éditorial / moto / racing — pas du Bootstrap, pas du "SaaS bleu pâle".

---

## Roadmap suggérée

- [ ] Upload photos (Supabase Storage) — bucket public `posts`
- [ ] Notifications push (PWA) pour les sorties
- [ ] Carte interactive Mapbox des itinéraires (traces GPX)
- [ ] Page profil membre détaillée + badges
- [ ] Modération (signaler / officer dashboard)
- [ ] Mode "live ride" — partage de position temps réel pendant une sortie

---

## Licence

MIT — fais-en bon usage. Ride safe. 🔥
