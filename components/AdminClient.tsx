"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, ImagePlus, Megaphone, Facebook, Loader2, Shield } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Tab = "events" | "post" | "gallery" | "import";

type Profile = { id: string; pseudo: string; role: string };

export default function AdminClient() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [me, setMe] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("events");

  useEffect(() => {
    if (!supabase) return;
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
    { id: "post", label: "Annonce", icon: Megaphone },
    { id: "gallery", label: "Galerie", icon: ImagePlus },
    { id: "import", label: "Import Facebook", icon: Facebook },
  ];

  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <header className="mb-8 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-flame-500 to-flame-700">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <div className="chip mb-1">Admin</div>
          <h1 className="heading text-4xl">Bureau du club.</h1>
        </div>
      </header>

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
      {tab === "post" && <CreatePost />}
      {tab === "gallery" && <AddGalleryPhoto />}
      {tab === "import" && <FacebookImport />}
    </section>
  );
}

// ---------- Sub-forms ----------

function Section({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-6">{children}</div>;
}

function Label({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">{label}</span>
      {children}
    </label>
  );
}

function CreateEvent() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [where, setWhere] = useState("");
  const [distance, setDistance] = useState<number | "">("");
  const [level, setLevel] = useState("Facile");
  const [desc, setDesc] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.from("events").insert({
      title,
      description: desc,
      starts_at: new Date(`${date}T${time}`).toISOString(),
      location: where,
      distance_km: distance === "" ? null : distance,
      level,
    });
    setBusy(false);
    if (!error) {
      setOk(true);
      setTitle(""); setDate(""); setWhere(""); setDistance(""); setDesc("");
      setTimeout(() => setOk(false), 3000);
    } else {
      alert(error.message);
    }
  }

  return (
    <Section>
      <h2 className="heading mb-4 text-2xl">Nouvelle sortie</h2>
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
        <Label label="Description">
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="input min-h-[100px]" placeholder="Café au point de RDV à 8h45, briefing, départ 9h..." />
        </Label>
        <div className="flex items-center gap-3">
          <button disabled={busy} className="btn-primary">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publier la sortie"}</button>
          {ok && <span className="text-sm text-emerald-400">✓ Sortie créée</span>}
        </div>
      </form>
    </Section>
  );
}

function CreatePost() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
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
          <button disabled={busy} className="btn-primary">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publier"}</button>
          {ok && <span className="text-sm text-emerald-400">✓ Publié</span>}
        </div>
      </form>
    </Section>
  );
}

function AddGalleryPhoto() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [takenAt, setTakenAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
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
      <h2 className="heading mb-4 text-2xl">Ajouter une photo</h2>
      <p className="mb-4 text-sm text-white/60">
        Colle une URL d'image publique (héberge sur{" "}
        <a className="text-flame-400 underline" href="https://imgur.com" target="_blank" rel="noreferrer">imgur.com</a>{" "}
        si besoin) ou utilise une URL Supabase Storage.
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
          <button disabled={busy} className="btn-primary">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ajouter à la galerie"}</button>
          {ok && <span className="text-sm text-emerald-400">✓ Ajoutée</span>}
        </div>
      </form>
    </Section>
  );
}

function FacebookImport() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  async function importPost(e: React.FormEvent) {
    e.preventDefault();
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
          <button disabled={busy} className="btn-primary">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Importer"}</button>
          {ok && <span className="text-sm text-emerald-400">✓ Post importé</span>}
        </div>
      </form>
      <p className="mt-4 text-xs text-white/40">
        Astuce avancée : Facebook permet d'exporter <em>toutes</em> tes données du club via Paramètres → Vos infos
        → Télécharger une copie. On peut ensuite scripter l'import du ZIP.
      </p>
    </Section>
  );
}
