"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import NumberDivider from "./NumberDivider";

const upcoming = [
  {
    date: "24 mai",
    title: "Balade entre filles",
    where: "Salagou (boucle)",
    riders: 12,
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
    rotate: -3,
  },
  {
    date: "7 juin",
    title: "Sortie dominicale",
    where: "Cirque de Mourèze",
    riders: 18,
    img: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?q=80&w=1200&auto=format&fit=crop",
    rotate: 2,
  },
  {
    date: "5 déc.",
    title: "Téléthon",
    where: "Caritative · 100 km",
    riders: 42,
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
    rotate: -1.5,
  },
];

export default function UpcomingTeaser() {
  return (
    <section className="py-24">
      <NumberDivider number="03" kicker="Au programme" label="Les prochaines sorties." />

      <div className="mx-auto mt-12 max-w-7xl px-5">
        <div className="grid gap-12 md:grid-cols-3">
          {upcoming.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: e.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="polaroid relative cursor-pointer"
            >
              {/* Tape strip on top */}
              <div
                className="absolute left-1/2 top-[-14px] z-10 h-7 w-24 -translate-x-1/2 bg-flame-300/70 shadow-md"
                style={{ transform: "translateX(-50%) rotate(-3deg)", clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)" }}
              />
              <div
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${e.img})` }}
              />
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-2 text-ink-950">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-flame-700">
                    {e.date}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest2 text-ink-950/60">
                    <Users className="h-3 w-3" /> {e.riders}
                  </span>
                </div>
                <div className="heading text-xl tracking-wide">{e.title}</div>
                <div className="flex items-center gap-1 font-editorial italic text-sm text-ink-950/70">
                  <MapPin className="h-3 w-3" /> {e.where}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/events" className="btn-ghost">
            <Calendar className="h-4 w-4" /> Tout le calendrier
          </Link>
        </div>
      </div>
    </section>
  );
}
