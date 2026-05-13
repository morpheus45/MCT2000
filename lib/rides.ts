// Real motorcycle routes in the South of France.
// All images are verified motorcycle photographs from Unsplash.
// Coordinates are approximate centers of the route — used for the map markers.
export type Ride = {
  id: string;
  title: string;
  region: string;
  distance_km: number;
  duration: string;
  level: "Facile" | "Intermédiaire" | "Confirmé";
  description: string;
  highlights: string[];
  img: string;
  lat: number;
  lon: number;
};

// Curated verified motorcycle photos — used cyclically below.
const MOTO = {
  silhouetteSunset: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1400&auto=format&fit=crop",
  cafeRacer: "https://images.unsplash.com/photo-1591216105468-f02e4c93cc05?q=80&w=1400&auto=format&fit=crop",
  rider: "https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f?q=80&w=1400&auto=format&fit=crop",
  group: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1400&auto=format&fit=crop",
  chrome: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1400&auto=format&fit=crop",
  sportBike: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1400&auto=format&fit=crop",
  nakedBike: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1400&auto=format&fit=crop",
  ktm: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=1400&auto=format&fit=crop",
  harley: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1400&auto=format&fit=crop",
  workshop: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1400&auto=format&fit=crop",
};

export const rides: Ride[] = [
  {
    id: "salagou",
    title: "Boucle du Lac du Salagou",
    region: "Hérault — 15 min du club",
    distance_km: 45,
    duration: "1h30",
    level: "Facile",
    description:
      "La boucle iconique du club. Couleur rouge ocre des ruffes, eau turquoise, virolos amples — parfait pour mettre les nouveaux à l'aise.",
    highlights: ["Lacoste", "Liausson", "Octon", "Salasc"],
    img: MOTO.silhouetteSunset,
    lat: 43.6505,
    lon: 3.3603,
  },
  {
    id: "moureze",
    title: "Cirque de Mourèze",
    region: "Hérault — 10 min du club",
    distance_km: 30,
    duration: "1h",
    level: "Facile",
    description:
      "Le chaos dolomitique de Mourèze. Route sinueuse à travers les rochers, village médiéval au pied du cirque. Photo obligatoire devant le Cube.",
    highlights: ["Mourèze village", "Chaos rocheux", "Sentier des aiguilles"],
    img: MOTO.cafeRacer,
    lat: 43.6244,
    lon: 3.3675,
  },
  {
    id: "navacelles",
    title: "Cirque de Navacelles",
    region: "Gard — 1h du club",
    distance_km: 140,
    duration: "3h30",
    level: "Intermédiaire",
    description:
      "Grand Site de France. Route en lacets serrés vers le belvédère, descente vertigineuse au fond du cirque par Blandas. Pas pour le vendredi soir en short.",
    highlights: ["Belvédère de Blandas", "Descente sur Saint-Maurice-Navacelles", "Causse de Blandas"],
    img: MOTO.rider,
    lat: 43.8893,
    lon: 3.5095,
  },
  {
    id: "saint-guilhem",
    title: "Gorges de l'Hérault & Saint-Guilhem",
    region: "Hérault — 30 min du club",
    distance_km: 75,
    duration: "2h",
    level: "Facile",
    description:
      "Pont du Diable, abbaye UNESCO, Grottes de Clamouse. Une des plus belles routes du sud — ombragée, fluide, paysages de carte postale.",
    highlights: ["Pont du Diable", "Saint-Guilhem-le-Désert", "Grottes de Clamouse", "Aniane"],
    img: MOTO.group,
    lat: 43.7333,
    lon: 3.55,
  },
  {
    id: "mont-aigoual",
    title: "Mont Aigoual & Cévennes",
    region: "Gard — 1h30 du club",
    distance_km: 220,
    duration: "5h",
    level: "Confirmé",
    description:
      "Le toit des Cévennes. Cols, lacets, vues à 360° par temps clair. Météo capricieuse — on regarde le ciel avant de partir.",
    highlights: ["Col de Perjuret", "Observatoire du Mont Aigoual", "Causse Méjean", "Meyrueis"],
    img: MOTO.chrome,
    lat: 44.1219,
    lon: 3.5811,
  },
  {
    id: "pic-saint-loup",
    title: "Pic Saint-Loup",
    region: "Hérault — 1h du club",
    distance_km: 95,
    duration: "2h30",
    level: "Facile",
    description:
      "Le pic emblématique au-dessus de Montpellier. Vignobles, routes propres, virages amples. Termine par un verre à Saint-Mathieu-de-Tréviers.",
    highlights: ["Cazevieille", "Notre-Dame-de-Londres", "Vignobles AOC"],
    img: MOTO.sportBike,
    lat: 43.7811,
    lon: 3.8123,
  },
  {
    id: "larzac",
    title: "Causse du Larzac & Cirque de Labeil",
    region: "Aveyron — 1h du club",
    distance_km: 160,
    duration: "4h",
    level: "Intermédiaire",
    description:
      "Plateau immense, vent dans le casque, sensation d'infini. Détour par Le Caylar et son chêne vert millénaire, descente sur Lodève par la D9 (perle de virages).",
    highlights: ["Le Caylar", "Cirque de Labeil", "Descente de la Pas de l'Escalette"],
    img: MOTO.nakedBike,
    lat: 43.8525,
    lon: 3.3208,
  },
  {
    id: "mer",
    title: "Mer & étangs — Sète et Marseillan",
    region: "Hérault — 45 min du club",
    distance_km: 110,
    duration: "2h30",
    level: "Facile",
    description:
      "Cap sur la Méditerranée par les vignobles. Sète et son port, plages du Lido, étangs de Thau. Pause huîtres à Bouzigues — la balade favorite du dimanche.",
    highlights: ["Sète", "Étang de Thau", "Marseillan-Plage", "Bouzigues"],
    img: MOTO.harley,
    lat: 43.4042,
    lon: 3.6967,
  },
];

// Center of the map = Languedoc region
export const clubBase = {
  name: "Moto Club MCT 2000",
  city: "Languedoc",
  lat: 43.6258,
  lon: 3.4422,
};
