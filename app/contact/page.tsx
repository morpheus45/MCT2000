import { Facebook, MapPin, Mail, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Contact · Moto Club MCT 2000" };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <div className="chip mb-3">Contact</div>
      <h1 className="heading text-6xl">On se croise ?</h1>
      <p className="mt-4 max-w-xl text-white/60">
        Trois façons d'entrer en contact avec le club. La plus rapide : rejoindre le groupe
        Facebook ou s'inscrire ici directement.
      </p>

      <div className="mt-12 space-y-4">
        <a
          href="https://www.facebook.com/groups/531676370210673/"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-ink-900/60 p-5 transition-all hover:border-flame-500/40"
        >
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#1877F2]">
            <Facebook className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="heading text-xl">Groupe Facebook</div>
            <div className="text-sm text-white/60">131 membres · cœur du club depuis 2013</div>
          </div>
          <span className="text-sm text-flame-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
        </a>

        <Link
          href="/signup"
          className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-ink-900/60 p-5 transition-all hover:border-flame-500/40"
        >
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-flame-500 to-flame-700">
            <Users className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <div className="heading text-xl">S'inscrire sur la plateforme</div>
            <div className="text-sm text-white/60">Email + pseudo, 30 secondes</div>
          </div>
          <span className="text-sm text-flame-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
        </Link>

        <Link
          href="/chat"
          className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-ink-900/60 p-5 transition-all hover:border-flame-500/40"
        >
          <div className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/5">
            <MessageSquare className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="heading text-xl">Chat du club</div>
            <div className="text-sm text-white/60">Discussion temps réel entre membres</div>
          </div>
          <span className="text-sm text-flame-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-5">
          <MapPin className="mb-2 h-5 w-5 text-flame-400" />
          <div className="text-xs uppercase tracking-[0.25em] text-white/40">Base du club</div>
          <div className="mt-1 text-lg text-white">Clermont-l'Hérault</div>
          <div className="text-sm text-white/60">34800, Languedoc — France</div>
          <a
            href="https://www.openstreetmap.org/?mlat=43.6258&mlon=3.4422#map=14/43.6258/3.4422"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-xs text-flame-400 hover:underline"
          >
            Voir sur la carte →
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-5">
          <Mail className="mb-2 h-5 w-5 text-flame-400" />
          <div className="text-xs uppercase tracking-[0.25em] text-white/40">Adresse mail</div>
          <div className="mt-1 text-lg text-white">à venir</div>
          <div className="text-sm text-white/60">
            En attendant, passez par le groupe Facebook ou la plateforme.
          </div>
        </div>
      </div>
    </section>
  );
}
