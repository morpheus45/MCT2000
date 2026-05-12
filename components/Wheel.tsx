"use client";

import { useEffect, useRef } from "react";

// Decorative motorcycle wheel SVG that rotates based on scroll position.
export default function Wheel({ size = 280, className = "" }: { size?: number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    let rafId = 0;
    let target = 0;
    let current = 0;
    const onScroll = () => {
      target = window.scrollY * 0.4;
    };
    const tick = () => {
      current += (target - current) * 0.08;
      if (ref.current) ref.current.style.transform = `rotate(${current}deg)`;
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const spokes = Array.from({ length: 24 });
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - 4;
  const rHub = size * 0.08;
  const rRim = size * 0.42;
  const rTire = size * 0.48;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      style={{ display: "block", willChange: "transform" }}
    >
      <defs>
        <radialGradient id="tireGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="60%" stopColor="#101019" />
          <stop offset="100%" stopColor="#06060a" />
        </radialGradient>
        <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d2a256" />
          <stop offset="50%" stopColor="#f2d99a" />
          <stop offset="100%" stopColor="#946614" />
        </linearGradient>
      </defs>

      {/* Tire */}
      <circle cx={cx} cy={cy} r={rOuter} fill="url(#tireGrad)" stroke="#1a1a26" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={rTire} fill="none" stroke="#1a1a26" strokeWidth="6" />

      {/* Inner rim */}
      <circle cx={cx} cy={cy} r={rRim} fill="none" stroke="url(#rimGrad)" strokeWidth="3" />

      {/* Spokes */}
      {spokes.map((_, i) => {
        const a = (i * 360) / spokes.length;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - rRim + 2}
            stroke="#d2a256"
            strokeWidth="1.2"
            strokeOpacity="0.85"
            transform={`rotate(${a} ${cx} ${cy})`}
          />
        );
      })}

      {/* Hub */}
      <circle cx={cx} cy={cy} r={rHub * 1.4} fill="#06060a" stroke="#946614" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={rHub} fill="url(#rimGrad)" />
      <circle cx={cx} cy={cy} r={rHub * 0.35} fill="#06060a" />

      {/* Tread highlights */}
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i * 360) / 36;
        const inner = rTire - 6;
        const outer = rOuter - 2;
        const rad = (a * Math.PI) / 180;
        const x1 = (cx + Math.cos(rad) * inner).toFixed(2);
        const y1 = (cy + Math.sin(rad) * inner).toFixed(2);
        const x2 = (cx + Math.cos(rad) * outer).toFixed(2);
        const y2 = (cy + Math.sin(rad) * outer).toFixed(2);
        return (
          <line
            key={`tr-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#363640"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
}
