import ChatClient from "@/components/ChatClient";
import SetupBanner from "@/components/SetupBanner";

export const metadata = { title: "Chat · MCT2000" };

export default function ChatPage() {
  const ok =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!ok) return <SetupBanner feature="Chat temps réel" />;
  return <ChatClient />;
}
