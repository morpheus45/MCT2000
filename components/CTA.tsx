"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 noise-bg" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-flame-700/30 via-transparent to-transparent" />

      <div className="mx-auto max-w-5xl px-5 py-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="heading text-[clamp(2.5rem,8vw,6rem)] leading-none"
        >
          La route <span className="gradient-text">t'attend.</span>
        </motion.h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
          Crée ton compte en 30 secondes. Premier ride offert. Pas de cotisation cachée — juste
          l'essence.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/signup" className="btn-primary text-lg">
            Devenir membre <ArrowRight className="h-5 w-5" />
          </Link>
          <Link href="/about" className="btn-ghost text-lg">En savoir plus</Link>
        </div>
      </div>
    </section>
  );
}
