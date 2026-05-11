"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, Loader2, ImagePlus } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { formatDateFr } from "@/lib/utils";

type Post = {
  id: string;
  user_id: string;
  pseudo: string;
  content: string;
  image_url: string | null;
  created_at: string;
  like_count: number;
  comment_count: number;
  liked_by_me: boolean;
};

export default function FeedClient() {
  const supabase = useMemo(() => getSupabaseBrowser(), []);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [draft, setDraft] = useState("");
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      setUser(u.user ? { id: u.user.id } : null);
      await refresh();
      setLoading(false);
    })();
    // realtime: refresh on inserts
    const ch = supabase
      .channel("feed-posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, () => refresh())
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function refresh() {
    if (!supabase) return;
    const { data } = await supabase
      .from("feed_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setPosts((data as Post[]) ?? []);
  }

  async function publish() {
    if (!supabase || !user || !draft.trim()) return;
    setPosting(true);
    const { error } = await supabase
      .from("posts")
      .insert({ user_id: user.id, content: draft.trim() });
    if (!error) {
      setDraft("");
      refresh();
    }
    setPosting(false);
  }

  async function toggleLike(postId: string, liked: boolean) {
    if (!supabase || !user) return;
    if (liked) {
      await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", user.id);
    } else {
      await supabase.from("post_likes").insert({ post_id: postId, user_id: user.id });
    }
    refresh();
  }

  if (loading) {
    return (
      <div className="grid place-items-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-flame-400" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-10">
      <div className="mb-6">
        <div className="chip mb-3">Feed</div>
        <h1 className="heading text-5xl">Le mur du club.</h1>
      </div>

      {user ? (
        <div className="mb-8 rounded-2xl border border-white/10 bg-ink-900/60 p-4">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder="Raconte ta dernière sortie..."
            className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-flame-500"
          />
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/50 hover:text-flame-400"
              title="Image (à venir — Storage)"
              disabled
            >
              <ImagePlus className="h-4 w-4" /> Photo
            </button>
            <button onClick={publish} disabled={!draft.trim() || posting} className="btn-primary">
              {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Publier
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-2xl border border-white/10 bg-ink-900/60 p-6 text-center">
          <p className="text-white/70">Connecte-toi pour publier et liker.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/login" className="btn-primary">Se connecter</Link>
            <Link href="/signup" className="btn-ghost">Rejoindre</Link>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="rounded-2xl border border-white/10 bg-ink-900/60 p-5"
          >
            <header className="mb-3 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-flame-500 to-flame-700 text-sm font-bold">
                {p.pseudo.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold">{p.pseudo}</div>
                <div className="text-xs text-white/40">{formatDateFr(p.created_at)}</div>
              </div>
            </header>
            <p className="whitespace-pre-wrap text-white/90">{p.content}</p>
            {p.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image_url} alt="" className="mt-3 w-full rounded-xl" />
            )}
            <footer className="mt-4 flex items-center gap-4 border-t border-white/5 pt-3 text-sm text-white/60">
              <button
                onClick={() => toggleLike(p.id, p.liked_by_me)}
                disabled={!user}
                className={`flex items-center gap-1.5 transition-colors ${p.liked_by_me ? "text-flame-400" : "hover:text-flame-400"}`}
              >
                <Heart className={`h-4 w-4 ${p.liked_by_me ? "fill-flame-400" : ""}`} />
                {p.like_count}
              </button>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" />
                {p.comment_count}
              </span>
            </footer>
          </motion.article>
        ))}
        {posts.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-ink-900/60 py-16 text-center text-white/50">
            Aucun post pour le moment. Sois le premier !
          </div>
        )}
      </div>
    </section>
  );
}
