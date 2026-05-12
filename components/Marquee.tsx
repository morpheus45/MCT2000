"use client";

// Cinematic editorial ticker — large display caps with italic interludes.
const words: { t: string; cls: string }[] = [
  { t: "RIDE TOGETHER", cls: "font-display tracking-widest2 text-bone-50" },
  { t: "no rider left behind", cls: "editorial text-flame-400 lowercase" },
  { t: "TWIN CYLINDERS", cls: "font-display tracking-widest2 text-bone-50/60" },
  { t: "throttle therapy", cls: "editorial text-flame-400 lowercase" },
  { t: "MIDNIGHT RUNS", cls: "font-display tracking-widest2 text-bone-50" },
  { t: "asphalt cathedral", cls: "editorial text-bone-50/60 lowercase" },
  { t: "TWO WHEELS — ONE FAMILY", cls: "font-display tracking-widest2 text-flame-500" },
  { t: "ride or wrench", cls: "editorial text-flame-400 lowercase" },
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-bone-50/10 bg-midnight-900 py-6">
      <div className="flex gap-12 whitespace-nowrap animate-ride">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className={`${w.cls} text-2xl md:text-4xl`}>
            {w.t}
            <span className="mx-6 align-middle text-flame-500">✦</span>
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-midnight-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-midnight-900 to-transparent" />
    </div>
  );
}
