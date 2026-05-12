"use client";

import { motion } from "framer-motion";
import NumberDivider from "./NumberDivider";

const rows = [
  { year: "2000", evt: "Naissance du club", note: "Quelques motards à Clermont-l'Hérault — le Moto Club MCT 2000." },
  { year: "2013", evt: "Le club arrive sur Facebook", note: "Le groupe est créé le 10 février 2013. Premiers posts, premières balades partagées." },
  { year: "2018", evt: "Tradition Téléthon", note: "Le club organise sa balade annuelle pour le Téléthon. Tradition ancrée." },
  { year: "2022", evt: "Nouvelle identité", note: "Le club affirme son nom : Moto Club MCT 2000." },
  { year: "2026", evt: "Plateforme web", note: "Chat, feed, sorties, galerie — le club entre dans une nouvelle ère." },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y-2 border-bone-50/10 py-24">
      <NumberDivider number="02" kicker="Archives" label="Vingt-six ans sur la route." />

      <div className="mx-auto mt-12 max-w-7xl px-5">
        <div className="grid gap-5 md:grid-cols-5">
          {rows.map((r, i) => (
            <motion.article
              key={r.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative border-2 border-bone-50/15 bg-ink-900/40 p-5 transition-all hover:border-flame-500"
              style={{ transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)` }}
            >
              {/* Punched corner */}
              <div className="absolute -left-2 -top-2 h-4 w-4 rotate-45 border-l-2 border-t-2 border-flame-500 bg-ink-950" />
              <div className="font-mono text-[10px] uppercase tracking-widest2 text-bone-50/40">
                Chapitre {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-2 font-editorial italic text-6xl leading-none text-flame-400">
                {r.year}
              </div>
              <div className="mt-3 heading text-lg leading-tight text-bone-50">{r.evt}</div>
              <p className="mt-2 text-sm text-bone-50/55">{r.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
