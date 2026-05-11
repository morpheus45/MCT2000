"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { getSupabaseBrowser, supabaseConfigured } from "@/lib/supabase/client";

type Photo = {
  id: string;
  image_url: string;
  caption: string | null;
  taken_at: string | null;
};

// Curated motorcycle photos (Unsplash — free license)
const seedPhotos: Photo[] = [
  { id: "s1", image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1400&auto=format&fit=crop", caption: "Verdon — sortie matinale", taken_at: "2025-05-18" },
  { id: "s2", image_url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1400&auto=format&fit=crop", caption: "Atelier chaîne & pignons", taken_at: "2025-05-25" },
  { id: "s3", image_url: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?q=80&w=1400&auto=format&fit=crop", caption: "Col de la Bonette", taken_at: "2025-06-01" },
  { id: "s4", image_url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1400&auto=format&fit=crop", caption: "Le Galibier en boucle", taken_at: "2024-07-12" },
  { id: "s5", image_url: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1400&auto=format&fit=crop", caption: "Route des Crêtes — Vosges", taken_at: "2024-08-04" },
  { id: "s6", image_url: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1400&auto=format&fit=crop", caption: "Corniche d'Or", taken_at: "2024-09-15" },
  { id: "s7", image_url: "https://images.unsplash.com/photo-1474401869869-9fe17f9b0a6f?q=80&w=1400&auto=format&fit=crop", caption: "Mont Aigoual — Cévennes", taken_at: "2025-03-22" },
  { id: "s8", image_url: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=1400&auto=format&fit=crop", caption: "Cols Pyrénéens", taken_at: "2025-04-10" },
  { id: "s9", image_url: "https://images.unsplash.com/photo-1502980426475-b83966705988?q=80&w=1400&auto=format&fit=crop", caption: "Forêt de Brocéliande", taken_at: "2024-10-08" },
  { id: "s10", image_url: "https://images.unsplash.com/photo-1591216105468-f02e4c93cc05?q=80&w=1400&auto=format&fit=crop", caption: "Vintage night ride", taken_at: "2024-11-20" },
  { id: "s11", image_url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1400&auto=format&fit=crop", caption: "Brotherhood", taken_at: "2025-01-14" },
  { id: "s12", image_url: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1400&auto=format&fit=crop", caption: "Garage du club", taken_at: "2025-02-02" },
];

export default function GalleryClient() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [photos, setPhotos] = useState<Photo[]>(seedPhotos);
  const [open, setOpen] = useState<Photo | null>(null);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { data } = await supabase
        .from("gallery_photos")
        .select("id, image_url, caption, taken_at")
        .order("taken_at", { ascending: false })
        .limit(60);
      if (data && data.length > 0) setPhotos(data as Photo[]);
    })();
  }, [supabase]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="chip mb-3">Galerie</div>
          <h1 className="heading text-6xl">Les souvenirs.</h1>
          <p className="mt-2 max-w-xl text-white/60">
            {supabaseConfigured
              ? "Photos partagées par les membres et les officiers."
              : "Aperçu — les photos des membres apparaîtront ici une fois Supabase connecté."}
          </p>
        </div>
      </div>

      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {photos.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
            onClick={() => setOpen(p)}
            className="group block w-full overflow-hidden rounded-xl border border-white/5 bg-ink-800"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image_url}
              alt={p.caption ?? "Photo MCT 2000"}
              loading="lazy"
              className="w-full transition-transform duration-700 group-hover:scale-105"
            />
            {p.caption && (
              <div className="px-3 py-2 text-left text-xs text-white/60">{p.caption}</div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-ink-950/90 p-5 backdrop-blur-xl"
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Fermer"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-3 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={open.image_url} alt="" className="max-h-[80vh] w-auto" />
              {open.caption && (
                <div className="bg-ink-900/90 px-5 py-3 text-sm text-white/80">{open.caption}</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
