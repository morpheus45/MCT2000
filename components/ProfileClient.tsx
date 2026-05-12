"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Save, User } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { isDemo, demoMe } from "@/lib/demo";

type Profile = {
  id: string;
  pseudo: string;
  bike: string | null;
  city: string | null;
  km: number | null;
  joined_year: number | null;
  avatar_url: string | null;
  bio: string | null;
  role: string;
};

export default function ProfileClient() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [profile, setProfile] = useState<Profile | null>(isDemo ? demoMe : null);
  const [loading, setLoading] = useState(!isDemo);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (!supabase || isDemo) return;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", u.user.id)
        .single();
      setProfile(data as Profile);
      setLoading(false);
    })();
  }, [supabase]);

  async function save() {
    if (isDemo) {
      alert("Mode démo — connecte Supabase pour enregistrer ton profil.");
      return;
    }
    if (!supabase || !profile) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        pseudo: profile.pseudo,
        bike: profile.bike,
        city: profile.city,
        km: profile.km,
        joined_year: profile.joined_year,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
      })
      .eq("id", profile.id);
    setSaving(false);
    if (!error) setSavedAt(Date.now());
    else alert(error.message);
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="grid place-items-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-flame-400" />
      </div>
    );
  }

  if (!profile) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <User className="mx-auto mb-3 h-10 w-10 text-flame-400" />
        <h1 className="heading text-4xl">Connecte-toi.</h1>
        <p className="mt-3 text-white/60">Pour gérer ton profil, identifie-toi.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login" className="btn-primary">Se connecter</Link>
          <Link href="/signup" className="btn-ghost">Rejoindre</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <header className="mb-8 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-flame-500 to-flame-700 text-xl font-bold">
          {profile.pseudo.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="chip mb-1">{profile.role === "admin" ? "Administrateur" : profile.role === "officer" ? "Officier" : "Membre"}</div>
          <h1 className="heading text-4xl">{profile.pseudo}</h1>
        </div>
        <button onClick={signOut} className="ml-auto btn-ghost text-sm">
          <LogOut className="h-4 w-4" /> Déconnexion
        </button>
      </header>

      <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-6">
        <h2 className="heading mb-4 text-2xl">Mon profil</h2>
        <div className="space-y-4">
          <Field label="Pseudo" value={profile.pseudo} onChange={(v) => setProfile({ ...profile, pseudo: v })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Moto" placeholder="Ex: BMW R1250GS" value={profile.bike ?? ""} onChange={(v) => setProfile({ ...profile, bike: v })} />
            <Field label="Ville" placeholder="Lyon" value={profile.city ?? ""} onChange={(v) => setProfile({ ...profile, city: v })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Compteur (km)"
              type="number"
              value={String(profile.km ?? "")}
              onChange={(v) => setProfile({ ...profile, km: v === "" ? null : Number(v) })}
            />
            <Field
              label="Membre depuis"
              type="number"
              value={String(profile.joined_year ?? "")}
              onChange={(v) => setProfile({ ...profile, joined_year: v === "" ? null : Number(v) })}
            />
          </div>
          <Field
            label="Photo de profil (URL)"
            placeholder="https://..."
            value={profile.avatar_url ?? ""}
            onChange={(v) => setProfile({ ...profile, avatar_url: v })}
          />
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">Bio</span>
            <textarea
              value={profile.bio ?? ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="input min-h-[100px]"
              placeholder="Quelques mots sur toi, tes motos, tes road-trips préférés..."
            />
          </label>

          <div className="flex items-center gap-3 pt-2">
            <button onClick={save} disabled={saving || isDemo} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isDemo ? "🎬 Démo — Enregistrer" : "Enregistrer"}
            </button>
            {savedAt && Date.now() - savedAt < 4000 && (
              <span className="text-sm text-emerald-400">✓ Profil mis à jour</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </label>
  );
}
