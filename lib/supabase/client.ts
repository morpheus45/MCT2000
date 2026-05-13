"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Static export friendly: pure browser client with localStorage session.
// We avoid @supabase/ssr's createBrowserClient because it relies on cookies + a
// Next.js middleware to refresh tokens — neither exists when the site is served
// as plain static files from GitHub Pages.

let _client: SupabaseClient | null = null;

export function getSupabaseBrowser() {
  if (typeof window === "undefined") return null;
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  _client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "mct2000-auth",
      storage: window.localStorage,
      flowType: "pkce",
    },
  });
  return _client;
}

export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
