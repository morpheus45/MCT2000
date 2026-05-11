"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Flame, Loader2 } from "lucide-react";
import { getSupabaseBrowser, supabaseConfigured } from "@/lib/supabase/client";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (!supabaseConfigured) {
      setErr("Supabase n'est pas configuré. Voir README.");
      return;
    }
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    setBusy(true);
    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { pseudo } },
        });
        if (error) throw error;
        if (data.user && !data.session) {
          setMsg("Compte créé. Vérifie ta boîte mail pour confirmer.");
        } else {
          router.push("/feed");
          router.refresh();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/feed");
        router.refresh();
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative isolate flex min-h-[80vh] items-center justify-center px-5 py-16">
      <div className="absolute inset-0 -z-10 noise-bg" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-ink-900/80 p-8 backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-flame-500 to-flame-700">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="heading text-2xl tracking-widest gradient-text">MCT2000</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              {isSignup ? "Créer un compte" : "Se connecter"}
            </div>
          </div>
        </div>

        <h1 className="heading text-4xl tracking-tight">
          {isSignup ? "Rejoins la team." : "Bon retour."}
        </h1>
        <p className="mt-2 text-sm text-white/60">
          {isSignup
            ? "Crée ton profil de motard. Pseudo, casque, machine — tu remplis le reste après."
            : "Le club t'attend. Connecte-toi pour accéder au chat et au feed."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isSignup && (
            <Field label="Pseudo" value={pseudo} onChange={setPseudo} required />
          )}
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Mot de passe" type="password" value={password} onChange={setPassword} required />

          {err && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              {err}
            </div>
          )}
          {msg && (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-300">
              {msg}
            </div>
          )}

          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : isSignup ? "Créer mon compte" : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/50">
          {isSignup ? (
            <>
              Déjà membre ?{" "}
              <Link href="/login" className="text-flame-400 hover:underline">Se connecter</Link>
            </>
          ) : (
            <>
              Pas encore de compte ?{" "}
              <Link href="/signup" className="text-flame-400 hover:underline">Rejoindre</Link>
            </>
          )}
        </div>

        {!supabaseConfigured && (
          <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-300">
            ⚠️ Supabase non configuré — vois le README pour activer l'auth.
          </div>
        )}
      </motion.div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-white/50">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-flame-500 focus:ring-2 focus:ring-flame-500/30"
      />
    </label>
  );
}
