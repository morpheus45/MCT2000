// Real motorcycle routes of the MCT 2000 club — Languedoc, France.
// waypoints = [lat, lon][] — drawn as polyline on the Leaflet map.
// All images are verified motorcycle-only photos from Unsplash.

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
  lat: number;  // map label anchor (centre of route)
  lon: number;
  waypoints: [number, number][]; // polyline path [lat, lon]
  color?: string; // optional custom polyline color
};

const MOTO = {
  silhouetteSunset: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1400&auto=format&fit=crop",
  cafeRacer:        "https://images.unsplash.com/photo-1591216105468-f02e4c93cc05?q=80&w=1400&auto=format&fit=crop",
  rider:            "https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f?q=80&w=1400&auto=format&fit=crop",
  group:            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1400&auto=format&fit=crop",
  chrome:           "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1400&auto=format&fit=crop",
  sportBike:        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1400&auto=format&fit=crop",
  nakedBike:        "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1400&auto=format&fit=crop",
  harley:           "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1400&auto=format&fit=crop",
  workshop:         "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1400&auto=format&fit=crop",
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
      "La boucle iconique du club. Couleur rouge ocre des ruffes, eau turquoise, virages amples — parfait pour mettre les nouveaux à l'aise. Départ : Allées Salengro, Clermont-l'Hérault.",
    highlights: ["Lacoste", "Liausson", "Octon", "Salasc", "Villeneuvette"],
    img: MOTO.silhouetteSunset,
    lat: 43.660,
    lon: 3.355,
    waypoints: [
      [43.6271, 3.4403], // Clermont-l'Hérault
      [43.6404, 3.4056], // D156E sortie lac
      [43.6530, 3.3900], // Liausson
      [43.6680, 3.3395], // Octon
      [43.6755, 3.3148], // rive ouest
      [43.6510, 3.3060], // Salasc
      [43.6244, 3.3254], // Mourèze embranchement
      [43.6040, 3.4110], // Villeneuvette
      [43.6271, 3.4403], // retour Clermont
    ],
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
    waypoints: [
      [43.6271, 3.4403], // Clermont-l'Hérault
      [43.6040, 3.4110], // Villeneuvette
      [43.6244, 3.3675], // Mourèze
      [43.6038, 3.3814], // Vieussan dir.
      [43.6271, 3.4403], // retour
    ],
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
    lat: 43.889,
    lon: 3.510,
    waypoints: [
      [43.6271, 3.4403], // Clermont-l'Hérault
      [43.7319, 3.3206], // Lodève
      [43.8074, 3.4033], // Le Bosc
      [43.8658, 3.4940], // Pégairolles-de-l'Escalette
      [43.9218, 3.5536], // Blandas
      [43.8893, 3.5095], // Cirque de Navacelles
      [43.8648, 3.5043], // Saint-Maurice-Navacelles
      [43.9358, 3.7068], // Ganges
      [43.7333, 3.5500], // Saint-Guilhem (retour)
      [43.6271, 3.4403], // Clermont
    ],
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
    lat: 43.730,
    lon: 3.557,
    waypoints: [
      [43.6271, 3.4403], // Clermont-l'Hérault
      [43.6540, 3.5544], // Gignac
      [43.6700, 3.5800], // Aniane
      [43.6944, 3.5783], // Grottes de Clamouse
      [43.7130, 3.5683], // Pont du Diable
      [43.7333, 3.5500], // Saint-Guilhem-le-Désert
      [43.7130, 3.5683], // retour pont
      [43.6540, 3.5544], // Gignac
      [43.6271, 3.4403], // Clermont
    ],
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
    lat: 44.122,
    lon: 3.581,
    waypoints: [
      [43.6271, 3.4403], // Clermont-l'Hérault
      [43.9358, 3.7068], // Ganges
      [43.9929, 3.6062], // Le Vigan
      [43.9773, 3.5427], // Col du Minier
      [44.1219, 3.5811], // Mont Aigoual
      [44.1797, 3.4272], // Meyrueis
      [44.2189, 3.5594], // Col de Perjuret
      [44.3241, 3.5906], // Florac
      [44.1797, 3.4272], // Meyrueis retour
      [43.7319, 3.3206], // Lodève
      [43.6271, 3.4403], // Clermont
    ],
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
    lat: 43.781,
    lon: 3.812,
    waypoints: [
      [43.6271, 3.4403], // Clermont-l'Hérault
      [43.6540, 3.5544], // Gignac
      [43.6608, 3.8767], // Montpellier (contournement N)
      [43.7397, 3.8486], // Cazevieille
      [43.7811, 3.8123], // Pic Saint-Loup
      [43.8211, 3.7739], // Notre-Dame-de-Londres
      [43.7719, 3.8555], // Saint-Mathieu-de-Tréviers
      [43.6608, 3.8767], // retour Montpellier
      [43.6271, 3.4403], // Clermont
    ],
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
    lat: 43.852,
    lon: 3.321,
    waypoints: [
      [43.6271, 3.4403], // Clermont-l'Hérault
      [43.7319, 3.3206], // Lodève
      [43.8525, 3.3208], // Cirque de Labeil
      [43.8658, 3.3197], // Le Caylar
      [43.9011, 3.2558], // La Couvertoirade
      [43.9858, 3.0764], // L'Hospitalet-du-Larzac dir.
      [43.8658, 3.3197], // Le Caylar retour
      [43.7319, 3.3206], // descente Lodève
      [43.6271, 3.4403], // Clermont
    ],
  },
  {
    id: "mer",
    title: "Mer & Étangs — Sète et Marseillan",
    region: "Hérault — 45 min du club",
    distance_km: 110,
    duration: "2h30",
    level: "Facile",
    description:
      "Cap sur la Méditerranée par les vignobles. Sète et son port, plages du Lido, étangs de Thau. Pause huîtres à Bouzigues — la balade favorite du dimanche.",
    highlights: ["Sète", "Étang de Thau", "Marseillan-Plage", "Bouzigues"],
    img: MOTO.harley,
    lat: 43.404,
    lon: 3.697,
    waypoints: [
      [43.6271, 3.4403], // Clermont-l'Hérault
      [43.4590, 3.4225], // Pézenas
      [43.3106, 3.4754], // Agde
      [43.2793, 3.5059], // Cap d'Agde
      [43.4042, 3.6967], // Sète
      [43.4231, 3.5884], // Bouzigues
      [43.3167, 3.5500], // Marseillan-Plage
      [43.4590, 3.4225], // Pézenas retour
      [43.6271, 3.4403], // Clermont
    ],
  },
];

// Club headquarters — Maison Louis Blanc, 14 rue Louis Blanc, 34800 Clermont-l'Hérault
export const clubBase = {
  name: "Moto Club Tourisme 2000",
  city: "Clermont-l'Hérault (34)",
  address: "Maison Louis Blanc, 14 rue Louis Blanc",
  lat: 43.6271,
  lon: 3.4403,
};

// Polyline color palette per route (flame orange shades)
export const ROUTE_COLORS = [
  "#ff5410", // flame
  "#e8732a", // amber-orange
  "#f5a623", // brass
  "#c72b07", // blood
  "#ff7847", // coral
  "#d4380d", // burnt
  "#ffa040", // warm amber
  "#e85d04", // deep orange
];
