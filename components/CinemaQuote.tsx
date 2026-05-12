"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Cinematic full-bleed section with parallax photo + huge italic quote overlay.
export default function CinemaQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} className="relative isolate min-h-[80vh] overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1547549082-6bc09f2049ae?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="h-[120%] w-full object-cover object-center brightness-[0.78] saturate-[1.1]"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight-900/80 via-midnight-900/15 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-midnight-900/55" />
      <div className="absolute inset-0 -z-10 scanlines opacity-12" />

      <motion.div style={{ y: yText }} className="mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-5 py-32 lg:px-12">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-12 bg-flame-500" />
          <span className="font-mono text-xs uppercase tracking-widest2 text-flame-400">
            Manifeste · 01
          </span>
        </div>

        <blockquote className="max-w-4xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-bone-50">
          On <span className="editorial text-flame-400">part</span> ensemble,
          <br className="hidden sm:inline" /> on <span className="editorial text-flame-400">revient</span> ensemble.
          <br className="hidden sm:inline" />
          <span className="editorial text-bone-50/80">Personne</span> ne reste en rade.
        </blockquote>

        <div className="mt-8 max-w-md">
          <p className="font-mono text-xs uppercase tracking-widest2 text-bone-50/50">
            — Règle d'or du club · gravée depuis l'an 2000
          </p>
        </div>
      </motion.div>

      {/* Side label */}
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-180 font-mono text-[10px] uppercase tracking-widest2 text-bone-50/30 lg:block"
           style={{ writingMode: "vertical-rl" }}>
        SCENE 01 · MANIFESTE
      </div>
    </section>
  );
}
