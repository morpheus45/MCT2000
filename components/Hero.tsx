"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Users } from "lucide-react";
import Wheel from "./Wheel";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate h-[100vh] min-h-[640px] overflow-hidden">
      {/* Cinematic photographic backdrop with parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="h-[120%] w-full object-cover object-center brightness-[0.85] saturate-[1.15]"
        />
      </motion.div>

      {/* Cinematic gradient overlay — much lighter for visibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight-900/85 via-midnight-900/25 to-midnight-900/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight-900/75 via-midnight-900/10 to-transparent" />
      <div className="absolute inset-0 -z-10 scanlines opacity-15" />

      {/* Decorative wheel — far right, partially off-screen, rotates on scroll */}
      <motion.div style={{ y: yText }} className="pointer-events-none absolute -right-32 top-[18%] hidden lg:block">
        <Wheel size={620} className="opacity-50 drop-shadow-[0_0_60px_rgba(255,84,16,0.25)]" />
      </motion.div>

      {/* Cinematic frame markers (corner brackets) */}
      <div className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l-2 border-t-2 border-flame-500/70 lg:left-12 lg:top-12" />
      <div className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r-2 border-t-2 border-flame-500/70 lg:right-12 lg:top-12" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-flame-500/70 lg:bottom-12 lg:left-12" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-flame-500/70 lg:bottom-12 lg:right-12" />

      {/* Top-bar status — like a cinema slate */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute left-1/2 top-12 z-10 -translate-x-1/2 lg:top-16"
      >
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-bone-50/70">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame-500" />
            EN DIRECT
          </span>
          <span>·</span>
          <span>SCÈNE 26 / MCT 2000</span>
          <span>·</span>
          <span>CLERMONT-L'HÉRAULT</span>
        </div>
      </motion.div>

      {/* Hero content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 lg:px-12"
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-flame-500" />
          <span className="font-mono text-xs uppercase tracking-widest2 text-flame-400">
            Moto Club · Saison 2026
          </span>
        </motion.div>

        {/* Massive cinematic title — letters rise from below */}
        <h1 className="font-display leading-[0.82] tracking-tight">
          <RiseLine delay={0.4}>
            <span className="block text-[clamp(3rem,11vw,10rem)] text-bone-50">Le bitume</span>
          </RiseLine>
          <RiseLine delay={0.55}>
            <span className="block text-[clamp(3rem,11vw,10rem)]">
              <span className="editorial text-flame-400">comme</span>
              <span className="ml-3 text-bone-50">religion.</span>
            </span>
          </RiseLine>
        </h1>

        {/* Sub-quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-10 max-w-xl"
        >
          <p className="editorial text-xl leading-relaxed text-bone-50/85 md:text-2xl">
            «&nbsp;131 motards. Clermont-l'Hérault.
            <span className="not-italic font-display text-flame-400"> Une famille.</span>&nbsp;»
          </p>
          <div className="mt-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-bone-50/40">
            <MapPin className="h-3 w-3" /> 43.6258°N — 3.4422°E
            <span>·</span>
            <Users className="h-3 w-3" /> depuis 2000
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.25 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link href="/signup" className="btn-primary">
            <span>Rejoindre le club</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/feed" className="btn-ghost">
            Voir le feed live
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-transparent via-flame-500 to-transparent" />
        <div className="mt-2 font-mono text-[9px] uppercase tracking-widest2 text-bone-50/50">
          défiler · démarrage
        </div>
      </motion.div>
    </section>
  );
}

function RiseLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
