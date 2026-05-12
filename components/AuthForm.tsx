"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Flame, Loader2, Mail } from "lucide-react";
import { getSupabaseBrowser, supabaseConfigured } from "@/lib/supabase/client";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (typeof window !== "undefined" ? window.location.origin + (process.env.NEXT_PUBLIC_BASE_PATH ?? "/MCT2000") : "https://morpheus45.github.io/MCT2000");

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
          options: {
            data: { pseudo },
            emailRedirectTo: SITE_URL,
          },
        });
        if (error) throw error;
        if (data.user && !data.session) {
          setMsg("Compte créé. Vérifie ta boîte mail pour confirmer (lien valide 24h).");
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

  async function resendConfirmation() {
    setErr(null);
    setMsg(null);
    if (!email) {
      setErr("Saisis ton email d'abord, puis clique sur « Renvoyer ».");
      return;
    }
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    setBusy(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo: SITE_URL },
      });
      if (error) throw error;
      setMsg("Email de confirmation renvoyé. Vérifie ta boîte (et les spams).");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Erreur lors du renvoi");
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
        className="w-full max-w-md border-2 border-bone-50/15 bg-ink-900/85 p-8 backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center border-2 border-flame-500 bg-flame-500 text-ink-950">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <div className="heading text-2xl tracking-[0.14em] text-bone-50">
              MCT <span className="editorial text-flame-400">2000</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest2 text-bone-50/40">
              {isSignup ? "Créer un compte" : "Connexion"}
            </div>
          </div>
        </div>

        <h1 className="heading text-4xl tracking-tight text-bone-50">
          {isSignup ? "Rejoins la team." : "Bon retour."}
        </h1>
        <p className="mt-2 text-sm text-bone-50/60">
          {isSignup
            ? "Crée ton profil de motard. Pseudo, casque, machine — tu remplis le reste après."
            : "Le club t'attend. Connecte-toi pour accéder au chat et au fil."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isSignup && (
            <Field label="Pseudo" value={pseudo} onChange={setPseudo} required />
          )}
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Mot de passe" type="password" value={password} onChange={setPassword} required />

          {err && (
            <div className="border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              {err}
            </div>
          )}
          {msg && (
            <div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-300">
              {msg}
            </div>
          )}

          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : isSignup ? "Créer mon compte" : "Se connecter"}
          </button>
        </form>

        {!isSignup && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={resendConfirmation}
              className="inline-flex items-center gap-2 text-xs text-bone-50/50 hover:text-flame-400"
            >
              <Mail className="h-3 w-3" /> Lien d'email expiré ? Renvoyer la confirmation
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-bone-50/50">
          {isSignup ? (
            <>
              Déjà membre ?{" "}
              <Link href="/login" className="text-flame-400 hover:underline">Connexion</Link>
            </>
          ) : (
            <>
              Pas encore de compte ?{" "}
              <Link href="/signup" className="text-flame-400 hover:underline">Rejoindre</Link>
            </>
          )}
        </div>

        {!supabaseConfigured && (
          <div className="mt-6 border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-300">
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
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest2 text-bone-50/50">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border-2 border-bone-50/15 bg-black/40 px-4 py-3 text-bone-50 outline-none transition-colors focus:border-flame-500"
      />
    </label>
  );
}
