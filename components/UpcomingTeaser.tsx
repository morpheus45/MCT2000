"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

const upcoming = [
  {
    date: "24 mai",
    title: "Balade entre filles — Lac du Salagou",
    where: "Clermont-l'Hérault → Salagou (boucle)",
    riders: 12,
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
  },
  {
    date: "7 juin",
    title: "Sortie dominicale — Cirque de Mourèze",
    where: "Départ place de la Mairie, 9h",
    riders: 18,
    img: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?q=80&w=1200&auto=format&fit=crop",
  },
  {
    date: "5 déc.",
    title: "Téléthon — balade caritative",
    where: "Clermont-l'Hérault, dons AFM",
    riders: 42,
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function UpcomingTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="chip mb-4">Prochaines sorties</div>
          <h2 className="heading text-5xl md:text-6xl">À l'affiche.</h2>
        </div>
        <Link href="/events" className="btn-ghost">Voir tout le calendrier</Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {upcoming.map((e, i) => (
          <motion.article
            key={e.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800"
          >
            <div
              className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${e.img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
            <div className="absolute left-4 top-4 chip bg-flame-500/80 text-black border-0">
              <Calendar className="h-3 w-3" /> {e.date}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="heading text-2xl text-white">{e.title}</h3>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/70">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.where}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {e.riders} inscrits</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
