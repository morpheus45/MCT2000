import FeedClient from "@/components/FeedClient";
import SetupBanner from "@/components/SetupBanner";

export const metadata = { title: "Feed · MCT2000" };

export default function FeedPage() {
  const ok =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!ok) return <SetupBanner feature="Feed communautaire" />;
  return <FeedClient />;
}
