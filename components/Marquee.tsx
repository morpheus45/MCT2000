"use client";

// Cream-paper ticker — alternates with dark sections to lighten the page.
const words: { t: string; cls: string }[] = [
  { t: "RIDE TOGETHER", cls: "font-display tracking-widest2 text-ink-950" },
  { t: "no rider left behind", cls: "editorial text-blood-600 lowercase" },
  { t: "TWIN CYLINDERS", cls: "font-display tracking-widest2 text-ink-950/55" },
  { t: "throttle therapy", cls: "editorial text-flame-700 lowercase" },
  { t: "MIDNIGHT RUNS", cls: "font-display tracking-widest2 text-ink-950" },
  { t: "asphalt cathedral", cls: "editorial text-ink-950/55 lowercase" },
  { t: "TWO WHEELS — ONE FAMILY", cls: "font-display tracking-widest2 text-flame-600" },
  { t: "ride or wrench", cls: "editorial text-blood-600 lowercase" },
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
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bone-100 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bone-100 to-transparent" />
    </div>
  );
}
