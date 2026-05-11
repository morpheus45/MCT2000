export const metadata = { title: "L'histoire · MCT2000" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <div className="chip mb-3">Histoire</div>
      <h1 className="heading text-6xl">Depuis l'an 2000.</h1>
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/80">
        <p>
          MCT2000 est né dans un garage en 2000 — cinq potes, deux Bonneville, une Ducati, un café
          serré et une carte de France punaisée au mur. L'idée était simple : rouler ensemble, sans
          chichis, sans hiérarchie, sans cotisation.
        </p>
        <p>
          26 ans plus tard, nous sommes <strong className="text-white">240 motards</strong> de toute
          la France et au-delà, des routards GS aux puristes du flat-tracker, des week-end-warriors
          aux baroudeurs longue distance. Ce qui n'a pas changé : la règle du club. Personne ne
          reste en rade.
        </p>
        <p>
          On organise <strong className="text-white">47 sorties par an</strong>, des road-trips
          internationaux, des ateliers mécanique, des soirées projection-débriefing, des opérations
          solidaires. On a notre patch, notre histoire, nos morts qu'on n'oublie pas, et nos
          jeunes qu'on forme.
        </p>
        <p>
          Cette plateforme est notre nouvel espace : un endroit où l'on partage les itinéraires, où
          l'on cause mécanique, où l'on s'inscrit aux sorties, où l'on garde la mémoire vivante du
          club. <strong className="gradient-text">Bienvenue à bord.</strong>
        </p>
      </div>
    </section>
  );
}
