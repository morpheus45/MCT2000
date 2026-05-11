"use client";

const words = [
  "ride together",
  "no rider left behind",
  "twin cylinders",
  "throttle therapy",
  "ride or wrench",
  "midnight runs",
  "asphalt cathedral",
  "two wheels — one family",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-ink-900/60 py-6">
      <div className="flex gap-12 whitespace-nowrap animate-ride">
        {[...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className="heading text-3xl tracking-[0.25em] text-white/30 hover:text-flame-400 transition-colors"
          >
            {w}
            <span className="mx-12 text-flame-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
