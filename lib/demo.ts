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
  going_count: number;
  my_status: string | null;
};

export const demoEvents: DemoEvent[] = [
  {
    id: "ev1",
    title: "Balade entre filles — Lac du Salagou",
    description: "Sortie réservée aux motardes. Départ tranquille, pause photo et déj au bord du lac.",
    starts_at: new Date(Date.now() + 86_400_000 * 12).toISOString(),
    location: "Lac du Salagou — boucle",
    distance_km: 60,
    level: "Facile",
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
    going_count: 42,
    my_status: "going",
  },
];
