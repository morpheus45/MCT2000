"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Check, Loader2 } from "lucide-react";
import { getSupabaseBrowser, supabaseConfigured } from "@/lib/supabase/client";
import { isDemo, demoMe, demoEvents } from "@/lib/demo";
import { cn } from "@/lib/utils";

type EventRow = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  location: string | null;
  distance_km: number | null;
  level: string | null;
  cover_image_url: string | null;
  going_count: number;
  photo_count?: number;
  my_status: string | null;
};

// Fallback / seed events for first-run / static export without DB
const seed: EventRow[] = [
  { id: "e1", title: "Sortie matinale — Gorges du Verdon", starts_at: "2026-05-18T09:00:00Z", location: "Castellane → Moustiers-Sainte-Marie", distance_km: 180, level: "Facile", cover_image_url: null, going_count: 14, my_status: null, description: null },
  { id: "e2", title: "Atelier mécanique — chaîne & pignons", starts_at: "2026-05-25T14:00:00Z", location: "Atelier Marc, Lyon 7e", distance_km: null, level: "Tous niveaux", cover_image_url: null, going_count: 8, my_status: null, description: null },
  { id: "e3", title: "Road-trip — Col de la Bonette", starts_at: "2026-06-01T08:00:00Z", location: "Saint-Étienne-de-Tinée → Jausiers", distance_km: 260, level: "Intermédiaire", cover_image_url: null, going_count: 22, my_status: null, description: null },
  { id: "e4", title: "Sortie de nuit — pleine lune", starts_at: "2026-06-14T22:00:00Z", location: "Départ Vieux-Lyon", distance_km: 120, level: "Confirmé", cover_image_url: null, going_count: 11, my_status: null, description: null },
  { id: "e5", title: "Week-end Pyrénées", starts_at: "2026-07-04T08:00:00Z", location: "Tarbes → Andorre", distance_km: 650, level: "Confirmé", cover_image_url: null, going_count: 18, my_status: null, description: null },
];

export default function EventsClient() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [events, setEvents] = useState<EventRow[]>(isDemo ? demoEvents : seed);
  const [userId, setUserId] = useState<string | null>(isDemo ? demoMe.id : null);
  const [pending, setPending] = useState<string | null>(null);

  async function refresh() {
    if (!supabase || isDemo) return;
    const { data } = await supabase
      .from("events_with_counts")
      .select("*")
      .gte("starts_at", new Date(Date.now() - 86400_000).toISOString())
      .order("starts_at", { ascending: true });
    if (data && data.length > 0) setEvents(data as EventRow[]);
  }

  useEffect(() => {
    if (!supabase || isDemo) return;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      setUserId(u.user?.id ?? null);
      await refresh();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function rsvp(eventId: string, currentlyGoing: boolean) {
    if (isDemo) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? {
                ...e,
                my_status: currentlyGoing ? null : "going",
                going_count: e.going_count + (currentlyGoing ? -1 : 1),
              }
            : e,
        ),
      );
      return;
    }
    if (!supabase || !userId) return;
    setPending(eventId);
    if (currentlyGoing) {
      await supabase.from("event_rsvps").delete().eq("event_id", eventId).eq("user_id", userId);
    } else {
      await supabase.from("event_rsvps").upsert(
        { event_id: eventId, user_id: userId, status: "going" },
        { onConflict: "event_id,user_id" },
      );
    }
    await refresh();
    setPending(null);
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="mb-10">
        <div className="chip mb-3">Calendrier</div>
        <h1 className="heading text-6xl">Les sorties à venir.</h1>
        <p className="mt-3 max-w-xl text-white/60">
          {isDemo
            ? "Aperçu démo — tu peux tester l'inscription, ça reste local. Connecte Supabase pour les vraies données."
            : supabaseConfigured && events.length > 0
              ? "Inscris-toi en un clic. Le compteur est en temps réel."
              : "Connecte Supabase + crée des sorties depuis /admin pour activer l'inscription."}
        </p>
      </div>

      <div className="space-y-4">
        {events.map((e, i) => {
          const d = new Date(e.starts_at);
          const going = e.my_status === "going";
          return (
            <motion.article
              key={e.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="grid items-stretch gap-0 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 transition-all hover:border-flame-500/40 md:grid-cols-[200px_1fr_auto]"
            >
              {/* Cover image OR date block */}
              {e.cover_image_url ? (
                <div className="relative h-40 md:h-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.cover_image_url} alt={e.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-center">
                    <div className="heading text-4xl gradient-text leading-none">{d.getDate()}</div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                      {d.toLocaleDateString("fr-FR", { month: "short" })} ·{" "}
                      {d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center bg-midnight-800 p-6 text-center md:py-10">
                  <div className="heading text-5xl gradient-text">{d.getDate()}</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-white/50">
                    {d.toLocaleDateString("fr-FR", { month: "short" })}
                  </div>
                  <div className="text-[10px] text-white/30">
                    {d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              )}
              <div className="p-5">
                <h3 className="heading text-2xl tracking-wide">{e.title}</h3>
                {e.description && (
                  <p className="mt-1 text-sm text-white/60">{e.description}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/60">
                  {e.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {e.location}
                    </span>
                  )}
                  {e.distance_km && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {e.distance_km} km
                    </span>
                  )}
                  {e.level && <span className="chip">{e.level}</span>}
                  {(e.photo_count ?? 0) > 0 && (
                    <span className="chip border-flame-500/40 text-flame-300">
                      📸 {e.photo_count} photo{(e.photo_count ?? 0) > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end justify-center gap-2 p-5">
                <div className="flex items-center gap-1.5 text-sm text-white/60">
                  <Users className="h-3.5 w-3.5" /> {e.going_count} inscrits
                </div>
                {userId ? (
                  <button
                    onClick={() => rsvp(e.id, going)}
                    disabled={pending === e.id}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all",
                      going
                        ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                        : "btn-primary",
                    )}
                  >
                    {pending === e.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : going ? (
                      <>
                        <Check className="h-4 w-4" /> Inscrit
                      </>
                    ) : (
                      "S'inscrire"
                    )}
                  </button>
                ) : (
                  <Link href="/login" className="btn-primary px-5 py-2 text-sm">
                    Se connecter
                  </Link>
                )}
              </div>
            </motion.article>
          );
        })}
        {supabaseConfigured && events.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-ink-900/60 py-16 text-center text-white/50">
            Aucune sortie programmée — un officier peut en créer dans /admin.
          </div>
        )}
      </div>
    </section>
  );
}
