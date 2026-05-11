"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mountain, Clock, Route as RouteIcon, MapPin } from "lucide-react";
import { rides } from "@/lib/rides";

const ClubMap = dynamic(() => import("./ClubMap"), {
  ssr: false,
  loading: () => (
    <div className="grid aspect-[16/9] place-items-center rounded-2xl border border-white/10 bg-ink-900/60 text-white/40">
      Chargement de la carte…
    </div>
  ),
});

export default function RidesClient() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <div className="chip mb-3">Bibliothèque</div>
        <h1 className="heading text-6xl">
          Les routes du club <span className="gradient-text">autour de Clermont-l'Hérault.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Sélection des meilleurs itinéraires moto du Languedoc et au-delà. Du Salagou à 15 min, au
          Mont Aigoual en road-trip — il y en a pour tous les niveaux et toutes les humeurs.
        </p>
      </div>

      {/* Interactive map */}
      <ClubMap />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rides.map((r, i) => (
          <motion.article
            key={r.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 transition-all hover:-translate-y-1 hover:border-flame-500/40"
          >
            <div
              className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${r.img})` }}
            />
            <div className="p-5">
              <div className="chip mb-2">
                <Mountain className="h-3 w-3" /> {r.region}
              </div>
              <h3 className="heading text-2xl">{r.title}</h3>
              <p className="mt-2 text-sm text-white/60">{r.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.highlights.map((h) => (
                  <span key={h} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                    {h}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <RouteIcon className="h-3.5 w-3.5" /> {r.distance_km} km
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {r.duration}
                </span>
                <span className="chip">{r.level}</span>
              </div>
              <a
                href={`https://www.openstreetmap.org/?mlat=${r.lat}&mlon=${r.lon}#map=11/${r.lat}/${r.lon}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs text-flame-400 hover:underline"
              >
                <MapPin className="h-3 w-3" /> Voir sur OpenStreetMap
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-flame-500/20 bg-flame-500/5 p-6 text-center">
        <h2 className="heading text-3xl">Une route à ajouter ?</h2>
        <p className="mt-2 text-white/70">
          Tu as une pépite à partager avec le club ? Connecte-toi et publie-la sur le feed.
        </p>
        <Link href="/feed" className="btn-primary mt-4">Aller au feed</Link>
      </div>
    </section>
  );
}
