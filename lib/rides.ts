// Real motorcycle routes around Clermont-l'Hérault, Languedoc.
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
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1400&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1502980426475-b83966705988?q=80&w=1400&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1474401869869-9fe17f9b0a6f?q=80&w=1400&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1400&auto=format&fit=crop",
    lat: 43.7333,
    lon: 3.5500,
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
    img: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=1400&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1400&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?q=80&w=1400&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1400&auto=format&fit=crop",
    lat: 43.4042,
    lon: 3.6967,
  },
];

// Center of the map = Clermont-l'Hérault
export const clubBase = {
  name: "Moto Club MCT 2000",
  city: "Clermont-l'Hérault",
  lat: 43.6258,
  lon: 3.4422,
};
