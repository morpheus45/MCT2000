"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Shield, LogOut, ChevronDown } from "lucide-react";
import { getSupabaseBrowser, supabaseConfigured } from "@/lib/supabase/client";

type Profile = { id: string; pseudo: string; role: string };

export default function UserMenu() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    let cancel = false;

    async function load() {
      const { data: u } = await supabase!.auth.getUser();
      if (cancel) return;
      if (!u.user) {
        setProfile(null);
        setReady(true);
        return;
      }
      const { data } = await supabase!
        .from("profiles")
        .select("id, pseudo, role")
        .eq("id", u.user.id)
        .maybeSingle();
      if (!cancel) {
        setProfile(data as Profile | null);
        setReady(true);
      }
    }
    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      cancel = true;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);

  if (!ready) return <div className="h-9 w-24 animate-pulse rounded-full bg-white/5" />;

  if (!profile || !supabaseConfigured) {
    return (
      <>
        <Link href="/login" className="btn-ghost px-4 py-2 text-sm">Se connecter</Link>
        <Link href="/signup" className="btn-primary px-4 py-2 text-sm">Rejoindre</Link>
      </>
    );
  }

  const isAdmin = profile.role === "admin" || profile.role === "officer";

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:border-flame-500/40"
      >
        <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-flame-500 to-flame-700 text-[10px] font-bold">
          {profile.pseudo.slice(0, 2).toUpperCase()}
        </div>
        <span className="hidden sm:block">{profile.pseudo}</span>
        <ChevronDown className="h-3 w-3 text-white/40" />
      </button>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-ink-900/95 shadow-xl backdrop-blur-xl"
        >
          <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-white/80 hover:bg-white/5">
            <User className="h-4 w-4" /> Mon profil
          </Link>
          {isAdmin && (
            <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-flame-400 hover:bg-white/5">
              <Shield className="h-4 w-4" /> Admin
            </Link>
          )}
          <button
            onClick={async () => {
              await supabase?.auth.signOut();
              router.push("/");
              router.refresh();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 border-t border-white/5 px-4 py-3 text-sm text-white/70 hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
