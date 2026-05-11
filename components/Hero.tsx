"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Flame, Wind } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0 -z-10 noise-bg" />
      <div
        className="absolute inset-0 -z-10 opacity-50 animate-gradient-x"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,84,16,0.18) 0%, transparent 30%, rgba(255,84,16,0.10) 70%, transparent 100%)",
          backgroundSize: "400% 400%",
        }}
      />
      <div className="absolute inset-0 -z-10 scanlines opacity-40" />

      {/* Floating "speed" lines */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 pt-16 md:pt-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chip mb-6"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-flame-500" />
            Saison 2026 ouverte — 47 sorties au programme
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="heading text-[clamp(3rem,9vw,7.5rem)] leading-[0.85] tracking-tight"
          >
            <span className="block text-white/95">Brotherhood.</span>
            <span className="block gradient-text animate-flicker">Bitume.</span>
            <span className="block text-white/95">Liberté.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-white/70"
          >
            Le club <strong className="text-white">MCT2000</strong> rassemble depuis 2000 les passionnés de
            deux-roues. Sorties dominicales, road-trips longue distance, mécanique partagée — et
            surtout, une famille.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link href="/signup" className="btn-primary">
              Rejoindre le club
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/feed" className="btn-ghost">
              Voir le feed live
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-4 text-center"
          >
            {[
              { v: "240+", l: "Membres" },
              { v: "1.2M", l: "KM cumulés" },
              { v: "47", l: "Sorties / an" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4">
                <div className="heading text-3xl gradient-text">{s.v}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right side: animated "dashboard" mock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-6 shadow-2xl">
            {/* Faux speedo */}
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full border border-flame-500/30 opacity-60" />
            <div className="absolute -right-6 -top-6 h-56 w-56 rounded-full border border-flame-500/20" />

            <div className="flex items-center justify-between">
              <div className="chip">
                <Wind className="h-3 w-3" /> live
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40">dashboard</div>
            </div>

            <div className="mt-8">
              <div className="text-xs uppercase tracking-[0.25em] text-white/40">Vitesse</div>
              <div className="heading text-7xl gradient-text">128<span className="text-2xl text-white/40 ml-1">km/h</span></div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="glass rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-widest text-white/40">RPM</div>
                <div className="heading text-2xl text-white">7 240</div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Cap</div>
                <div className="heading text-2xl text-white">N 042°</div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Temp</div>
                <div className="heading text-2xl text-white">87°C</div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Carbu</div>
                <div className="heading text-2xl text-white">62 %</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Flame className="h-3 w-3 text-flame-500" />
                Sortie en cours · Col du Galibier
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "68%" }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                  className="h-full bg-gradient-to-r from-flame-500 to-flame-300"
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                <span>Briançon</span>
                <span>68%</span>
                <span>Lautaret</span>
              </div>
            </div>
          </div>

          {/* Glow */}
          <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-flame-500/20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
