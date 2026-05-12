"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { isDemo } from "@/lib/demo";

export default function DemoBanner() {
  if (!isDemo) return null;
  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10 text-amber-100">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-2 text-xs">
        <div className="flex items-center gap-2">
          <Eye className="h-3.5 w-3.5" />
          <span>
            <strong>Mode démo</strong> — données simulées, actions désactivées. Connecte Supabase
            pour activer chat / feed / inscriptions en temps réel.
          </span>
        </div>
        <Link
          href="https://github.com/morpheus45/MCT2000#d%C3%A9ployer-sur-github-pages-recommand%C3%A9"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-amber-300/40 px-3 py-1 hover:bg-amber-500/20"
        >
          Setup Supabase →
        </Link>
      </div>
    </div>
  );
}
