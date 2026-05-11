"use client";

import { useEffect, useRef } from "react";
import { rides, clubBase } from "@/lib/rides";

// Leaflet is loaded dynamically to keep static export happy (no SSR).
export default function ClubMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | null = null;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      // Inject Leaflet CSS once
      const id = "leaflet-css";
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";
        document.head.appendChild(link);
      }
      if (cancelled || !ref.current) return;

      map = L.map(ref.current, {
        center: [clubBase.lat, clubBase.lon],
        zoom: 9,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      // Dark tile layer (CARTO Dark Matter) — free, no key
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Club base marker (flame icon)
      const baseIcon = L.divIcon({
        html: `<div style="background: linear-gradient(135deg, #ff5410, #c72b07); border: 2px solid #fff; border-radius: 50%; width: 32px; height: 32px; display: grid; place-items: center; box-shadow: 0 0 20px rgba(255,84,16,0.7);"><span style="color:#fff;font-weight:bold;font-size:14px;">🏍</span></div>`,
        className: "club-base-icon",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      L.marker([clubBase.lat, clubBase.lon], { icon: baseIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: system-ui; color:#06060a;"><strong>${clubBase.name}</strong><br/>${clubBase.city}</div>`,
        );

      // Ride markers
      rides.forEach((r) => {
        const icon = L.divIcon({
          html: `<div style="background: rgba(255,84,16,0.85); border: 1px solid #fff; border-radius: 50%; width: 18px; height: 18px; box-shadow: 0 0 10px rgba(255,84,16,0.6);"></div>`,
          className: "ride-icon",
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });
        L.marker([r.lat, r.lon], { icon })
          .addTo(map!)
          .bindPopup(
            `<div style="font-family: system-ui; color:#06060a; min-width:180px;">
              <strong>${r.title}</strong><br/>
              <small>${r.distance_km} km · ${r.duration} · ${r.level}</small>
            </div>`,
          );
      });

      cleanup = () => {
        map?.remove();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60"
      style={{ position: "relative" }}
    />
  );
}
