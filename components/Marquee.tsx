"use client";

// Bandeau défilant en français — alterne display capitales et italique éditorial.
const words: { t: string; cls: string }[] = [
  { t: "ROULER ENSEMBLE", cls: "font-display tracking-widest2 text-ink-950" },
  { t: "personne ne reste en rade", cls: "editorial text-blood-600 lowercase" },
  { t: "DEUX-ROUES, UNE FAMILLE", cls: "font-display tracking-widest2 text-ink-950/55" },
  { t: "bitume et liberté", cls: "editorial text-flame-700 lowercase" },
  { t: "BALADES & ROAD-TRIPS", cls: "font-display tracking-widest2 text-ink-950" },
  { t: "cathédrale d'asphalte", cls: "editorial text-ink-950/55 lowercase" },
  { t: "TOUTES CYLINDRÉES", cls: "font-display tracking-widest2 text-flame-600" },
  { t: "mécanique partagée", cls: "editorial text-blood-600 lowercase" },
  { t: "DEPUIS L'AN 2000", cls: "font-mono uppercase tracking-widest2 text-ink-950/60 text-sm" },
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y-2 border-ink-950/10 bg-bone-100 py-5">
      <div className="flex gap-12 whitespace-nowrap animate-ride">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className={`${w.cls} text-2xl md:text-4xl`}>
            {w.t}
            <span className="mx-6 align-middle text-flame-600">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bone-100 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bone-100 to-transparent" />
    </div>
  );
}
