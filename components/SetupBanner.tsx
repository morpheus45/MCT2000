"use client";

import { AlertTriangle } from "lucide-react";

export default function SetupBanner({ feature }: { feature: string }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
        <div className="mb-3 flex items-center gap-2 text-amber-400">
          <AlertTriangle className="h-5 w-5" />
          <span className="heading tracking-widest">Supabase non configuré</span>
        </div>
        <h2 className="heading text-3xl">{feature} en attente.</h2>
        <p className="mt-3 text-white/70">
          Pour activer cette fonctionnalité, crée un projet sur{" "}
          <a
            className="text-flame-400 underline"
            href="https://app.supabase.com"
            target="_blank"
            rel="noreferrer"
          >
            app.supabase.com
          </a>
          , exécute le script <code className="rounded bg-black/40 px-2 py-0.5">supabase/schema.sql</code> dans
          le SQL Editor, puis copie tes clés dans <code className="rounded bg-black/40 px-2 py-0.5">.env.local</code>.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-black/40 p-4 text-xs text-white/80">
          {`NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx`}
        </pre>
        <p className="mt-3 text-sm text-white/50">
          Voir le README pour le guide complet (5 minutes).
        </p>
      </div>
    </div>
  );
}
