import { Calendar, MapPin, Users } from "lucide-react";

export const metadata = { title: "Sorties · MCT2000" };

const events = [
  {
    date: "2026-05-18",
    title: "Sortie matinale — Gorges du Verdon",
    where: "Castellane → Moustiers-Sainte-Marie",
    distance: "180 km",
    level: "Facile",
    riders: 14,
  },
  {
    date: "2026-05-25",
    title: "Atelier mécanique — chaîne & pignons",
    where: "Atelier Marc, Lyon 7e",
    distance: "—",
    level: "Tous niveaux",
    riders: 8,
  },
  {
    date: "2026-06-01",
    title: "Road-trip — Col de la Bonette",
    where: "Saint-Étienne-de-Tinée → Jausiers",
    distance: "260 km",
    level: "Intermédiaire",
    riders: 22,
  },
  {
    date: "2026-06-14",
    title: "Sortie de nuit — pleine lune",
    where: "Départ Vieux-Lyon 22h",
    distance: "120 km",
    level: "Confirmé",
    riders: 11,
  },
  {
    date: "2026-07-04",
    title: "Week-end Pyrénées",
    where: "Tarbes → Andorre",
    distance: "650 km",
    level: "Confirmé",
    riders: 18,
  },
];

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="mb-10">
        <div className="chip mb-3">Calendrier</div>
        <h1 className="heading text-6xl">Les sorties à venir.</h1>
        <p className="mt-3 max-w-xl text-white/60">
          Inscris-toi en un clic. Briefing GPX envoyé 48h avant la sortie. Météo et itinéraire mis à
          jour en temps réel.
        </p>
      </div>

      <div className="space-y-4">
        {events.map((e) => {
          const d = new Date(e.date);
          return (
            <article
              key={e.title}
              className="group grid items-center gap-6 rounded-2xl border border-white/10 bg-ink-900/60 p-5 transition-all hover:border-flame-500/40 md:grid-cols-[120px_1fr_auto]"
            >
              <div className="text-center">
                <div className="heading text-5xl gradient-text">{d.getDate()}</div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {d.toLocaleDateString("fr-FR", { month: "short" })}
                </div>
                <div className="text-[10px] text-white/30">{d.getFullYear()}</div>
              </div>
              <div>
                <h3 className="heading text-2xl tracking-wide">{e.title}</h3>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {e.where}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {e.distance}</span>
                  <span className="chip">{e.level}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1.5 text-sm text-white/60">
                  <Users className="h-3.5 w-3.5" /> {e.riders} inscrits
                </div>
                <button className="btn-primary px-5 py-2 text-sm">S'inscrire</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
