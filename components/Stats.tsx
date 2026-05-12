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
    <section className="relative overflow-hidden cream-bg py-32">
      <div className="mx-auto mb-20 max-w-7xl px-5 lg:px-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-12 bg-flame-600" />
          <span className="font-mono text-xs uppercase tracking-widest2 text-flame-700">
            Chapitre 03 · Archives
          </span>
        </div>
        <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-ink-950">
          Vingt-six ans <br />
          <span className="editorial text-blood-600">sur la route</span>
          <span className="text-flame-600">.</span>
        </h2>
      </div>

      {/* Horizontal cream timeline */}
      <div className="mx-auto max-w-7xl px-5 lg:px-12">
        <div className="relative">
          <div className="absolute left-0 right-0 top-[92px] hidden h-px bg-gradient-to-r from-transparent via-flame-600 to-transparent md:block" />

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
                {/* Year as huge editorial italic */}
                <div className="font-editorial italic text-[5.5rem] leading-none text-blood-600">{r.year}</div>

                {/* Marker dot on the axis */}
                <div className="my-4 grid h-6 w-6 place-items-center rounded-full border border-flame-600 bg-bone-50 md:my-3">
                  <div className="h-2 w-2 rounded-full bg-flame-600 shadow-[0_0_10px_rgba(199,43,7,0.5)]" />
                </div>

                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest2 text-ink-950/40">
                  Acte {String(i + 1).padStart(2, "0")}
                </div>

                <h3 className="heading text-xl tracking-wider text-ink-950">{r.evt}</h3>
                <p className="mt-2 max-w-[20ch] text-sm text-ink-950/65">{r.note}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
