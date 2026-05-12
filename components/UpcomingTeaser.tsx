"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, ArrowUpRight, Calendar } from "lucide-react";

const upcoming = [
  {
    date: "24",
    month: "MAI",
    title: "Balade entre filles",
    where: "Salagou — boucle 60 km",
    riders: 12,
    level: "Facile",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1400&auto=format&fit=crop",
  },
  {
    date: "07",
    month: "JUIN",
    title: "Sortie dominicale",
    where: "Cirque de Mourèze",
    riders: 18,
    level: "Facile",
    img: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?q=80&w=1400&auto=format&fit=crop",
  },
  {
    date: "05",
    month: "DÉC",
    title: "Téléthon · caritatif",
    where: "Boucle 100 km · dons AFM",
    riders: 42,
    level: "Caritatif",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function UpcomingTeaser() {
  return (
    <section className="relative paper-bg py-32">
      <div className="mx-auto mb-16 max-w-7xl px-5 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-12 bg-flame-500" />
              <span className="font-mono text-xs uppercase tracking-widest2 text-flame-400">
                Chapitre 04 · Programme
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-bone-50">
              Prochaines <br />
              <span className="editorial text-flame-400">sorties</span>
              <span className="text-flame-500">.</span>
            </h2>
          </div>
          <Link href="/events" className="btn-ghost self-start lg:self-end">
            <Calendar className="h-4 w-4" /> Tout le calendrier
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          {upcoming.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative overflow-hidden bg-midnight-700 transition-all hover:-translate-y-1"
            >
              {/* Hero image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${e.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-700 via-transparent to-transparent" />
                {/* Floating date badge */}
                <div className="absolute left-4 top-4 bg-bone-50 px-3 py-2 text-ink-950 shadow-lg">
                  <div className="font-display text-3xl leading-none">{e.date}</div>
                  <div className="text-center font-mono text-[9px] uppercase tracking-widest2 text-flame-700">
                    {e.month}
                  </div>
                </div>
                {/* Level chip */}
                <div className="absolute right-4 top-4 chip border-bone-50/40 bg-ink-950/60 text-bone-50">
                  {e.level}
                </div>
              </div>
              {/* Bottom content */}
              <div className="p-5">
                <h3 className="font-display text-2xl tracking-wide text-bone-50">{e.title}</h3>
                <p className="mt-2 flex items-center gap-2 font-editorial italic text-sm text-bone-50/70">
                  <MapPin className="h-3 w-3 text-flame-400" /> {e.where}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-bone-50/10 pt-3 text-sm">
                  <span className="flex items-center gap-1.5 text-bone-50/60">
                    <Users className="h-3.5 w-3.5 text-flame-400" /> {e.riders} inscrits
                  </span>
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest2 text-flame-400 transition-transform group-hover:translate-x-1"
                  >
                    S'inscrire <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
