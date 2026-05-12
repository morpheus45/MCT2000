"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, X } from "lucide-react";

// Maps Supabase auth callback errors (from URL hash or query) to a friendly French message.
type ParsedError = { title: string; body: string; actionLabel: string; actionHref: string };

function parseAuthError(): ParsedError | null {
  if (typeof window === "undefined") return null;
  const params: Record<string, string> = {};
  // Query string
  const qs = new URLSearchParams(window.location.search);
  qs.forEach((v, k) => (params[k] = v));
  // Hash (Supabase puts errors in the # fragment too)
  if (window.location.hash.startsWith("#")) {
    const hs = new URLSearchParams(window.location.hash.slice(1));
    hs.forEach((v, k) => (params[k] = v));
  }
  const code = params.error_code;
  const error = params.error;
  if (!code && !error) return null;

  if (code === "otp_expired") {
    return {
      title: "Lien d'email expiré",
      body:
        "Le lien que tu viens de cliquer n'est plus valide (validité dépassée). Tu peux te connecter directement ou demander un nouveau lien depuis la page de connexion.",
      actionLabel: "Renvoyer un email",
      actionHref: "/login",
    };
  }
  if (code === "access_denied" || error === "access_denied") {
    return {
      title: "Accès refusé",
      body:
        "Ta session n'a pas pu être validée. Vérifie l'email reçu et essaie de te reconnecter.",
      actionLabel: "Connexion",
      actionHref: "/login",
    };
  }
  return {
    title: "Erreur d'authentification",
    body: params.error_description?.replace(/\+/g, " ") ?? "Une erreur est survenue.",
    actionLabel: "Connexion",
    actionHref: "/login",
  };
}

export default function AuthErrorBanner() {
  const [err, setErr] = useState<ParsedError | null>(null);

  useEffect(() => {
    const e = parseAuthError();
    if (e) setErr(e);
  }, []);

  function dismiss() {
    setErr(null);
    // Strip the error params from the URL so it doesn't reappear on refresh
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    window.history.replaceState(null, "", url.toString());
  }

  if (!err) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[70] flex justify-center px-3 pt-3 pointer-events-none">
      <div className="pointer-events-auto flex w-full max-w-3xl items-start gap-4 border-2 border-flame-500 bg-ink-950/95 p-4 shadow-[0_20px_60px_-15px_rgba(255,84,16,0.5)] backdrop-blur-xl">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-flame-500" />
        <div className="flex-1">
          <div className="heading text-lg tracking-wide text-bone-50">{err.title}</div>
          <p className="mt-1 text-sm text-bone-50/70">{err.body}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link
              href={err.actionHref}
              onClick={dismiss}
              className="inline-flex items-center gap-2 border border-flame-500 bg-flame-500 px-4 py-1.5 font-display text-xs uppercase tracking-widest text-ink-950 hover:bg-flame-400"
            >
              {err.actionLabel}
            </Link>
            <button
              onClick={dismiss}
              className="font-mono text-[10px] uppercase tracking-widest2 text-bone-50/50 hover:text-bone-50"
            >
              Fermer
            </button>
          </div>
        </div>
        <button
          aria-label="Fermer"
          onClick={dismiss}
          className="shrink-0 text-bone-50/40 hover:text-bone-50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
