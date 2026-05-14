"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { Calendar, ImagePlus, Megaphone, Facebook, Loader2, Shield, ImageIcon, Trash2, ExternalLink, ClipboardCheck, CheckCircle, X as XIcon } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { isDemo, demoMe, demoPendingSubmissions } from "@/lib/demo";
import { cn, formatDateFr } from "@/lib/utils";

type Tab = "events" | "event-photos" | "post" | "gallery" | "import" | "validations";

type Profile = { id: string; pseudo: string; role: string };

type EventRow = {
  id: string;
  title: string;
  starts_at: string;
  location: string | null;
  cover_image_url: string | null;
};

export default function AdminClient() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [me, setMe] = useState<Profile | null>(isDemo ? demoMe : null);
  const [loading, setLoading] = useState(!isDemo);
  const [tab, setTab] = useState<Tab>("events");

  useEffect(() => {
    if (!supabase || isDemo) return;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) {
        setLoading(false);
        return;
      }
      const { data: p } = await supabase
        .from("profiles")
        .select("id, pseudo, role")
        .eq("id", u.user.id)
        .single();
      setMe(p as Profile);
      setLoading(false);
    })();
  }, [supabase]);

  if (loading) {
    return (
      <div className="grid place-items-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-flame-400" />
      </div>
    );
  }

  if (!me) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <Shield className="mx-auto mb-3 h-10 w-10 text-flame-400" />
        <h1 className="heading text-4xl">Espace réservé.</h1>
        <p className="mt-3 text-white/60">Connecte-toi pour accéder à l'admin.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login" className="btn-primary">Se connecter</Link>
        </div>
      </section>
    );
  }

  const isAdmin = me.role === "admin" || me.role === "officer";
  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <Shield className="mx-auto mb-3 h-10 w-10 text-amber-400" />
        <h1 className="heading text-4xl">Accès refusé.</h1>
        <p className="mt-3 text-white/60">
          Ton compte (<span className="text-white">{me.pseudo}</span>) n'est pas administrateur.
          Demande à un officier de te promouvoir, ou exécute dans Supabase :
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-black/40 p-4 text-left text-xs text-white/80">{`update public.profiles
set role = 'admin'
where pseudo = '${me.pseudo}';`}</pre>
      </section>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Calendar }[] = [
    { id: "events", label: "Sorties", icon: Calendar },
    { id: "event-photos", label: "Photos sorties", icon: ImageIcon },
    { id: "post", label: "Annonce", icon: Megaphone },
    { id: "gallery", label: "Galerie", icon: ImagePlus },
    { id: "import", label: "Import Facebook", icon: Facebook },
    { id: "validations", label: "Validations", icon: ClipboardCheck },
  ];

  return (
    <section className="mx-auto max-w-5xl px-5 py-12">
      <header className="mb-8 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-flame-500 to-flame-700">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <div className="chip mb-1">Admin · {me.pseudo}</div>
          <h1 className="heading text-4xl">Bureau du club.</h1>
        </div>
      </header>

      {isDemo && (
        <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
          🎬 <strong>Aperçu admin</strong> — tu es connecté en tant que <strong>{demoMe.pseudo} (admin)</strong> en mode démo. Les formulaires sont remplis d'exemples mais les boutons "Publier" sont désactivés tant que Supabase n'est pas connecté.
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === t.id
                ? "bg-flame-500/20 text-flame-200 border border-flame-500/40"
                : "text-white/60 hover:text-white",
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "events" && <CreateEvent />}
      {tab === "event-photos" && <EventPhotos />}
      {tab === "post" && <CreatePost />}
      {tab === "gallery" && <AddGalleryPhoto />}
      {tab === "import" && <FacebookImport />}
      {tab === "validations" && <ValidateSubmissions />}
    </section>
  );
}

// ---------- Sub-forms ----------

function Section({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-6">{children}</div>;
}

function Label({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[10px] text-white/40">{hint}</span>}
    </label>
  );
}

function CreateEvent() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [title, setTitle] = useState(isDemo ? "Balade dominicale — Cirque de Mourèze" : "");
  const [date, setDate] = useState(
    isDemo ? new Date(Date.now() + 86_400_000 * 14).toISOString().slice(0, 10) : "",
  );
  const [time, setTime] = useState("09:00");
  const [where, setWhere] = useState(isDemo ? "Café du marché — point de RDV club" : "");
  const [distance, setDistance] = useState<number | "">(isDemo ? 90 : "");
  const [level, setLevel] = useState("Facile");
  const [coverUrl, setCoverUrl] = useState(
    isDemo ? "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1400" : "",
  );
  const [desc, setDesc] = useState(
    isDemo ? "Café à 8h45, briefing court, départ groupé à 9h. Petite boucle de 90 km, photo au cirque, retour vers 13h." : "",
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isDemo) {
      alert("Mode démo — connecte Supabase pour activer la création de sorties (voir README).");
      return;
    }
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.from("events").insert({
      title,
      description: desc,
      starts_at: new Date(`${date}T${time}`).toISOString(),
      location: where,
      distance_km: distance === "" ? null : distance,
      level,
      cover_image_url: coverUrl || null,
    });
    setBusy(false);
    if (!error) {
      setOk(true);
      setTitle(""); setDate(""); setWhere(""); setDistance(""); setDesc(""); setCoverUrl("");
      setTimeout(() => setOk(false), 4000);
    } else {
      alert(error.message);
    }
  }

  return (
    <Section>
      <h2 className="heading mb-2 text-2xl">Nouvelle sortie</h2>
      <p className="mb-4 text-sm text-white/60">
        La sortie apparaîtra immédiatement dans <Link href="/events" className="text-flame-400 underline">/events</Link>.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <Label label="Titre">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="Sortie matinale Gorges du Verdon" />
        </Label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Label label="Date">
            <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
          </Label>
          <Label label="Heure de départ">
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input" />
          </Label>
        </div>
        <Label label="Lieu / parcours">
          <input value={where} onChange={(e) => setWhere(e.target.value)} className="input" placeholder="Castellane → Moustiers-Sainte-Marie" />
        </Label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Label label="Distance (km)">
            <input type="number" value={distance} onChange={(e) => setDistance(e.target.value === "" ? "" : Number(e.target.value))} className="input" placeholder="180" />
          </Label>
          <Label label="Niveau">
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="input">
              <option>Facile</option>
              <option>Intermédiaire</option>
              <option>Confirmé</option>
              <option>Tous niveaux</option>
            </select>
          </Label>
        </div>
        <Label
          label="Photo de couverture (URL)"
          hint="Colle l'URL d'une photo représentative. Tu pourras ajouter d'autres photos après dans l'onglet « Photos sorties »."
        >
          <input type="url" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className="input" placeholder="https://images.unsplash.com/..." />
        </Label>
        {coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverUrl} alt="" className="h-32 w-full rounded-lg border border-white/10 object-cover" />
        )}
        <Label label="Description">
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="input min-h-[100px]" placeholder="Café au point de RDV à 8h45, briefing, départ 9h..." />
        </Label>
        <div className="flex items-center gap-3">
          <button disabled={busy || isDemo} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed" title={isDemo ? "Désactivé en mode démo" : undefined}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : isDemo ? "🎬 Démo — Publier" : "Publier la sortie"}
          </button>
          {ok && <span className="text-sm text-emerald-400">✓ Sortie créée — visible sur /events</span>}
        </div>
      </form>
    </Section>
  );
}

// ---------- Photos par sortie ----------

type EventPhoto = {
  id: string;
  image_url: string;
  caption: string | null;
  taken_at: string | null;
};

function EventPhotos() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  // Form state for adding a photo to the selected event
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [takenAt, setTakenAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  const selectedEvent = events.find((e) => e.id === selectedEventId) ?? null;

  const refreshEvents = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("events")
      .select("id, title, starts_at, location, cover_image_url")
      .order("starts_at", { ascending: true });
    setEvents((data as EventRow[]) ?? []);
    setLoadingEvents(false);
  }, [supabase]);

  const refreshPhotos = useCallback(async () => {
    if (!supabase || !selectedEventId) {
      setPhotos([]);
      return;
    }
    setLoadingPhotos(true);
    const { data } = await supabase
      .from("gallery_photos")
      .select("id, image_url, caption, taken_at")
      .eq("event_id", selectedEventId)
      .order("created_at", { ascending: false });
    setPhotos((data as EventPhoto[]) ?? []);
    setLoadingPhotos(false);
  }, [supabase, selectedEventId]);

  useEffect(() => {
    if (isDemo) {
      // Pre-fill with a couple of demo events
      setEvents([
        { id: "demo-ev1", title: "Balade dominicale — Mourèze", starts_at: new Date().toISOString(), location: "Mourèze", cover_image_url: null },
        { id: "demo-ev2", title: "Téléthon — caritatif", starts_at: new Date().toISOString(), location: "100 km", cover_image_url: null },
      ]);
      setLoadingEvents(false);
      return;
    }
    refreshEvents();
  }, [refreshEvents]);

  useEffect(() => {
    if (isDemo) return;
    refreshPhotos();
  }, [refreshPhotos]);

  async function addPhoto(e: React.FormEvent) {
    e.preventDefault();
    if (isDemo) {
      alert("Mode démo — connecte Supabase pour ajouter une photo à une sortie.");
      return;
    }
    if (!supabase || !selectedEventId) {
      alert("Sélectionne d'abord une sortie ci-dessus.");
      return;
    }
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    setBusy(true);
    const { error } = await supabase.from("gallery_photos").insert({
      event_id: selectedEventId,
      image_url: imageUrl,
      caption: caption || null,
      taken_at: takenAt || null,
      added_by: u.user.id,
    });
    setBusy(false);
    if (!error) {
      setImageUrl(""); setCaption(""); setTakenAt("");
      setOk(true);
      setTimeout(() => setOk(false), 3000);
      await refreshPhotos();
    } else {
      alert(error.message);
    }
  }

  async function deletePhoto(photoId: string) {
    if (!supabase) return;
    if (!confirm("Supprimer cette photo ?")) return;
    const { error } = await supabase.from("gallery_photos").delete().eq("id", photoId);
    if (error) {
      alert(error.message);
      return;
    }
    await refreshPhotos();
  }

  return (
    <Section>
      <h2 className="heading mb-2 text-2xl">Photos par sortie</h2>
      <p className="mb-5 text-sm text-white/60">
        Ajoute des photos à une sortie spécifique. Elles apparaîtront sur sa fiche dans{" "}
        <Link href="/events" className="text-flame-400 underline">/events</Link>{" "}
        et dans la <Link href="/gallery" className="text-flame-400 underline">galerie</Link>.
      </p>

      {/* Event picker */}
      <Label label="Sortie à enrichir">
        {loadingEvents ? (
          <div className="flex items-center gap-2 text-sm text-white/40"><Loader2 className="h-4 w-4 animate-spin" /> Chargement…</div>
        ) : events.length === 0 ? (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-200">
            Aucune sortie en base. Commence par en créer une dans l'onglet <strong>Sorties</strong>.
          </div>
        ) : (
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="input"
          >
            <option value="">— Choisir une sortie —</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {formatDateFr(ev.starts_at)} · {ev.title}
              </option>
            ))}
          </select>
        )}
      </Label>

      {selectedEvent && (
        <>
          {/* Cover preview */}
          {selectedEvent.cover_image_url && (
            <div className="mt-4">
              <div className="mb-1 text-[10px] uppercase tracking-widest2 text-white/40">Couverture actuelle</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedEvent.cover_image_url}
                alt=""
                className="h-32 w-full rounded-lg border border-white/10 object-cover"
              />
            </div>
          )}

          {/* Add photo form */}
          <form onSubmit={addPhoto} className="mt-6 space-y-4 border-t border-white/10 pt-6">
            <h3 className="heading text-lg">Ajouter une photo à : <span className="text-flame-400">{selectedEvent.title}</span></h3>
            <Label label="URL de la photo" hint="Héberge sur imgur.com / Cloudinary / Supabase Storage et colle le lien direct.">
              <input required type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="input" placeholder="https://i.imgur.com/..." />
            </Label>
            {imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" className="h-32 w-full rounded-lg border border-white/10 object-cover" />
            )}
            <Label label="Légende — optionnel">
              <input value={caption} onChange={(e) => setCaption(e.target.value)} className="input" placeholder="Point de RDV au café du marché, 8h30" />
            </Label>
            <Label label="Date de la photo — optionnel">
              <input type="date" value={takenAt} onChange={(e) => setTakenAt(e.target.value)} className="input" />
            </Label>
            <div className="flex items-center gap-3">
              <button disabled={busy || isDemo} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : isDemo ? "🎬 Démo — Ajouter" : "Ajouter à cette sortie"}
              </button>
              {ok && <span className="text-sm text-emerald-400">✓ Photo ajoutée</span>}
            </div>
          </form>

          {/* Existing photos for this event */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="heading text-lg">Photos déjà liées ({photos.length})</h3>
              {selectedEventId && (
                <Link
                  href="/events"
                  className="inline-flex items-center gap-1 text-xs text-flame-400 hover:underline"
                >
                  Voir la sortie publiée <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
            {loadingPhotos ? (
              <div className="flex items-center gap-2 text-sm text-white/40"><Loader2 className="h-4 w-4 animate-spin" /> Chargement…</div>
            ) : photos.length === 0 ? (
              <p className="text-sm text-white/40">Aucune photo encore. Ajoute-en une ci-dessus.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((p) => (
                  <div key={p.id} className="group relative overflow-hidden rounded-lg border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image_url} alt={p.caption ?? ""} className="aspect-square w-full object-cover" />
                    {p.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-950 to-transparent p-2 text-[10px] text-white">
                        {p.caption}
                      </div>
                    )}
                    <button
                      onClick={() => deletePhoto(p.id)}
                      aria-label="Supprimer"
                      className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-ink-950/80 text-red-400 opacity-0 transition-opacity hover:bg-red-500/30 hover:text-white group-hover:opacity-100"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </Section>
  );
}

function CreatePost() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [content, setContent] = useState(
    isDemo
      ? "🏍️ Rappel : pensez à mettre à jour vos coordonnées dans /profile avant fin du mois pour la mise à jour du carnet de bord du club. Bonne route à tous !"
      : "",
  );
  const [imageUrl, setImageUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isDemo) {
      alert("Mode démo — connecte Supabase pour publier sur le feed (voir README).");
      return;
    }
    if (!supabase) return;
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    setBusy(true);
    const { error } = await supabase.from("posts").insert({
      user_id: u.user.id,
      content,
      image_url: imageUrl || null,
    });
    setBusy(false);
    if (!error) {
      setContent(""); setImageUrl("");
      setOk(true);
      setTimeout(() => setOk(false), 3000);
    } else {
      alert(error.message);
    }
  }

  return (
    <Section>
      <h2 className="heading mb-4 text-2xl">Annonce officielle</h2>
      <p className="mb-4 text-sm text-white/60">Le post apparaîtra sur le feed sous ton compte (badge admin).</p>
      <form onSubmit={submit} className="space-y-4">
        <Label label="Texte de l'annonce">
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} className="input min-h-[140px]" />
        </Label>
        <Label label="Image (URL) — optionnel">
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="input" placeholder="https://..." />
        </Label>
        <div className="flex items-center gap-3">
          <button disabled={busy || isDemo} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : isDemo ? "🎬 Démo — Publier" : "Publier"}
          </button>
          {ok && <span className="text-sm text-emerald-400">✓ Publié</span>}
        </div>
      </form>
    </Section>
  );
}

function AddGalleryPhoto() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [imageUrl, setImageUrl] = useState(
    isDemo ? "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1400" : "",
  );
  const [caption, setCaption] = useState(isDemo ? "Sortie Téléthon 2025 — départ devant la Mairie" : "");
  const [takenAt, setTakenAt] = useState(isDemo ? "2025-12-06" : "");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isDemo) {
      alert("Mode démo — connecte Supabase pour ajouter des photos à la galerie.");
      return;
    }
    if (!supabase) return;
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    setBusy(true);
    const { error } = await supabase.from("gallery_photos").insert({
      image_url: imageUrl,
      caption: caption || null,
      taken_at: takenAt || null,
      added_by: u.user.id,
    });
    setBusy(false);
    if (!error) {
      setImageUrl(""); setCaption(""); setTakenAt("");
      setOk(true);
      setTimeout(() => setOk(false), 3000);
    } else {
      alert(error.message);
    }
  }

  return (
    <Section>
      <h2 className="heading mb-4 text-2xl">Ajouter une photo libre (sans sortie)</h2>
      <p className="mb-4 text-sm text-white/60">
        Pour une photo générale du club (pas liée à une sortie précise). Pour lier une photo à une
        sortie, utilise l'onglet <strong>Photos sorties</strong>.
        <br />
        Héberge tes photos sur{" "}
        <a className="text-flame-400 underline" href="https://imgur.com" target="_blank" rel="noreferrer">imgur.com</a>{" "}
        si besoin.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <Label label="URL de l'image">
          <input required type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="input" />
        </Label>
        <Label label="Légende">
          <input value={caption} onChange={(e) => setCaption(e.target.value)} className="input" placeholder="Sortie au Col du Galibier — juillet 2024" />
        </Label>
        <Label label="Date de la photo">
          <input type="date" value={takenAt} onChange={(e) => setTakenAt(e.target.value)} className="input" />
        </Label>
        <div className="flex items-center gap-3">
          <button disabled={busy || isDemo} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : isDemo ? "🎬 Démo — Ajouter" : "Ajouter à la galerie"}
          </button>
          {ok && <span className="text-sm text-emerald-400">✓ Ajoutée</span>}
        </div>
      </form>
    </Section>
  );
}

function FacebookImport() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [text, setText] = useState(
    isDemo
      ? "Belle journée à tous, nous avons fait une superbe balade autour du lac du Salagou ce matin. Une trentaine de motards au total, soleil au RDV et bonne ambiance ! Merci à tous pour ce partage. Rendez-vous le mois prochain pour la prochaine sortie."
      : "",
  );
  const [imageUrl, setImageUrl] = useState(
    isDemo ? "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200" : "",
  );
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  async function importPost(e: React.FormEvent) {
    e.preventDefault();
    if (isDemo) {
      alert("Mode démo — connecte Supabase pour importer les posts Facebook.");
      return;
    }
    if (!supabase) return;
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    setBusy(true);
    const { error } = await supabase.from("posts").insert({
      user_id: u.user.id,
      content: text,
      image_url: imageUrl || null,
    });
    setBusy(false);
    if (!error) {
      setText(""); setImageUrl("");
      setOk(true);
      setTimeout(() => setOk(false), 3000);
    } else {
      alert(error.message);
    }
  }

  return (
    <Section>
      <h2 className="heading mb-2 text-2xl">Importer un post Facebook</h2>
      <p className="mb-4 text-sm text-white/60">
        Facebook ne permet pas d'import automatique (CGU + login wall). Méthode rapide :
      </p>
      <ol className="mb-5 list-decimal space-y-1 pl-5 text-sm text-white/70">
        <li>Ouvre un post sur{" "}
          <a className="text-flame-400 underline" href="https://www.facebook.com/groups/531676370210673/" target="_blank" rel="noreferrer">
            facebook.com/groups/531676370210673
          </a>
        </li>
        <li>Copie le texte du post</li>
        <li>Clic droit sur la photo → "Copier l'adresse de l'image"</li>
        <li>Colle ci-dessous et publie</li>
      </ol>
      <form onSubmit={importPost} className="space-y-4">
        <Label label="Texte du post Facebook">
          <textarea required value={text} onChange={(e) => setText(e.target.value)} className="input min-h-[140px]" />
        </Label>
        <Label label="URL de l'image (optionnel)">
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="input" placeholder="https://scontent..." />
        </Label>
        <div className="flex items-center gap-3">
          <button disabled={busy || isDemo} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : isDemo ? "🎬 Démo — Importer" : "Importer"}
          </button>
          {ok && <span className="text-sm text-emerald-400">✓ Post importé</span>}
        </div>
      </form>
    </Section>
  );
}

// ---------- Validations (member-submitted past outings) ----------

type SubmissionRow = {
  id: string;
  title: string;
  description: string | null;
  ride_date: string;
  location: string | null;
  distance_km: number | null;
  cover_image_url: string | null;
  status: "pending" | "approved" | "rejected";
  admin_note: string | null;
  created_at: string;
  pseudo?: string;
};

function ValidateSubmissions() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [subs, setSubs] = useState<SubmissionRow[]>(
    isDemo ? (demoPendingSubmissions as SubmissionRow[]) : [],
  );
  const [loading, setLoading] = useState(!isDemo);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const refresh = useCallback(async () => {
    if (!supabase || isDemo) return;
    setLoading(true);
    const { data } = await supabase
      .from("ride_submissions_with_pseudo")
      .select("*")
      .order("created_at", { ascending: false });
    setSubs((data ?? []) as SubmissionRow[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (isDemo) { setLoading(false); return; }
    refresh();
  }, [refresh]);

  async function decide(id: string, newStatus: "approved" | "rejected") {
    if (isDemo) {
      alert("Mode démo — connecte Supabase pour valider des propositions.");
      return;
    }
    if (!supabase) return;
    setBusy(id);
    const { data: u } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("ride_submissions")
      .update({
        status: newStatus,
        admin_note: notes[id] || null,
        reviewed_by: u.user?.id ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);
    setBusy(null);
    if (error) {
      alert(error.message);
    } else {
      await refresh();
    }
  }

  const filtered = filter === "all" ? subs : subs.filter((s) => s.status === filter);
  const pendingCount = subs.filter((s) => s.status === "pending").length;

  return (
    <Section>
      <h2 className="heading mb-1 text-2xl">Validations — Sorties passées</h2>
      <p className="mb-5 text-sm text-white/60">
        Les membres peuvent proposer leurs propres souvenirs de sorties. Approuve ou refuse ici.{" "}
        <Link href="/sorties-passees" className="text-flame-400 underline">
          Voir la page publique
        </Link>
      </p>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap gap-2">
        {(["pending", "all", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              filter === f
                ? "bg-flame-500/20 text-flame-200 border border-flame-500/40"
                : "text-white/50 hover:text-white",
            )}
          >
            {f === "pending"
              ? `En attente${pendingCount > 0 ? ` (${pendingCount})` : ""}`
              : f === "all"
                ? "Toutes"
                : f === "approved"
                  ? "Approuvées"
                  : "Refusées"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Loader2 className="h-4 w-4 animate-spin" /> Chargement…
        </div>
      ) : filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-white/40">
          {filter === "pending"
            ? "Aucune proposition en attente."
            : "Aucune proposition dans cette catégorie."}
        </p>
      ) : (
        <div className="space-y-4">
          {filtered.map((s) => (
            <div
              key={s.id}
              className={cn(
                "rounded-xl border p-4",
                s.status === "approved"
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : s.status === "rejected"
                    ? "border-red-500/30 bg-red-500/5"
                    : "border-white/10 bg-ink-900/40",
              )}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider",
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
                    {s.pseudo && (
                      <span className="font-mono text-[10px] text-white/40">par {s.pseudo}</span>
                    )}
                  </div>
                  <h3 className="heading mt-1 text-lg">{s.title}</h3>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-white/50">
                    <span>{s.ride_date}</span>
                    {s.location && <span>· {s.location}</span>}
                    {s.distance_km && <span>· {s.distance_km} km</span>}
                  </div>
                </div>
                {s.cover_image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.cover_image_url}
                    alt=""
                    className="h-16 w-24 rounded-lg border border-white/10 object-cover"
                  />
                )}
              </div>

              {/* Description */}
              {s.description && (
                <p className="mt-2 text-sm text-white/60">{s.description}</p>
              )}

              {/* Actions — only for pending */}
              {s.status === "pending" && (
                <div className="mt-4 border-t border-white/10 pt-4">
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
                    Note admin (optionnel)
                  </label>
                  <input
                    value={notes[s.id] ?? ""}
                    onChange={(e) =>
                      setNotes((prev) => ({ ...prev, [s.id]: e.target.value }))
                    }
                    className="input mb-3 text-sm"
                    placeholder="Message à afficher au membre…"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => decide(s.id, "approved")}
                      disabled={busy === s.id || isDemo}
                      className="flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-4 py-1.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/30 disabled:opacity-50"
                    >
                      {busy === s.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <CheckCircle className="h-3.5 w-3.5" />
                      )}
                      {isDemo ? "🎬 Approuver" : "Approuver"}
                    </button>
                    <button
                      onClick={() => decide(s.id, "rejected")}
                      disabled={busy === s.id || isDemo}
                      className="flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-4 py-1.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                    >
                      <XIcon className="h-3.5 w-3.5" />
                      {isDemo ? "🎬 Refuser" : "Refuser"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
