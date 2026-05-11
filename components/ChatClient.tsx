"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Hash, Send, Users, Loader2 } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Channel = { id: string; slug: string; name: string; description: string | null };
type Message = {
  id: string;
  channel_id: string;
  user_id: string;
  content: string;
  created_at: string;
  pseudo?: string;
};

export default function ChatClient() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [active, setActive] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load auth + channels
  useEffect(() => {
    if (!supabase) return;
    let mounted = true;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(u.user ? { id: u.user.id, email: u.user.email ?? undefined } : null);

      const { data: ch } = await supabase
        .from("channels")
        .select("id, slug, name, description")
        .order("name");
      if (!mounted) return;
      const list = (ch as Channel[]) ?? [];
      setChannels(list);
      setActive(list[0] ?? null);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [supabase]);

  // Load messages + subscribe to realtime when channel changes
  useEffect(() => {
    if (!supabase || !active) return;

    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("messages_with_pseudo")
        .select("*")
        .eq("channel_id", active.id)
        .order("created_at", { ascending: true })
        .limit(200);
      if (!cancelled) setMessages((data as Message[]) ?? []);
    })();

    const channel = supabase
      .channel(`chat:${active.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `channel_id=eq.${active.id}` },
        async (payload) => {
          const m = payload.new as Message;
          // fetch pseudo from profiles for the new message
          const { data: prof } = await supabase
            .from("profiles")
            .select("pseudo")
            .eq("id", m.user_id)
            .maybeSingle();
          setMessages((prev) => [...prev, { ...m, pseudo: prof?.pseudo ?? "rider" }]);
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [supabase, active]);

  // Autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!supabase || !active || !user || !draft.trim()) return;
    setSending(true);
    const content = draft.trim();
    setDraft("");
    const { error } = await supabase
      .from("messages")
      .insert({ channel_id: active.id, user_id: user.id, content });
    if (error) console.error(error);
    setSending(false);
  }

  if (!user && !loading) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="heading text-4xl">Connecte-toi pour rejoindre le chat.</h2>
        <p className="mt-3 text-white/60">Le chat est réservé aux membres MCT2000.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login" className="btn-primary">Se connecter</Link>
          <Link href="/signup" className="btn-ghost">Créer un compte</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto h-[calc(100vh-140px)] max-w-7xl px-5 py-6">
      <div className="grid h-full gap-4 md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="flex flex-col rounded-2xl border border-white/10 bg-ink-900/60 p-4">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-flame-400" />
            <span className="heading tracking-widest">Canaux</span>
          </div>
          <div className="space-y-1 overflow-y-auto">
            {channels.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  active?.id === c.id
                    ? "bg-flame-500/15 text-flame-200"
                    : "text-white/70 hover:bg-white/5",
                )}
              >
                <Hash className="h-3.5 w-3.5" />
                <span className="truncate">{c.name}</span>
              </button>
            ))}
            {channels.length === 0 && !loading && (
              <p className="text-xs text-white/40">
                Aucun canal. Crée-les dans Supabase (table <code>channels</code>).
              </p>
            )}
          </div>
        </aside>

        {/* Messages + composer */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-ink-900/60">
          <header className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <div>
              <div className="flex items-center gap-2 text-white">
                <Hash className="h-4 w-4 text-flame-400" />
                <span className="heading text-xl tracking-wide">{active?.name ?? "—"}</span>
              </div>
              {active?.description && (
                <p className="text-xs text-white/50">{active.description}</p>
              )}
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {messages.map((m) => (
              <MessageRow key={m.id} m={m} mine={m.user_id === user?.id} />
            ))}
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center text-white/40">
                Aucun message — sois le premier à parler.
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2 border-t border-white/5 px-4 py-3"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={active ? `Écrire dans #${active.slug}...` : "Choisis un canal..."}
              disabled={!active || sending}
              className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-flame-500"
            />
            <button type="submit" disabled={!draft.trim() || !active || sending} className="btn-primary">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function MessageRow({ m, mine }: { m: Message; mine: boolean }) {
  const time = new Date(m.created_at).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className={cn("flex gap-3", mine && "flex-row-reverse")}>
      <div
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-bold text-white",
          mine ? "from-flame-500 to-flame-700" : "from-ink-700 to-ink-800",
        )}
      >
        {(m.pseudo ?? "?").slice(0, 2).toUpperCase()}
      </div>
      <div className={cn("max-w-[70%]", mine && "text-right")}>
        <div className="mb-1 flex items-center gap-2 text-xs text-white/40">
          <span className="font-semibold text-white/70">{m.pseudo ?? "rider"}</span>
          <span>·</span>
          <span>{time}</span>
        </div>
        <div
          className={cn(
            "inline-block whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm",
            mine
              ? "bg-flame-500/20 text-flame-50 border border-flame-500/30"
              : "bg-white/5 border border-white/10 text-white/90",
          )}
        >
          {m.content}
        </div>
      </div>
    </div>
  );
}
