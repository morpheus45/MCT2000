import Link from "next/link";
import { Facebook, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-2 border-bone-50/10 bg-ink-950">
      {/* Masthead — magazine colophon */}
      <div className="border-b border-bone-50/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 font-mono text-[10px] uppercase tracking-widest2 text-bone-50/40">
          <span>Colophon · Imprimé sur le bitume du Languedoc</span>
          <span>Ride free, ride safe.</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-12">
        {/* Masthead block */}
        <div className="md:col-span-5">
          <div className="font-display text-5xl tracking-wide text-bone-50">
            MCT <span className="editorial text-flame-400">2000</span>
          </div>
          <p className="mt-3 max-w-sm editorial text-bone-50/70">
            «&nbsp;Brotherhood. Bitume. Liberté. Depuis l'an 2000, on roule ensemble&nbsp;» — depuis Clermont-l'Hérault.
          </p>
          <div className="mt-5 flex gap-2">
            <a aria-label="Facebook" href="https://www.facebook.com/groups/531676370210673/" target="_blank" rel="noreferrer" className="border border-bone-50/15 p-2 hover:bg-flame-500 hover:border-flame-500 hover:text-ink-950 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a aria-label="Instagram" href="#" className="border border-bone-50/15 p-2 hover:bg-flame-500 hover:border-flame-500 hover:text-ink-950 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a aria-label="GitHub" href="https://github.com/morpheus45/MCT2000" target="_blank" rel="noreferrer" className="border border-bone-50/15 p-2 hover:bg-flame-500 hover:border-flame-500 hover:text-ink-950 transition-colors">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Sections — magazine-style index */}
        <div className="md:col-span-3">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-flame-500">¶</span>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-50/40">Le club</span>
          </div>
          <ul className="space-y-2 font-mono text-sm uppercase tracking-wide text-bone-50/70">
            <li><Link href="/about" className="hover:text-flame-400">L'histoire</Link></li>
            <li><Link href="/rules" className="hover:text-flame-400">Règles</Link></li>
            <li><Link href="/telethon" className="hover:text-flame-400">Téléthon</Link></li>
            <li><Link href="/members" className="hover:text-flame-400">Membres</Link></li>
            <li><Link href="/contact" className="hover:text-flame-400">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-flame-500">¶</span>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-50/40">Sur le terrain</span>
          </div>
          <ul className="space-y-2 font-mono text-sm uppercase tracking-wide text-bone-50/70">
            <li><Link href="/events" className="hover:text-flame-400">Sorties</Link></li>
            <li><Link href="/rides" className="hover:text-flame-400">Routes</Link></li>
            <li><Link href="/gallery" className="hover:text-flame-400">Galerie</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-flame-500">¶</span>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-50/40">Adhésion</span>
          </div>
          <ul className="space-y-2 font-mono text-sm uppercase tracking-wide text-bone-50/70">
            <li><Link href="/feed" className="hover:text-flame-400">Feed</Link></li>
            <li><Link href="/chat" className="hover:text-flame-400">Chat</Link></li>
            <li><Link href="/login" className="hover:text-flame-400">Login</Link></li>
            <li><Link href="/signup" className="hover:text-flame-400">Rejoindre</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bone-50/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 font-mono text-[10px] uppercase tracking-widest2 text-bone-50/30">
          <span>© {new Date().getFullYear()} Moto Club MCT 2000</span>
          <span>Volume XXVI · Édité par les motards, pour les motards.</span>
        </div>
      </div>
    </footer>
  );
}
