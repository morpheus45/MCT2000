import { Flame, Users, Calendar, Heart } from "lucide-react";

export const metadata = { title: "L'histoire · Moto Club MCT 2000" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <div className="chip mb-3">Histoire</div>
      <h1 className="heading text-6xl">
        Le bitume, <span className="gradient-text">notre cathédrale.</span>
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={Flame} label="Fondation" value="An 2000" />
        <Stat icon={Users} label="Membres" value="131" />
        <Stat icon={Calendar} label="Groupe FB" value="2013" />
        <Stat icon={Heart} label="Cause" value="Téléthon" />
      </div>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/80">
        <p>
          Le <strong className="text-white">Moto Club MCT 2000</strong> rassemble depuis l'an 2000
          des passionnés de deux-roues. Toutes cylindrées, toutes marques, toutes générations — ce
          qui nous rassemble, c'est la passion du deux-roues et l'envie de rouler ensemble.
        </p>
        <p>
          On organise des <strong className="text-white">balades moto lors du Téléthon</strong>,
          des <strong className="text-white">balades entre filles</strong>, des sorties dominicales,
          des road-trips dans tout le sud de la France et au-delà. Toujours avec l'esprit du club :
          personne ne reste en rade.
        </p>
        <p>
          Notre <strong className="text-white">groupe Facebook</strong> existe depuis février 2013
          et rassemble aujourd'hui <strong className="text-white">131 motards</strong>. Cette
          plateforme web est notre nouvel espace : un endroit où l'on partage les itinéraires, où
          l'on cause mécanique, où l'on s'inscrit aux sorties, où l'on garde la mémoire vivante du
          club. <strong className="gradient-text">Bienvenue à bord.</strong>
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-flame-500/20 bg-flame-500/5 p-6">
        <h2 className="heading mb-3 text-2xl">Notre engagement Téléthon</h2>
        <p className="text-white/70">
          Chaque année, le club roule pour le Téléthon. Baptêmes en moto, balade caritative ouverte
          à tous — dons reversés à 100% à l'AFM-Téléthon. Une fierté du club depuis ses débuts.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-ink-900/60 p-6 font-mono text-sm text-white/60">
        <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/30">Siège social</div>
        <p className="text-white/80">Association Moto Club Tourisme 2000</p>
        <p>Maison Louis Blanc — 14 rue Louis Blanc</p>
        <p>34800 Clermont-l'Hérault</p>
        <p className="mt-2">
          <a href="mailto:contact.mct2000@gmail.com" className="text-flame-400 hover:underline">
            contact.mct2000@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-4">
      <Icon className="mb-2 h-4 w-4 text-flame-400" />
      <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</div>
      <div className="heading text-xl text-white">{value}</div>
    </div>
  );
}
