"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative isolate min-h-[80vh] overflow-hidden">
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 -z-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover object-center brightness-[0.72] saturate-[1.15]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight-900/55 via-midnight-900/30 to-midnight-900/75" />
      <div className="absolute inset-0 -z-10 scanlines opacity-15" />

      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-5 py-32 text-center lg:px-12">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-12 bg-flame-500" />
          <span className="font-mono text-xs uppercase tracking-widest2 text-flame-400">
            Final · Acte V
          </span>
          <span className="h-px w-12 bg-flame-500" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-display text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-tight text-bone-50"
        >
          La route <span className="editorial text-flame-400">t'attend</span>
          <span className="text-flame-500">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-8 max-w-xl editorial text-xl text-bone-50/75 md:text-2xl"
        >
          Pas de cotisation cachée. Pas de hiérarchie. Pas de chichis.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/signup" className="btn-primary text-base">
            <span>Devenir membre</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="btn-ghost text-base">
            Notre histoire
          </Link>
        </motion.div>

        <div className="mt-16 font-mono text-[10px] uppercase tracking-widest2 text-bone-50/30">
          Moto Club MCT 2000 · Clermont-l'Hérault · Depuis l'an 2000
        </div>
      </div>
    </section>
  );
}
