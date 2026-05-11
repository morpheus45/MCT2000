import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Moto Club MCT 2000",
  description:
    "Moto Club MCT 2000 — sorties, mécanique, brotherhood. Rejoins l'équipe.",
  openGraph: {
    title: "Moto Club MCT 2000",
    description: "Brotherhood. Bitume. Liberté.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-ink-950 text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
