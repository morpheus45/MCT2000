"use client";

import { motion } from "framer-motion";
import { MessageSquare, Calendar, Map, Wrench, Camera, Trophy } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Chat temps réel",
    desc: "Canaux dédiés : sorties, mécanique, petites annonces, off-topic. Mentions, photos, voice notes.",
  },
  {
    icon: Calendar,
    title: "Calendrier des sorties",
    desc: "Inscris-toi en un clic. Météo intégrée, briefing GPX, point de RDV sur carte.",
  },
  {
    icon: Map,
    title: "Bibliothèque d'itinéraires",
    desc: "Les meilleures routes du club, traces GPX, niveau de difficulté, photos.",
  },
  {
    icon: Wrench,
    title: "Atelier partagé",
    desc: "Tutos, retours d'expérience, recherche pièces, entraide mécanique entre membres.",
  },
  {
    icon: Camera,
    title: "Galerie membres",
    desc: "Tes photos, tes vidéos, tes road-trips. Likes, commentaires, partage.",
  },
  {
    icon: Trophy,
    title: "Badges & Kilométrage",
    desc: "Suivi des KM, badges débloqués (1000 km, sortie nuit, col mythique...).",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="chip mb-4">Plateforme</div>
          <h2 className="heading text-5xl md:text-6xl tracking-tight">
            Tout ce dont un <span className="gradient-text">motard</span> a besoin.
          </h2>
        </div>
        <p className="max-w-md text-white/60">
          Le club, dans ta poche. Conçu par des motards, pour des motards. Aucune pub, aucun
          tracking — juste l'essentiel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-6 transition-all hover:border-flame-500/40 hover:-translate-y-1"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-flame-500/0 blur-2xl transition-all group-hover:bg-flame-500/20" />
            <f.icon className="mb-4 h-8 w-8 text-flame-400" />
            <h3 className="heading mb-2 text-2xl tracking-wide">{f.title}</h3>
            <p className="text-sm text-white/60">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
