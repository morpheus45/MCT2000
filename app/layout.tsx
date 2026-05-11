import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/MCT2000";

export const viewport: Viewport = {
  themeColor: "#ff5410",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://morpheus45.github.io" + basePath + "/"),
  title: {
    default: "Moto Club MCT 2000 — Clermont-l'Hérault",
    template: "%s · Moto Club MCT 2000",
  },
  description:
    "Le Moto Club MCT 2000 de Clermont-l'Hérault — 131 motards, balades Téléthon, sorties entre filles, toutes cylindrées.",
  applicationName: "Moto Club MCT 2000",
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: [{ url: `${basePath}/favicon.svg`, type: "image/svg+xml" }],
    apple: [{ url: `${basePath}/icon-192.svg` }],
  },
  openGraph: {
    title: "Moto Club MCT 2000 — Clermont-l'Hérault",
    description: "Brotherhood. Bitume. Liberté. Depuis 2000.",
    type: "website",
    locale: "fr_FR",
    images: [{ url: `${basePath}/og-image.svg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moto Club MCT 2000",
    description: "Brotherhood. Bitume. Liberté.",
    images: [`${basePath}/og-image.svg`],
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
