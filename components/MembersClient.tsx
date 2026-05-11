"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bike, MapPin } from "lucide-react";
import { getSupabaseBrowser, supabaseConfigured } from "@/lib/supabase/client";

type Member = {
  id: string;
  pseudo: string;
  bike: string | null;
  city: string | null;
  km: number | null;
  joined_year: number | null;
  avatar_url: string | null;
};

const fakeMembers: Member[] = [
  { id: "1", pseudo: "Marco", bike: "BMW R1250GS", city: "Lyon", km: 124000, joined_year: 2008, avatar_url: null },
  { id: "2", pseudo: "Lina", bike: "Ducati Monster 937", city: "Marseille", km: 38000, joined_year: 2022, avatar_url: null },
  { id: "3", pseudo: "Tonio", bike: "Harley Fat Boy", city: "Toulouse", km: 87000, joined_year: 2014, avatar_url: null },
  { id: "4", pseudo: "Sven", bike: "Yamaha MT-09", city: "Strasbourg", km: 22000, joined_year: 2024, avatar_url: null },
  { id: "5", pseudo: "Jess", bike: "Triumph Speed Twin", city: "Nantes", km: 56000, joined_year: 2019, avatar_url: null },
  { id: "6", pseudo: "Karim", bike: "KTM 1290 Super Duke", city: "Paris", km: 73000, joined_year: 2017, avatar_url: null },
];

export default function MembersClient() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [members, setMembers] = useState<Member[]>(fakeMembers);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, pseudo, bike, city, km, joined_year, avatar_url")
        .order("joined_year", { ascending: true })
        .limit(60);
      if (data && data.length > 0) setMembers(data as Member[]);
    })();
  }, [supabase]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <div className="chip mb-3">Roster</div>
        <h1 className="heading text-6xl">La famille.</h1>
        <p className="mt-3 max-w-xl text-white/60">
          {supabaseConfigured
            ? "Tous les membres actifs du club."
            : "Aperçu — connecte Supabase pour afficher la vraie liste."}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, i) => (
          <motion.article
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-5 transition-all hover:border-flame-500/40"
          >
            <header className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-flame-500 to-flame-700 text-sm font-bold">
                {m.pseudo.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="heading text-xl tracking-wide">{m.pseudo}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Membre {m.joined_year ?? "—"}
                </div>
              </div>
            </header>
            <div className="mt-4 space-y-1.5 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Bike className="h-3.5 w-3.5 text-flame-400" /> {m.bike ?? "—"}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-flame-400" /> {m.city ?? "—"}
              </div>
            </div>
            {m.km !== null && (
              <div className="mt-4 border-t border-white/5 pt-3">
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">Compteur</div>
                <div className="heading text-2xl gradient-text">{m.km.toLocaleString("fr-FR")} km</div>
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
