"use client";

import { motion } from "framer-motion";

const rows = [
  { year: "2000", evt: "Genèse", note: "Quelques motards à Clermont-l'Hérault. Le club s'appelle MCT 2000." },
  { year: "2013", evt: "Sur Facebook", note: "Le groupe officiel est créé le 10 février 2013. Premières balades partagées." },
  { year: "2018", evt: "Tradition Téléthon", note: "Le club lance sa balade caritative annuelle. La tradition est ancrée." },
  { year: "2022", evt: "Identité affirmée", note: "Le club consolide son nom : Moto Club MCT 2000." },
  { year: "2026", evt: "Plateforme web", note: "Chat, feed, sorties, galerie. Le club entre dans une nouvelle ère." },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 paper-bg" />

      <div className="mx-auto mb-20 max-w-7xl px-5 lg:px-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-12 bg-flame-500" />
          <span className="font-mono text-xs uppercase tracking-widest2 text-flame-400">
            Chapitre 03 · Archives
          </span>
        </div>
        <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-bone-50">
          Vingt-six ans <br />
          <span className="editorial text-flame-400">sur la route</span>
          <span className="text-flame-500">.</span>
        </h2>
      </div>

      {/* Cinematic horizontal timeline */}
      <div className="mx-auto max-w-7xl px-5 lg:px-12">
        <div className="relative">
          {/* Center axis line */}
          <div className="absolute left-0 right-0 top-[88px] hidden h-px bg-gradient-to-r from-transparent via-flame-500 to-transparent md:block" />

          <div className="grid gap-12 md:grid-cols-5 md:gap-0">
            {rows.map((r, i) => (
              <motion.article
                key={r.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center md:px-3"
              >
                {/* Year as huge brass-gold */}
                <div className="brass-text font-display text-6xl tracking-tight">{r.year}</div>

                {/* Marker dot on the axis */}
                <div className="my-4 grid h-6 w-6 place-items-center rounded-full border border-flame-500 bg-midnight-900 md:my-3">
                  <div className="h-2 w-2 rounded-full bg-flame-500 shadow-[0_0_12px_rgba(255,84,16,0.8)]" />
                </div>

                {/* Number label */}
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest2 text-bone-50/40">
                  Acte {String(i + 1).padStart(2, "0")}
                </div>

                <h3 className="heading text-xl tracking-wider text-bone-50">{r.evt}</h3>
                <p className="mt-2 max-w-[18ch] text-sm text-bone-50/55">{r.note}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
