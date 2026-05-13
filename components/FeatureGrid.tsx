"use client";

import { motion } from "framer-motion";
import { MessageSquare, Calendar, Map, Wrench, Camera, Trophy, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Verified motorcycle-only Unsplash photos for each feature card.
const features = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Chat temps réel",
    desc: "Canaux dédiés : sorties, mécanique, petites annonces. Mentions, photos, voice notes.",
    href: "/chat",
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "02",
    icon: Calendar,
    title: "Calendrier des sorties",
    desc: "Inscris-toi en un clic. Météo intégrée, briefing GPX, point de RDV sur carte.",
    href: "/events",
    img: "https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "03",
    icon: Map,
    title: "Routes locales",
    desc: "Salagou, Mourèze, Navacelles, Pic Saint-Loup, Mont Aigoual. Carte interactive incluse.",
    href: "/rides",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "04",
    icon: Wrench,
    title: "Atelier partagé",
    desc: "Tutos, retours d'expérience, recherche pièces, entraide mécanique entre membres.",
    href: "/chat",
    img: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "05",
    icon: Camera,
    title: "Galerie",
    desc: "Photos, vidéos, road-trips. Likes, commentaires, partage entre membres.",
    href: "/gallery",
    img: "https://images.unsplash.com/photo-1591216105468-f02e4c93cc05?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "06",
    icon: Trophy,
    title: "Téléthon",
    desc: "Notre balade annuelle caritative. Inscription libre, dons à 100% pour l'AFM.",
    href: "/telethon",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative cream-bg py-32">
      <div className="mx-auto mb-20 max-w-7xl px-5 lg:px-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-12 bg-flame-600" />
          <span className="font-mono text-xs uppercase tracking-widest2 text-flame-700">
            Chapitre 02 · Sommaire
          </span>
        </div>
        <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-ink-950">
          Ce que le club <br />
          <span className="editorial text-blood-600">te file</span>
          <span className="text-flame-600">.</span>
        </h2>
        <p className="mt-6 max-w-xl editorial text-xl text-ink-950/65">
          Six rubriques, six raisons de s'inscrire. Du chat temps réel à la bibliothèque
          d'itinéraires — tout est là, en clair.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link
                href={f.href}
                className="group relative flex h-full flex-col justify-between border border-ink-950/10 bg-bone-50 p-7 shadow-[0_20px_45px_-30px_rgba(6,6,10,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(140,28,20,0.4)]"
              >
                <div>
                  <div className="mb-5 flex items-start justify-between">
                    <span className="editorial text-7xl leading-none text-flame-600/85 transition-colors group-hover:text-blood-600">
                      {f.num}
                    </span>
                    <div className="grid h-11 w-11 place-items-center border border-ink-950/20 bg-ink-950 text-flame-400">
                      <f.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="heading text-3xl tracking-wide text-ink-950">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-950/65">{f.desc}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-ink-950/10 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink-950/40">
                    Rubrique {f.num}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest2 text-flame-700 transition-transform group-hover:translate-x-1">
                    Explorer <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
