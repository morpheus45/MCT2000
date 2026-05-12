"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Patch from "./Patch";

export default function Hero() {
  const today = new Date();
  const issue = `N° ${String(today.getFullYear() - 1999).padStart(2, "0")}`;
  const date = today.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <section className="relative isolate overflow-hidden border-b border-bone-50/10">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 paper-bg" />
      <div className="absolute inset-0 -z-10 scanlines opacity-30" />

      {/* Masthead — magazine header bar */}
      <div className="border-b border-bone-50/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 font-mono text-[11px] uppercase tracking-widest2 text-bone-50/60">
          <span>Volume XXVI · {issue}</span>
          <span className="hidden sm:inline">{date}</span>
          <span>Clermont-l'Hérault · 43.6258°N 3.4422°E</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 pb-24 pt-12 md:pt-16 lg:grid-cols-12">
        {/* LEFT — editorial copy */}
        <div className="lg:col-span-7">
          {/* Stamp */}
          <motion.div
            initial={{ opacity: 0, rotate: 8, y: -10 }}
            animate={{ opacity: 1, rotate: -4, y: 0 }}
            transition={{ duration: 0.5 }}
            className="stamp mb-6 inline-flex"
          >
            <span className="text-sm">Édition spéciale · 2026</span>
          </motion.div>

          {/* Massive layered title */}
          <h1 className="font-display leading-[0.78] tracking-tight">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="block text-[clamp(3.4rem,11vw,9rem)] text-bone-50"
            >
              BROTHER<span className="text-flame-500">.</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block translate-x-4 text-[clamp(3.4rem,11vw,9rem)]"
            >
              <span className="editorial text-flame-400">hood</span>
              <span className="ml-3 inline-block translate-y-2 text-bone-50">,</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block text-[clamp(3.4rem,11vw,9rem)] text-bone-50"
            >
              BIT<span className="editorial -ml-1 text-flame-500">u</span>ME<span className="text-flame-500">,</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block translate-x-2 text-[clamp(3.4rem,11vw,9rem)]"
            >
              <span className="editorial text-bone-50">L</span>
              <span className="text-flame-500">i</span>
              <span className="editorial text-bone-50">berté</span>
              <span className="text-flame-500">.</span>
            </motion.span>
          </h1>

          {/* Lede — editorial paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 max-w-xl"
          >
            <div className="mb-2 flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest2 text-flame-500">¶ Édito</span>
              <span className="h-px flex-1 bg-bone-50/15" />
            </div>
            <p className="editorial text-xl leading-snug text-bone-50/90 md:text-2xl">
              «&nbsp;On est <span className="not-italic font-display text-flame-400">131</span> motards, basés à Clermont-l'Hérault.
              Toutes cylindrées, toutes marques, toutes générations. Ce qui nous rassemble&nbsp;:
              la passion du <span className="font-display not-italic">deux-roues</span> et la règle d'or — personne ne reste en rade.&nbsp;»
            </p>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-widest2 text-bone-50/40">
              — Bureau du club, depuis 2000
            </div>
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/signup" className="btn-primary">
              Rejoindre le club <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/feed" className="btn-ghost">Lire le feed</Link>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-50/40">
              · 30 sec · pas de cotisation cachée
            </span>
          </motion.div>
        </div>

        {/* RIGHT — magazine-style asymmetric stack */}
        <div className="relative lg:col-span-5 lg:pl-6">
          {/* Top stat card with date stamp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative ml-auto w-[88%] origin-top-right rotate-[1.5deg] border-2 border-bone-50 bg-bone-50 p-5 text-ink-950 shadow-[10px_10px_0_0_#8c1c14]"
          >
            <div className="flex items-start justify-between border-b border-ink-950/30 pb-2">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest2 text-ink-950/60">Tableau de bord</div>
                <div className="heading text-2xl">Saison 2026</div>
              </div>
              <div className="stamp text-[10px]">Ouverte</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { v: "131", l: "Motards" },
                { v: "47×", l: "Sorties/an" },
                { v: "13 ans", l: "Sur FB" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="heading text-3xl text-flame-600">{s.v}</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest2 text-ink-950/50">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-ink-950/30 pt-2 text-xs">
              <span className="editorial text-ink-950/80">
                «&nbsp;Café à 8h45, briefing court, départ 9h.&nbsp;»
              </span>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-widest2 text-ink-950/50">Méthode club</div>
            </div>
          </motion.div>

          {/* Floating patch — overlapping */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="absolute -left-4 top-32 animate-wobble"
          >
            <Patch text="MCT 2000 · CLERMONT L'HÉRAULT · MOTO CLUB ·" size={150} variant="flame" />
          </motion.div>

          {/* Second card — pull-quote ticket */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="relative ml-6 mt-10 w-[75%] -rotate-[2deg] border-2 border-bone-50 bg-ink-950 p-5 shadow-[8px_8px_0_0_#ff5410]"
          >
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest2 text-bone-50/50">
              <span>Téléthon · décembre</span>
              <span>Ticket #42</span>
            </div>
            <div className="heading text-3xl text-bone-50">
              On roule pour <span className="text-flame-500">une cause.</span>
            </div>
            <Link href="/telethon" className="mt-3 inline-block font-mono text-[11px] uppercase tracking-widest2 text-flame-400 underline-offset-4 hover:underline">
              Lire l'article →
            </Link>
          </motion.div>

          {/* Issue number — vertical sidebar */}
          <div className="absolute right-0 top-0 hidden h-full items-center justify-end pr-2 lg:flex">
            <div className="rotate-180 font-mono text-[10px] uppercase tracking-widest2 text-bone-50/30" style={{ writingMode: "vertical-rl" }}>
              ISSUE {issue} · MCT 2000 · DEPUIS 2000
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
