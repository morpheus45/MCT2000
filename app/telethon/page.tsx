import { Heart, Calendar, Bike, Trophy, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Téléthon · Moto Club MCT 2000" };

export default function TelethonPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <div className="chip mb-3">Engagement</div>
      <h1 className="heading text-6xl">
        Le Téléthon, <span className="gradient-text">c'est nous.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Chaque année en décembre, le Moto Club MCT 2000 organise sa balade caritative au profit de
        l'<strong className="text-white">AFM-Téléthon</strong>. C'est notre rendez-vous le plus
        important — celui qui donne du sens à toutes nos sorties.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <Card icon={Calendar} label="Quand" value="Premier week-end de décembre" />
        <Card icon={Bike} label="Format" value="Balade ouverte à tous, toutes cylindrées" />
        <Card icon={Trophy} label="Tradition" value="Depuis le début du club" />
      </div>

      <article className="mt-12 space-y-6 text-lg leading-relaxed text-white/80">
        <h2 className="heading text-3xl">Comment ça marche</h2>
        <ol className="space-y-4">
          {[
            "Inscription contre un don libre (minimum 10€) reversé intégralement à l'AFM-Téléthon.",
            "Départ groupé depuis Clermont-l'Hérault, parcours de 100 km dans le Languedoc.",
            "Pause repas conviviale, photos officielles, t-shirt commémoratif.",
            "Remise du chèque le soir-même au comité local du Téléthon.",
          ].map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-flame-500/20 text-sm font-bold text-flame-300">
                {i + 1}
              </div>
              <div>{step}</div>
            </li>
          ))}
        </ol>

        <h2 className="heading mt-12 text-3xl">Pourquoi le Téléthon ?</h2>
        <p>
          L'AFM-Téléthon finance la recherche sur les maladies génétiques rares — myopathies,
          dystrophies, maladies neuromusculaires. Chaque euro collecté finance des projets concrets.
          Rouler pour le Téléthon, c'est rouler pour quelque chose de plus grand que nous.
        </p>
      </article>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link href="/events" className="rounded-2xl border border-flame-500/40 bg-flame-500/10 p-6 transition-all hover:bg-flame-500/20">
          <Heart className="mb-2 h-6 w-6 text-flame-400" />
          <div className="heading text-xl">Inscrire mon nom</div>
          <div className="mt-1 text-sm text-white/60">Voir la prochaine édition dans les sorties</div>
        </Link>
        <a
          href="https://don.telethon.fr/"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-all hover:border-flame-500/40"
        >
          <ExternalLink className="mb-2 h-6 w-6 text-flame-400" />
          <div className="heading text-xl">Faire un don directement</div>
          <div className="mt-1 text-sm text-white/60">don.telethon.fr · 100% AFM-Téléthon</div>
        </a>
      </div>
    </section>
  );
}

function Card({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-5">
      <Icon className="mb-2 h-5 w-5 text-flame-400" />
      <div className="text-xs uppercase tracking-[0.25em] text-white/40">{label}</div>
      <div className="mt-1 text-white">{value}</div>
    </div>
  );
}
