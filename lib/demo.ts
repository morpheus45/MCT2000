// Demo / preview mode helpers.
// When Supabase env vars are missing, the site runs in DEMO mode:
// - All pages render fully populated with mock data
// - Mutating actions are disabled with a clear explanation
// - A top banner invites the user to connect their Supabase project

import { supabaseConfigured } from "./supabase/client";

export const isDemo = !supabaseConfigured;

export type DemoProfile = {
  id: string;
  pseudo: string;
  bike: string | null;
  city: string | null;
  km: number | null;
  joined_year: number | null;
  avatar_url: string | null;
  bio: string | null;
  role: "admin" | "officer" | "member";
};

export const demoMe: DemoProfile = {
  id: "demo-user",
  pseudo: "Cédric",
  bike: "BMW R1250GS",
  city: "Sud de la France",
  // Note: la ville exacte n'est plus affichée dans le profil démo
  km: 78400,
  joined_year: 2015,
  avatar_url: null,
  bio:
    "Routard du Languedoc, 10 ans dans le club. Passion : longs cols et cafés à 8h du matin avant le départ.",
  role: "admin",
};

export const demoMembers: DemoProfile[] = [
  demoMe,
  { id: "m2", pseudo: "Sophie", bike: "Triumph Street Triple", city: "Lodève", km: 28000, joined_year: 2021, avatar_url: null, bio: null, role: "officer" },
  { id: "m3", pseudo: "Marco", bike: "Honda Africa Twin", city: "Sète", km: 132000, joined_year: 2008, avatar_url: null, bio: null, role: "member" },
  { id: "m4", pseudo: "Lina", bike: "Ducati Monster 937", city: "Montpellier", km: 41000, joined_year: 2022, avatar_url: null, bio: null, role: "member" },
  { id: "m5", pseudo: "Tonio", bike: "Harley Fat Boy", city: "Béziers", km: 87000, joined_year: 2014, avatar_url: null, bio: null, role: "member" },
  { id: "m6", pseudo: "Jess", bike: "Triumph Speed Twin", city: "Pézenas", km: 56000, joined_year: 2019, avatar_url: null, bio: null, role: "member" },
  { id: "m7", pseudo: "Karim", bike: "KTM 1290 Super Duke", city: "Nîmes", km: 73000, joined_year: 2017, avatar_url: null, bio: null, role: "member" },
  { id: "m8", pseudo: "Patou", bike: "Yamaha MT-09", city: "Agde", km: 22000, joined_year: 2024, avatar_url: null, bio: null, role: "member" },
];

export type DemoPost = {
  id: string;
  user_id: string;
  pseudo: string;
  content: string;
  image_url: string | null;
  created_at: string;
  like_count: number;
  comment_count: number;
  liked_by_me: boolean;
};

export const demoPosts: DemoPost[] = [
  {
    id: "p1",
    user_id: "m2",
    pseudo: "Sophie",
    content:
      "Magnifique balade au Salagou ce matin ! 14 motos au départ, soleil, virages propres, et café au Vailhan à 11h. Merci à tous d'avoir respecté les distances dans les virages 🔥",
    image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date(Date.now() - 86_400_000 * 1).toISOString(),
    like_count: 23,
    comment_count: 7,
    liked_by_me: true,
  },
  {
    id: "p2",
    user_id: "m3",
    pseudo: "Marco",
    content:
      "Rappel : la balade du Téléthon est ouverte aux inscriptions ! On vise 50 motards cette année. Lien sur la page /telethon. Dons reversés à 100% à l'AFM. ❤️",
    image_url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date(Date.now() - 86_400_000 * 3).toISOString(),
    like_count: 41,
    comment_count: 12,
    liked_by_me: false,
  },
  {
    id: "p3",
    user_id: "m4",
    pseudo: "Lina",
    content:
      "Question méca : ma Monster fait un bruit bizarre côté embrayage à froid, ça part après 1 min. Quelqu'un a déjà eu le coup ? Atelier samedi possible ?",
    image_url: null,
    created_at: new Date(Date.now() - 86_400_000 * 5).toISOString(),
    like_count: 4,
    comment_count: 18,
    liked_by_me: false,
  },
  {
    id: "p4",
    user_id: "demo-user",
    pseudo: "Cédric",
    content:
      "Sortie de mardi annulée — météo trop pourrie sur les Cévennes. On reporte au samedi 7 juin, même point de RDV. Stay tuned 🏍️",
    image_url: null,
    created_at: new Date(Date.now() - 86_400_000 * 7).toISOString(),
    like_count: 18,
    comment_count: 3,
    liked_by_me: false,
  },
  {
    id: "p5",
    user_id: "m5",
    pseudo: "Tonio",
    content:
      "Première sortie en Harley Fat Boy ce week-end avec le club. Accueil au top, merci les gars. Vous m'avez convaincu, je reste 👊",
    image_url: "https://images.unsplash.com/photo-1591216105468-f02e4c93cc05?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date(Date.now() - 86_400_000 * 10).toISOString(),
    like_count: 32,
    comment_count: 9,
    liked_by_me: true,
  },
];

export type DemoMessage = {
  id: string;
  channel_id: string;
  user_id: string;
  pseudo: string;
  content: string;
  created_at: string;
};

export const demoChannels = [
  { id: "c1", slug: "general", name: "général", description: "Discussions ouvertes" },
  { id: "c2", slug: "sorties", name: "sorties", description: "Organiser les balades" },
  { id: "c3", slug: "meca", name: "mécanique", description: "Entraide technique, pièces, tutos" },
  { id: "c4", slug: "annonces", name: "annonces", description: "Officiel" },
  { id: "c5", slug: "off-topic", name: "off-topic", description: "Hors moto" },
];

export const demoMessagesByChannel: Record<string, DemoMessage[]> = {
  c1: [
    { id: "msg1", channel_id: "c1", user_id: "m2", pseudo: "Sophie", content: "Hello la team !", created_at: new Date(Date.now() - 3_600_000 * 4).toISOString() },
    { id: "msg2", channel_id: "c1", user_id: "m3", pseudo: "Marco", content: "Salut Sophie, prête pour dimanche ?", created_at: new Date(Date.now() - 3_600_000 * 3.5).toISOString() },
    { id: "msg3", channel_id: "c1", user_id: "m2", pseudo: "Sophie", content: "Toujours partante !", created_at: new Date(Date.now() - 3_600_000 * 3.4).toISOString() },
    { id: "msg4", channel_id: "c1", user_id: "demo-user", pseudo: "Cédric", content: "RDV 8h45 au café du marché, briefing court puis départ 9h.", created_at: new Date(Date.now() - 3_600_000 * 2).toISOString() },
    { id: "msg5", channel_id: "c1", user_id: "m4", pseudo: "Lina", content: "Reçu chef 🫡", created_at: new Date(Date.now() - 3_600_000 * 1.5).toISOString() },
    { id: "msg6", channel_id: "c1", user_id: "m7", pseudo: "Karim", content: "Je rejoins direct au Salagou, j'arrive de Nîmes", created_at: new Date(Date.now() - 3_600_000 * 1).toISOString() },
    { id: "msg7", channel_id: "c1", user_id: "demo-user", pseudo: "Cédric", content: "Nickel Karim. À demain tout le monde ✊", created_at: new Date(Date.now() - 3_600_000 * 0.5).toISOString() },
  ],
  c2: [
    { id: "ms1", channel_id: "c2", user_id: "m2", pseudo: "Sophie", content: "Idée pour juin : balade Pic Saint-Loup + apéro au domaine ?", created_at: new Date(Date.now() - 86_400_000 * 2).toISOString() },
    { id: "ms2", channel_id: "c2", user_id: "demo-user", pseudo: "Cédric", content: "+1, je connais un caveau qui nous accueille parfait", created_at: new Date(Date.now() - 86_400_000 * 2 + 3_600_000).toISOString() },
    { id: "ms3", channel_id: "c2", user_id: "m5", pseudo: "Tonio", content: "Je propose le 14 juin, je suis off ce week-end", created_at: new Date(Date.now() - 86_400_000).toISOString() },
  ],
  c3: [
    { id: "mc1", channel_id: "c3", user_id: "m4", pseudo: "Lina", content: "Quelqu'un connaît un bon préparateur Ducati sur Montpellier ?", created_at: new Date(Date.now() - 86_400_000 * 4).toISOString() },
    { id: "mc2", channel_id: "c3", user_id: "m3", pseudo: "Marco", content: "Moto Sud à Lattes, ils sont sérieux", created_at: new Date(Date.now() - 86_400_000 * 4 + 7_200_000).toISOString() },
  ],
  c4: [
    { id: "ma1", channel_id: "c4", user_id: "demo-user", pseudo: "Cédric", content: "📢 Renouvellement adhésion : merci de mettre à jour vos infos dans /profile avant le 30 mai.", created_at: new Date(Date.now() - 86_400_000 * 6).toISOString() },
  ],
  c5: [
    { id: "mo1", channel_id: "c5", user_id: "m8", pseudo: "Patou", content: "Vu un super docu sur Steve McQueen hier, je le partage si ça intéresse", created_at: new Date(Date.now() - 86_400_000 * 1).toISOString() },
  ],
};

export type DemoEvent = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  location: string | null;
  distance_km: number | null;
  level: string;
  cover_image_url: string | null;
  going_count: number;
  photo_count?: number;
  my_status: string | null;
};

// ---------- Past outings (Sorties passées) ----------

export type DemoPastOuting = {
  id: string;
  title: string;
  date: string; // ISO date YYYY-MM-DD
  year: number;
  location: string | null;
  distance_km: number | null;
  cover_image_url: string | null;
  photo_count: number;
  going_count: number;
  description: string | null;
  source: "event" | "submission";
  pseudo?: string;
  level?: string | null;
};

export const demoPastOutings: DemoPastOuting[] = [
  // ── 2026 ──
  {
    id: "past-1",
    title: "Balade printanière — Gorges de l'Hérault",
    date: "2026-04-20",
    year: 2026,
    location: "Saint-Guilhem-le-Désert",
    distance_km: 110,
    cover_image_url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop",
    photo_count: 14,
    going_count: 16,
    description: "Grande balade de printemps sur les gorges, café en terrasse et retour par Aniane.",
    source: "event",
    level: "Facile",
  },
  {
    id: "past-2",
    title: "Route des Cistes — Pic Saint-Loup",
    date: "2026-03-15",
    year: 2026,
    location: "Ganges → Saint-Martin-de-Londres",
    distance_km: 80,
    cover_image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
    photo_count: 7,
    going_count: 11,
    description: null,
    source: "event",
    level: "Facile",
  },
  {
    id: "past-3",
    title: "Première sortie 2026 — Lac du Salagou",
    date: "2026-01-26",
    year: 2026,
    location: "Lac du Salagou — boucle",
    distance_km: 60,
    cover_image_url: "https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f?q=80&w=1200&auto=format&fit=crop",
    photo_count: 22,
    going_count: 20,
    description: "Tradition : la première sortie de l'année au Salagou. 20 motos au départ.",
    source: "submission",
    pseudo: "Sophie",
    level: null,
  },
  // ── 2025 ──
  {
    id: "past-4",
    title: "🎗 Téléthon 2025 — Balade caritative",
    date: "2025-12-06",
    year: 2025,
    location: "Boucle caritative — 100 km",
    distance_km: 100,
    cover_image_url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
    photo_count: 38,
    going_count: 47,
    description: "47 motards pour la bonne cause. Record du club.",
    source: "event",
    level: "Facile",
  },
  {
    id: "past-5",
    title: "Road-trip d'été — Gorges du Verdon",
    date: "2025-07-12",
    year: 2025,
    location: "Castellane → Moustiers-Sainte-Marie",
    distance_km: 200,
    cover_image_url: "https://images.unsplash.com/photo-1591216105468-f02e4c93cc05?q=80&w=1200&auto=format&fit=crop",
    photo_count: 52,
    going_count: 15,
    description: "Deux jours de route, un bivouac au bord de l'eau. Inoubliable.",
    source: "event",
    level: "Confirmé",
  },
  {
    id: "past-6",
    title: "Week-end Pyrénées — Andorre",
    date: "2025-06-20",
    year: 2025,
    location: "Foix → Andorre-la-Vieille",
    distance_km: 380,
    cover_image_url: null,
    photo_count: 29,
    going_count: 12,
    description: null,
    source: "submission",
    pseudo: "Marco",
    level: null,
  },
  {
    id: "past-7",
    title: "Sortie Cévennes — Mont Aigoual",
    date: "2025-04-05",
    year: 2025,
    location: "Route → Meyrueis → Aigoual",
    distance_km: 310,
    cover_image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
    photo_count: 18,
    going_count: 14,
    description: "Mont Aigoual depuis Ganges — une classique.",
    source: "event",
    level: "Intermédiaire",
  },
  // ── 2024 ──
  {
    id: "past-8",
    title: "🎗 Téléthon 2024",
    date: "2024-12-07",
    year: 2024,
    location: "Boucle caritative — 100 km",
    distance_km: 100,
    cover_image_url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
    photo_count: 41,
    going_count: 39,
    description: null,
    source: "event",
    level: "Facile",
  },
  {
    id: "past-9",
    title: "Grande Traversée de l'Hérault",
    date: "2024-08-18",
    year: 2024,
    location: "Montpellier → Saint-Pons-de-Thomières",
    distance_km: 150,
    cover_image_url: "https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f?q=80&w=1200&auto=format&fit=crop",
    photo_count: 33,
    going_count: 18,
    description: null,
    source: "submission",
    pseudo: "Karim",
    level: null,
  },
  {
    id: "past-10",
    title: "Printemps mécanique + balade",
    date: "2024-03-24",
    year: 2024,
    location: "Garage Tonio + Route du Salagou",
    distance_km: 55,
    cover_image_url: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1200&auto=format&fit=crop",
    photo_count: 8,
    going_count: 10,
    description: "Atelier chaîne et freins le matin, balade légère l'après-midi.",
    source: "event",
    level: "Tous niveaux",
  },
  // ── 2023 ──
  {
    id: "past-11",
    title: "🎗 Téléthon 2023",
    date: "2023-12-02",
    year: 2023,
    location: "Boucle caritative — 100 km",
    distance_km: 100,
    cover_image_url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
    photo_count: 36,
    going_count: 35,
    description: null,
    source: "event",
    level: "Facile",
  },
  {
    id: "past-12",
    title: "Road-trip Espagne — Costa Brava",
    date: "2023-09-08",
    year: 2023,
    location: "Gérone → Barcelone → retour",
    distance_km: 620,
    cover_image_url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop",
    photo_count: 61,
    going_count: 8,
    description: "3 jours en Espagne. La meilleure sortie de l'année selon le vote du club.",
    source: "event",
    level: "Confirmé",
  },
];

export type DemoRideSubmission = {
  id: string;
  title: string;
  description: string | null;
  ride_date: string;
  location: string | null;
  distance_km: number | null;
  cover_image_url: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  pseudo?: string;
};

export const demoPendingSubmissions: DemoRideSubmission[] = [
  {
    id: "sub-pending-1",
    title: "Virée nocturne — bords de Thau",
    description: "Sortie improvisée à la pleine lune, étang de Thau au clair de lune. Mémorable.",
    ride_date: "2026-04-10",
    location: "Sète → Marseillan",
    distance_km: 45,
    cover_image_url: null,
    status: "pending",
    created_at: new Date(Date.now() - 86_400_000 * 2).toISOString(),
    pseudo: "Patou",
  },
  {
    id: "sub-pending-2",
    title: "Retour de Barcelone solo",
    description: "Parti seul, rentré avec des souvenirs plein le casque et 800 km dans les pattes.",
    ride_date: "2026-02-14",
    location: "Barcelone → Montpellier",
    distance_km: 310,
    cover_image_url: "https://images.unsplash.com/photo-1591216105468-f02e4c93cc05?q=80&w=1200&auto=format&fit=crop",
    status: "pending",
    created_at: new Date(Date.now() - 86_400_000 * 5).toISOString(),
    pseudo: "Lina",
  },
];

export const demoEvents: DemoEvent[] = [
  {
    id: "ev1",
    title: "Balade entre filles — Lac du Salagou",
    description: "Sortie réservée aux motardes. Départ tranquille, pause photo et déj au bord du lac.",
    starts_at: new Date(Date.now() + 86_400_000 * 12).toISOString(),
    location: "Lac du Salagou — boucle",
    distance_km: 60,
    level: "Facile",
    cover_image_url: "https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f?q=80&w=1400&auto=format&fit=crop",
    going_count: 12,
    my_status: null,
  },
  {
    id: "ev2",
    title: "Sortie dominicale — Cirque de Mourèze",
    description: "Petit-déj' au café du marché à 8h, départ 9h.",
    starts_at: new Date(Date.now() + 86_400_000 * 26).toISOString(),
    location: "Départ place de la Mairie",
    distance_km: 90,
    level: "Facile",
    cover_image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1400&auto=format&fit=crop",
    going_count: 18,
    my_status: "going",
  },
  {
    id: "ev3",
    title: "Atelier mécanique — chaîne, pneus, freins",
    description: "Apportez vos bécanes, on contrôle ensemble avant la saison.",
    starts_at: new Date(Date.now() + 86_400_000 * 40).toISOString(),
    location: "Garage de Tonio, Béziers",
    distance_km: null,
    level: "Tous niveaux",
    cover_image_url: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1400&auto=format&fit=crop",
    going_count: 8,
    my_status: null,
  },
  {
    id: "ev4",
    title: "Road-trip week-end — Mont Aigoual & Cévennes",
    description: "2 jours, 1 nuit en gîte. Cols, lacets, vues. 350 km au total.",
    starts_at: new Date(Date.now() + 86_400_000 * 60).toISOString(),
    location: "Route → Meyrueis (Cévennes)",
    distance_km: 350,
    level: "Confirmé",
    cover_image_url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1400&auto=format&fit=crop",
    going_count: 14,
    my_status: null,
  },
  {
    id: "ev5",
    title: "🎗 Téléthon — Balade caritative",
    description: "Notre rendez-vous annuel. Inscription libre, dons reversés à 100% à l'AFM-Téléthon.",
    starts_at: new Date(Date.UTC(new Date().getFullYear(), 11, 5, 9, 0)).toISOString(),
    location: "Boucle caritative — 100 km",
    distance_km: 100,
    level: "Facile",
    cover_image_url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1400&auto=format&fit=crop",
    going_count: 42,
    my_status: "going",
  },
];
