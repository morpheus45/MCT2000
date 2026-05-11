import AdminClient from "@/components/AdminClient";
import SetupBanner from "@/components/SetupBanner";

export const metadata = { title: "Admin · Moto Club MCT 2000" };

export default function AdminPage() {
  const ok =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!ok) return <SetupBanner feature="Espace administrateur" />;
  return <AdminClient />;
}
