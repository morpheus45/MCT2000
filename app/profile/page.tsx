import ProfileClient from "@/components/ProfileClient";
import SetupBanner from "@/components/SetupBanner";

export const metadata = { title: "Mon profil · Moto Club MCT 2000" };

export default function ProfilePage() {
  const ok =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!ok) return <SetupBanner feature="Profil membre" />;
  return <ProfileClient />;
}
