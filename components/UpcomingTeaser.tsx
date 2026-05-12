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
    title: "Téléthon · balade caritative",
    where: "Boucle 100 km · dons AFM",
    riders: 42,
    level: "Caritatif",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function UpcomingTeaser() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 -z-10 midnight-bg" />

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

      {/* Editorial film-strip layout */}
      <div className="mx-auto max-w-7xl px-5 lg:px-12">
        <div className="space-y-6">
          {upcoming.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative grid grid-cols-1 overflow-hidden border border-bone-50/10 bg-midnight-900/60 transition-all hover:border-flame-500/40 md:grid-cols-[200px_1fr] md:items-stretch"
            >
              {/* Date column */}
              <div className="relative flex flex-col items-center justify-center bg-midnight-700/50 p-8 md:p-6">
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-flame-500 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="brass-text font-display text-7xl leading-none">{e.date}</div>
                <div className="mt-2 font-mono text-xs uppercase tracking-widest2 text-bone-50/60">{e.month}</div>
              </div>

              {/* Visual + content */}
              <div className="relative grid md:grid-cols-[1fr_320px]">
                <div className="p-8 md:p-10">
                  <span className="chip">{e.level}</span>
                  <h3 className="mt-4 font-display text-3xl tracking-wide text-bone-50 md:text-4xl">
                    {e.title}
                  </h3>
                  <p className="mt-3 flex items-center gap-2 font-editorial italic text-bone-50/70">
                    <MapPin className="h-3.5 w-3.5 text-flame-400" /> {e.where}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                    <span className="flex items-center gap-2 text-bone-50/60">
                      <Users className="h-4 w-4 text-flame-400" /> {e.riders} inscrits
                    </span>
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-flame-400 hover:underline"
                    >
                      S'inscrire <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div
                  className="hidden bg-cover bg-center transition-transform duration-700 group-hover:scale-105 md:block"
                  style={{ backgroundImage: `url(${e.img})` }}
                >
                  <div className="h-full w-full bg-gradient-to-r from-midnight-900 via-transparent to-transparent" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
