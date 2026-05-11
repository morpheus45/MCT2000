"use client";

import { motion } from "framer-motion";

const rows = [
  { year: "2000", evt: "Fondation du club", note: "5 motards, un café, une idée." },
  { year: "2008", evt: "Premier road-trip Maroc", note: "12 jours, 5 200 km, 14 motos." },
  { year: "2015", evt: "100ème membre", note: "Le club passe les 100 cartes." },
  { year: "2020", evt: "20 ans — édition spéciale", note: "Patch anniversaire, ride autour de la France." },
  { year: "2026", evt: "Plateforme web lancée", note: "Le club entre dans une nouvelle ère." },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-ink-900/40 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12">
          <div className="chip mb-4">Histoire</div>
          <h2 className="heading text-5xl md:text-6xl">
            <span className="gradient-text">26 ans</span> sur la route.
          </h2>
        </div>

        <ol className="relative space-y-10 border-l border-flame-500/30 pl-8">
          {rows.map((r, i) => (
            <motion.li
              key={r.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full border-2 border-ink-950 bg-flame-500 shadow-[0_0_12px_rgba(255,84,16,0.8)]" />
              <div className="heading text-flame-400 text-3xl tracking-widest">{r.year}</div>
              <div className="text-xl font-semibold text-white">{r.evt}</div>
              <div className="text-white/50">{r.note}</div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
