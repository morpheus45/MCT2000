import { ShieldCheck, Ban, Camera } from "lucide-react";

export const metadata = { title: "Règles du club · Moto Club MCT 2000" };

const rules = [
  {
    icon: ShieldCheck,
    title: "Soyez aimable et courtois·e",
    body:
      "On traite tout le monde avec respect. Il est normal d'avoir des débats constructifs, mais il est essentiel de rester aimable.",
  },
  {
    icon: Ban,
    title: "Pas de discours haineux, ni de harcèlement",
    body:
      "Le harcèlement sous toutes ses formes est interdit. Les commentaires dégradants sur l'origine ethnique, la religion, la culture, l'orientation sexuelle, le genre ou l'identité sexuelle ne sont pas tolérés. Nous nous réservons le droit d'expulser du groupe toute personne qui ne respecterait pas les règles basiques du club.",
  },
  {
    icon: Camera,
    title: "Photos et vidéos — vie privée",
    body:
      "Lorsque vous prenez des photos pendant les sorties et que vous les partagez, n'oubliez pas de flouter les plaques d'immatriculation et de demander l'autorisation aux personnes présentes et/ou concernées sur les clichés. Il en va du bon fonctionnement du club et du respect de tous. Merci.",
  },
];

export default function RulesPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <div className="chip mb-3">Règlement</div>
      <h1 className="heading text-6xl">Les règles du club.</h1>
      <p className="mt-4 max-w-2xl text-white/60">
        Trois règles simples, fixées par les admins du club. Elles s'appliquent ici comme sur le
        groupe Facebook. Le non-respect peut entraîner l'exclusion.
      </p>

      <ol className="mt-12 space-y-5">
        {rules.map((r, i) => (
          <li
            key={r.title}
            className="rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-all hover:border-flame-500/40"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-flame-500 to-flame-700">
                <r.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Règle {i + 1}
                </div>
                <h2 className="heading mt-1 text-2xl">{r.title}</h2>
                <p className="mt-2 text-white/70">{r.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm text-amber-200">
        En t'inscrivant sur la plateforme, tu confirmes avoir lu et accepté ces règles. Bonne route.
      </div>
    </section>
  );
}
