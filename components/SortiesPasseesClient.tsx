"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Camera,
  Send,
  Loader2,
  PlusCircle,
  X,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { getSupabaseBrowser, supabaseConfigured } from "@/lib/supabase/client";
import { isDemo, demoMe, demoPastOutings, type DemoPastOuting } from "@/lib/demo";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

type PastOuting = {
  id: string;
  title: string;
  date: Date;
  year: number;
  location: string | null;
  distance_km: number | null;
  cover_image_url: string | null;
  photo_count: number;
  going_count: number;
  description: string | null;
  source: "event" | "submission";
  pseudo?: string;
  level?: string | null;
};

type MySubmission = {
  id: string;
  title: string;
  ride_date: string;
  status: "pending" | "approved" | "rejected";
  admin_note: string | null;
  created_at: string;
};

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function formatDate(d: Date) {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function demoToOuting(d: DemoPastOuting): PastOuting {
  return {
    ...d,
    date: new Date(d.date + "T12:00:00"),
  };
}

// ─────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────

export default function SortiesPasseesClient() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [outings, setOutings] = useState<PastOuting[]>(
    isDemo ? demoPastOutings.map(demoToOuting) : [],
  );
  const [userId, setUserId] = useState<string | null>(isDemo ? demoMe.id : null);
  const [mySubmissions, setMySubmissions] = useState<MySubmission[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(!isDemo && supabaseConfigured);

  // ── Group by year descending ──
  const byYear = useMemo(() => {
    const map = new Map<number, PastOuting[]>();
    for (const o of outings) {
      if (!map.has(o.year)) map.set(o.year, []);
      map.get(o.year)!.push(o);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [outings]);

  // ── Fetch data ──
  async function fetchAll(uid: string | null) {
    if (!supabase || isDemo) return;

    const [{ data: pastEvents }, { data: approvedSubs }] = await Promise.all([
      supabase
        .from("events_with_counts")
        .select("*")
        .lt("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: false }),
      supabase
        .from("ride_submissions_with_pseudo")
        .select("*")
        .eq("status", "approved")
        .order("ride_date", { ascending: false }),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const evArr: PastOuting[] = (pastEvents ?? []).map((e: any) => ({
      id: `ev-${e.id}`,
      title: e.title,
      date: new Date(e.starts_at),
      year: new Date(e.starts_at).getFullYear(),
      location: e.location,
      distance_km: e.distance_km,
      cover_image_url: e.cover_image_url,
      photo_count: e.photo_count ?? 0,
      going_count: e.going_count ?? 0,
      description: e.description,
      source: "event" as const,
      level: e.level,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subArr: PastOuting[] = (approvedSubs ?? []).map((s: any) => ({
      id: `sub-${s.id}`,
      title: s.title,
      date: new Date(s.ride_date + "T12:00:00"),
      year: new Date(s.ride_date).getFullYear(),
      location: s.location,
      distance_km: s.distance_km,
      cover_image_url: s.cover_image_url,
      photo_count: 0,
      going_count: 0,
      description: s.description,
      source: "submission" as const,
      pseudo: s.pseudo,
      level: null,
    }));

    setOutings(
      [...evArr, ...subArr].sort((a, b) => b.date.getTime() - a.date.getTime()),
    );

    if (uid) {
      const { data: mine } = await supabase
        .from("ride_submissions")
        .select("id, title, ride_date, status, admin_note, created_at")
        .eq("submitted_by", uid)
        .order("created_at", { ascending: false });
      setMySubmissions((mine ?? []) as MySubmission[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (!supabase || isDemo) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id ?? null;
      setUserId(uid);
      await fetchAll(uid);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  function onSubmitted() {
    setShowForm(false);
    if (supabase && userId) {
      supabase
        .from("ride_submissions")
        .select("id, title, ride_date, status, admin_note, created_at")
        .eq("submitted_by", userId)
        .order("created_at", { ascending: false })
        .then(({ data }) => setMySubmissions((data ?? []) as MySubmission[]));
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-flame-400" />
      </div>
    );
  }

  const totalOutings = outings.length;
  const totalPhotos = outings.reduce((s, o) => s + o.photo_count, 0);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      {/* ── Page header ── */}
      <div className="mb-4">
        <div className="chip mb-3">Archives</div>
        <h1 className="heading text-[clamp(3rem,10vw,7rem)] leading-[0.92] tracking-tight">
          Sorties passées<span className="text-flame-500">.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-white/60">
          {isDemo
            ? "Aperçu démo — données fictives. Connecte Supabase pour les vraies archives du club."
            : `${totalOutings} sorties archivées · ${totalPhotos} photos de route`}
        </p>
      </div>

      {/* ── Stats chips ── */}
      <div className="mb-12 flex flex-wrap gap-3">
        <span className="chip">
          <Users className="h-3 w-3" /> {totalOutings} sorties
        </span>
        {totalPhotos > 0 && (
          <span className="chip border-flame-500/30 text-flame-300">
            <Camera className="h-3 w-3" /> {totalPhotos} photos
          </span>
        )}
        {byYear.length > 0 && (
          <span className="chip">
            Depuis {byYear[byYear.length - 1]?.[0] ?? "—"}
          </span>
        )}
      </div>

      {/* ── Year groups ── */}
      {byYear.length === 0 && !isDemo && (
        <div className="rounded-2xl border border-white/10 bg-ink-900/60 py-24 text-center text-white/40">
          <p className="text-lg">Aucune sortie archivée pour l'instant.</p>
          <p className="mt-2 text-sm">
            Les sorties passées apparaissent automatiquement ici, et les membres peuvent en proposer via le
            formulaire ci-dessous.
          </p>
        </div>
      )}

      <div className="space-y-24">
        {byYear.map(([year, list], yi) => (
          <YearSection key={year} year={year} outings={list} index={yi} />
        ))}
      </div>

      {/* ── My submissions status ── */}
      {mySubmissions.length > 0 && (
        <div className="mt-20 rounded-2xl border border-white/10 bg-ink-900/60 p-6">
          <h2 className="heading mb-4 text-2xl">Mes propositions</h2>
          <div className="space-y-3">
            {mySubmissions.map((s) => (
              <div
                key={s.id}
                className={cn(
                  "flex flex-wrap items-center gap-3 rounded-xl border p-3 text-sm",
                  s.status === "approved"
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : s.status === "rejected"
                      ? "border-red-500/30 bg-red-500/10"
                      : "border-amber-500/30 bg-amber-500/10",
                )}
              >
                {s.status === "approved" ? (
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : s.status === "rejected" ? (
                  <X className="h-4 w-4 shrink-0 text-red-400" />
                ) : (
                  <Clock className="h-4 w-4 shrink-0 text-amber-400" />
                )}
                <span className="font-medium text-white">{s.title}</span>
                <span className="text-white/50">{s.ride_date}</span>
                <span
                  className={cn(
                    "ml-auto rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider",
                    s.status === "approved"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : s.status === "rejected"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-amber-500/20 text-amber-300",
                  )}
                >
                  {s.status === "approved"
                    ? "Approuvée"
                    : s.status === "rejected"
                      ? "Refusée"
                      : "En attente"}
                </span>
                {s.admin_note && (
                  <p className="w-full pl-7 text-white/50">{s.admin_note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Submission CTA ── */}
      <div className="mt-20 rounded-2xl border border-flame-500/20 bg-gradient-to-br from-flame-500/5 to-transparent p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="heading text-3xl">Une sortie à partager ?</h2>
            <p className="mt-2 max-w-xl text-white/60">
              Tu as participé à une sortie mémorable ? Propose-la ici — elle sera validée par un
              officier avant d'être publiée dans les archives.
            </p>
          </div>
          {userId ? (
            <button
              onClick={() => setShowForm((v) => !v)}
              className="btn-primary flex items-center gap-2"
            >
              {showForm ? (
                <>
                  <X className="h-4 w-4" /> Annuler
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" /> Proposer une sortie
                </>
              )}
            </button>
          ) : (
            <Link href="/login" className="btn-primary">
              Se connecter pour proposer
            </Link>
          )}
        </div>

        <AnimatePresence>
          {showForm && userId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-8 border-t border-white/10 pt-8">
                <SubmitForm
                  userId={userId}
                  onSuccess={onSubmitted}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// Year section with big typography
// ─────────────────────────────────────────────────

function YearSection({
  year,
  outings,
  index,
}: {
  year: number;
  outings: PastOuting[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      {/* ── Giant year header ── */}
      <div className="relative mb-8 flex items-end gap-6 overflow-hidden">
        {/* Massive outlined year — editorial watermark */}
        <span
          className="pointer-events-none select-none font-display font-black leading-none tracking-tighter text-transparent"
          style={{
            fontSize: "clamp(5rem, 22vw, 16rem)",
            WebkitTextStroke: "1.5px rgba(239,97,21,0.18)",
          }}
          aria-hidden
        >
          {year}
        </span>
        {/* Overlay pill */}
        <div className="absolute left-4 bottom-5 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-white/30">
            {outings.length} sortie{outings.length > 1 ? "s" : ""}
          </span>
          <span className="h-px w-12 bg-flame-500/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-flame-500/60">
            {year}
          </span>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {outings.map((o, i) => (
          <OutingCard key={o.id} outing={o} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────
// Individual outing card
// ─────────────────────────────────────────────────

function OutingCard({ outing, index }: { outing: PastOuting; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 transition-all hover:border-flame-500/30 hover:-translate-y-0.5"
    >
      {/* Cover */}
      {outing.cover_image_url ? (
        <div className="relative h-44 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={outing.cover_image_url}
            alt={outing.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
          {/* Date badge */}
          <div className="absolute bottom-3 left-4">
            <span className="rounded-full bg-ink-950/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70 backdrop-blur">
              {formatDate(outing.date)}
            </span>
          </div>
          {/* Photo count */}
          {outing.photo_count > 0 && (
            <div className="absolute right-3 top-3">
              <span className="flex items-center gap-1 rounded-full bg-ink-950/80 px-2 py-0.5 font-mono text-[10px] text-flame-300 backdrop-blur">
                <Camera className="h-2.5 w-2.5" /> {outing.photo_count}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* No cover — date-centric block */
        <div className="flex h-24 items-center justify-between bg-midnight-800/60 px-5">
          <div>
            <div className="heading text-4xl gradient-text leading-none">
              {outing.date.getDate()}
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-white/40">
              {outing.date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
            </div>
          </div>
          {outing.photo_count > 0 && (
            <span className="flex items-center gap-1 rounded-full border border-flame-500/30 px-2 py-0.5 text-[10px] text-flame-300">
              <Camera className="h-2.5 w-2.5" /> {outing.photo_count}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className="p-5">
        {/* Source badge */}
        {outing.source === "submission" && outing.pseudo && (
          <div className="mb-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
            <span className="h-1 w-1 rounded-full bg-flame-500/60" />
            Partagé par {outing.pseudo}
          </div>
        )}

        <h3 className="heading text-xl leading-snug tracking-wide">{outing.title}</h3>

        {/* Meta */}
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/50">
          {outing.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {outing.location}
            </span>
          )}
          {outing.distance_km && (
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 text-center text-[9px] leading-3">km</span>{" "}
              {outing.distance_km} km
            </span>
          )}
          {outing.level && <span className="chip py-0 text-[10px]">{outing.level}</span>}
          {outing.going_count > 0 && (
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> {outing.going_count} motards
            </span>
          )}
        </div>

        {/* Description — expandable */}
        {outing.description && (
          <>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.p
                  key="desc"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 overflow-hidden text-sm text-white/60"
                >
                  {outing.description}
                </motion.p>
              )}
            </AnimatePresence>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 flex items-center gap-1 text-[11px] text-flame-400/70 hover:text-flame-400 transition-colors"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-3 w-3" /> Moins
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" /> Lire le récit
                </>
              )}
            </button>
          </>
        )}
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────
// Member submission form
// ─────────────────────────────────────────────────

function SubmitForm({
  userId,
  onSuccess,
  onCancel,
}: {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState<number | "">("");
  const [cover, setCover] = useState("");
  const [desc, setDesc] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isDemo) {
      alert("Mode démo — connecte Supabase pour soumettre une sortie.");
      return;
    }
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.from("ride_submissions").insert({
      submitted_by: userId,
      title,
      ride_date: date,
      location: location || null,
      distance_km: distance === "" ? null : distance,
      cover_image_url: cover || null,
      description: desc || null,
    });
    setBusy(false);
    if (err) {
      setError(err.message);
    } else {
      onSuccess();
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
      {/* Title */}
      <div className="md:col-span-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">
            Titre de la sortie <span className="text-flame-400">*</span>
          </span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="Balade dominicale — Cirque de Mourèze"
            maxLength={200}
          />
        </label>
      </div>

      {/* Date */}
      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">
          Date <span className="text-flame-400">*</span>
        </span>
        <input
          required
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().slice(0, 10)}
          className="input"
        />
      </label>

      {/* Distance */}
      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">
          Distance (km)
        </span>
        <input
          type="number"
          min={1}
          max={9999}
          value={distance}
          onChange={(e) =>
            setDistance(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="input"
          placeholder="90"
        />
      </label>

      {/* Location */}
      <div className="md:col-span-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">
            Lieu / parcours
          </span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
            placeholder="Castellane → Moustiers-Sainte-Marie"
          />
        </label>
      </div>

      {/* Cover URL */}
      <div className="md:col-span-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">
            Photo de couverture (URL) — optionnel
          </span>
          <input
            type="url"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            className="input"
            placeholder="https://i.imgur.com/..."
          />
          <span className="mt-1 block text-[10px] text-white/30">
            Héberge sur imgur.com et colle le lien direct
          </span>
        </label>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            className="mt-2 h-28 w-full rounded-lg border border-white/10 object-cover"
          />
        )}
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">
            Récit — optionnel
          </span>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="input min-h-[100px]"
            placeholder="Raconte la sortie en quelques phrases…"
            maxLength={2000}
          />
        </label>
      </div>

      {/* Notice */}
      <div className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-200/80 md:col-span-2">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
        Ta proposition sera relue par un officier avant d'être publiée. Tu recevras un statut dans "Mes
        propositions" ci-dessus.
      </div>

      {error && (
        <p className="text-sm text-red-400 md:col-span-2">{error}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 md:col-span-2">
        <button
          type="submit"
          disabled={busy || isDemo}
          className="btn-primary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
          title={isDemo ? "Désactivé en mode démo" : undefined}
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Send className="h-4 w-4" />
              {isDemo ? "🎬 Démo — Envoyer" : "Envoyer pour validation"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-white/40 hover:text-white"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
