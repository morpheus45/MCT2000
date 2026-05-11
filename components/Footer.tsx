import Link from "next/link";
import { Flame, Github, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-950/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-flame-500" />
            <span className="heading text-xl tracking-[0.2em] gradient-text">MCT 2000</span>
          </div>
          <p className="mt-3 text-sm text-white/50">
            Moto Club MCT 2000 — Brotherhood. Bitume. Liberté. Depuis l'an 2000, on roule ensemble.
          </p>
        </div>
        <div>
          <h4 className="heading mb-3 text-sm tracking-[0.2em] text-white/80">Le club</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link href="/about">L'histoire</Link></li>
            <li><Link href="/rules">Règles du club</Link></li>
            <li><Link href="/members">Membres</Link></li>
            <li><Link href="/events">Sorties</Link></li>
            <li><Link href="/rides">Routes</Link></li>
            <li><Link href="/gallery">Galerie</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="heading mb-3 text-sm tracking-[0.2em] text-white/80">Communauté</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link href="/feed">Feed</Link></li>
            <li><Link href="/chat">Chat</Link></li>
            <li><Link href="/login">Se connecter</Link></li>
            <li><Link href="/signup">Rejoindre</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="heading mb-3 text-sm tracking-[0.2em] text-white/80">Suivre</h4>
          <div className="flex gap-3">
            <a aria-label="Facebook" href="https://www.facebook.com/groups/531676370210673/" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-2 hover:border-flame-500 hover:text-flame-400 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a aria-label="Instagram" href="#" className="rounded-full border border-white/10 p-2 hover:border-flame-500 hover:text-flame-400 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a aria-label="GitHub" href="#" className="rounded-full border border-white/10 p-2 hover:border-flame-500 hover:text-flame-400 transition-colors">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 px-5 py-5 text-center text-xs uppercase tracking-[0.3em] text-white/40">
        © {new Date().getFullYear()} Moto Club MCT 2000 — Ride free, ride safe.
      </div>
    </footer>
  );
}
