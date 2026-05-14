"use client";

import { useEffect, useRef, useState } from "react";
import { rides, clubBase, ROUTE_COLORS } from "@/lib/rides";

interface Props {
  /** If provided, only highlight this one ride (e.g. from an event page) */
  activeId?: string;
  /** Extra waypoints to display (for custom event routes) */
  customWaypoints?: [number, number][];
  customLabel?: string;
  /** Height class (default: aspect-[16/9]) */
  heightClass?: string;
}

export default function ClubMap({
  activeId,
  customWaypoints,
  customLabel,
  heightClass,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeRide, setActiveRide] = useState<string | null>(activeId ?? null);

  useEffect(() => {
    let map: import("leaflet").Map | null = null;
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const polylineRefs: Record<string, any> = {};

    (async () => {
      const L = (await import("leaflet")).default;

      // Inject Leaflet CSS once
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";
        document.head.appendChild(link);
      }

      if (cancelled || !ref.current) return;

      map = L.map(ref.current, {
        center: [clubBase.lat, clubBase.lon],
        zoom: activeId || customWaypoints ? 10 : 9,
        scrollWheelZoom: false,
        attributionControl: true,
        zoomControl: true,
      });

      // Dark CARTO tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // ── Custom event waypoints (single route, no library) ──
      if (customWaypoints && customWaypoints.length > 1) {
        const line = L.polyline(customWaypoints as [number, number][], {
          color: "#ff5410",
          weight: 4,
          opacity: 0.9,
          lineJoin: "round",
          lineCap: "round",
          dashArray: undefined,
        }).addTo(map);

        if (customLabel) {
          line.bindPopup(
            `<div style="font-family:system-ui;color:#06060a;font-weight:bold;">${customLabel}</div>`,
          );
        }

        // Start / end markers
        const endIcon = L.divIcon({
          html: `<div style="background:#ff5410;border:2px solid #fff;border-radius:50%;width:14px;height:14px;box-shadow:0 0 8px rgba(255,84,16,0.8);"></div>`,
          className: "",
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        L.marker(customWaypoints[0] as [number, number], { icon: endIcon }).addTo(map);
        L.marker(customWaypoints[customWaypoints.length - 1] as [number, number], { icon: endIcon }).addTo(map);
        map.fitBounds(line.getBounds(), { padding: [30, 30] });
        return;
      }

      // ── Club base marker ──
      const baseIcon = L.divIcon({
        html: `<div style="background:linear-gradient(135deg,#ff5410,#c72b07);border:2px solid #fff;border-radius:50%;width:32px;height:32px;display:grid;place-items:center;box-shadow:0 0 20px rgba(255,84,16,0.7);">
                 <span style="font-size:15px;">🏍</span>
               </div>`,
        className: "club-base-icon",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      L.marker([clubBase.lat, clubBase.lon], { icon: baseIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:system-ui;color:#06060a;">
             <strong>${clubBase.name}</strong><br/>
             <small>${clubBase.address}</small><br/>
             <small>${clubBase.city}</small>
           </div>`,
        );

      // ── Draw all ride polylines ──
      rides.forEach((ride, idx) => {
        const isActive = activeId ? ride.id === activeId : false;
        const color = ROUTE_COLORS[idx % ROUTE_COLORS.length];

        const line = L.polyline(ride.waypoints, {
          color,
          weight: isActive ? 5 : 3,
          opacity: isActive ? 1 : 0.55,
          lineJoin: "round",
          lineCap: "round",
        }).addTo(map!);

        polylineRefs[ride.id] = { line, color };

        // Popup on line click
        line.on("click", () => {
          setActiveRide(ride.id);
        });

        line.bindTooltip(
          `<strong>${ride.title}</strong><br/>${ride.distance_km} km · ${ride.level}`,
          { sticky: true, opacity: 0.95 },
        );

        // Label marker at center lat/lon
        const labelIcon = L.divIcon({
          html: `<div style="background:rgba(15,20,36,0.88);border:1px solid ${color};border-radius:20px;padding:2px 7px;white-space:nowrap;font-family:system-ui;font-size:10px;color:#fff;font-weight:600;backdrop-filter:blur(4px);">${ride.distance_km} km</div>`,
          className: "ride-label",
          iconSize: undefined,
          iconAnchor: [28, 10],
        });
        L.marker([ride.lat, ride.lon], { icon: labelIcon, interactive: false }).addTo(map!);
      });

      // If an activeId is set, zoom to that route
      if (activeId && polylineRefs[activeId]) {
        map.fitBounds(polylineRefs[activeId].line.getBounds(), { padding: [40, 40] });
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // When activeRide changes, re-style polylines
  useEffect(() => {
    // Polylines are managed inside the async block above;
    // re-mounting when activeRide changes is handled by key on parent.
    // Lightweight: we don't re-mount, just let the state drive a re-render
    // that displays the detail panel below the map.
  }, [activeRide]);

  const selectedRide = rides.find((r) => r.id === activeRide) ?? null;

  return (
    <div className="space-y-3">
      <div
        ref={ref}
        className={
          heightClass ??
          "aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60"
        }
        style={{ position: "relative" }}
      />

      {/* Quick legend + active ride info */}
      {!customWaypoints && (
        <div className="flex flex-wrap gap-2">
          {rides.map((r, idx) => {
            const color = ROUTE_COLORS[idx % ROUTE_COLORS.length];
            const isActive = activeRide === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRide(isActive ? null : r.id)}
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-all"
                style={{
                  borderColor: isActive ? color : "rgba(255,255,255,0.1)",
                  backgroundColor: isActive ? `${color}22` : "transparent",
                  color: isActive ? color : "rgba(255,255,255,0.5)",
                }}
              >
                <span
                  className="inline-block h-1.5 w-4 rounded-full"
                  style={{ background: color }}
                />
                {r.title.split("—")[0].trim()}
              </button>
            );
          })}
        </div>
      )}

      {/* Selected route detail */}
      {selectedRide && !customWaypoints && (
        <div
          className="rounded-xl border p-4 text-sm transition-all"
          style={{ borderColor: `${ROUTE_COLORS[rides.findIndex((r) => r.id === selectedRide.id) % ROUTE_COLORS.length]}40` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="heading text-lg">{selectedRide.title}</div>
              <div className="mt-0.5 text-xs text-white/40">{selectedRide.region}</div>
              <p className="mt-2 text-white/70">{selectedRide.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedRide.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="heading text-3xl text-flame-400">{selectedRide.distance_km}</div>
              <div className="text-[10px] text-white/40">km</div>
              <div className="mt-1 font-mono text-[10px] text-white/40">{selectedRide.duration}</div>
              <span className="mt-1 block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-white/50">
                {selectedRide.level}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
