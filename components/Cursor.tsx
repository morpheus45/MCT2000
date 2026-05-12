"use client";

import { useEffect, useRef } from "react";

// Premium custom cursor: a tiny ring that lags slightly + a small flame dot at the tip.
// Auto-disables on touch devices and on form inputs / disabled buttons.
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
    };

    const tick = () => {
      // Smoothed lag for the ring
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive =
        t.closest("a, button, [role=button], input, textarea, select, label, [data-cursor=on]");
      if (interactive) {
        ring.classList.add("is-active");
      } else {
        ring.classList.remove("is-active");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnter);
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-flame-500/70 transition-[width,height,border-color] duration-300 will-change-transform [&.is-active]:h-12 [&.is-active]:w-12 [&.is-active]:border-flame-400 [&.is-active]:bg-flame-500/10"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[71] h-2 w-2 rounded-full bg-flame-400 shadow-[0_0_18px_rgba(255,84,16,0.9)] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </>
  );
}
