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

## Déployer sur Vercel (gratuit)

1. Pousse le repo sur GitHub (voir ci-dessous).
2. Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importe le repo.
3. Dans **Environment Variables**, colle les deux variables `NEXT_PUBLIC_SUPABASE_*`.
4. **Deploy**. Vercel détecte Next.js automatiquement.

---

## Pousser sur GitHub

```bash
git init
git add .
git commit -m "MCT2000 — initial commit"
gh repo create mct2000 --public --source=. --remote=origin --push
```

(ou manuellement, créer le repo sur github.com puis `git remote add origin … && git push -u origin main`).

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
