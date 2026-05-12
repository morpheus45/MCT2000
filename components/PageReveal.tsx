"use client";

import { useEffect, useState } from "react";

// Cinematic intro: dark overlay with the flame logo, fades out in ~1.2s.
// Shows once per session to avoid annoying repeat visitors.
export default function PageReveal() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("mct-intro-seen") === "1") return;
      sessionStorage.setItem("mct-intro-seen", "1");
    } catch {}
    setHidden(false);
    const t = setTimeout(() => setHidden(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-midnight-900 animate-shutter-out origin-top">
      <div className="text-center animate-engine-rev">
        <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto animate-pulse-flame">
          <defs>
            <linearGradient id="introFlame" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe6d4" />
              <stop offset="50%" stopColor="#ff7a3a" />
              <stop offset="100%" stopColor="#c72b07" />
            </linearGradient>
          </defs>
          <path
            d="M40 6 C30 22 18 28 18 44 C18 56 28 64 40 76 C52 64 62 56 62 44 C62 28 50 22 40 6 Z"
            fill="url(#introFlame)"
          />
        </svg>
        <div className="mt-5 heading text-3xl tracking-[0.2em] text-bone-50">
          MCT <span className="editorial text-flame-400">2000</span>
        </div>
        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.4em] text-bone-50/40">
          démarrage
        </div>
      </div>
    </div>
  );
}
