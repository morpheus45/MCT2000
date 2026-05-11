import { Mountain, Clock, Route } from "lucide-react";

export const metadata = { title: "Itinéraires · MCT2000" };

const rides = [
  {
    title: "Le Galibier en boucle",
    region: "Hautes-Alpes",
    distance: 220,
    duration: "5h",
    level: "Confirmé",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Route des Crêtes — Vosges",
    region: "Vosges",
    distance: 130,
    duration: "3h",
    level: "Facile",
    img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Corniche d'Or",
    region: "Côte d'Azur",
    distance: 80,
    duration: "2h",
    level: "Facile",
    img: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Tour du Mont Aigoual",
    region: "Cévennes",
    distance: 175,
    duration: "4h30",
    level: "Intermédiaire",
    img: "https://images.unsplash.com/photo-1474401869869-9fe17f9b0a6f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Cols Pyrénéens",
    region: "Pyrénées",
    distance: 320,
    duration: "8h",
    level: "Confirmé",
    img: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Forêt de Brocéliande",
    region: "Bretagne",
    distance: 95,
    duration: "2h30",
    level: "Facile",
    img: "https://images.unsplash.com/photo-1502980426475-b83966705988?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function RidesPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <div className="chip mb-3">Bibliothèque</div>
        <h1 className="heading text-6xl">Les routes du club.</h1>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rides.map((r) => (
          <article
            key={r.title}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 transition-all hover:-translate-y-1 hover:border-flame-500/40"
          >
            <div
              className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${r.img})` }}
            />
            <div className="p-5">
              <div className="chip mb-2"><Mountain className="h-3 w-3" /> {r.region}</div>
              <h3 className="heading text-2xl">{r.title}</h3>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Route className="h-3.5 w-3.5" /> {r.distance} km</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {r.duration}</span>
                <span className="chip">{r.level}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
