import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeatureGrid from "@/components/FeatureGrid";
import Stats from "@/components/Stats";
import UpcomingTeaser from "@/components/UpcomingTeaser";
import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeatureGrid />
      <Stats />
      <UpcomingTeaser />
      <CTA />
    </>
  );
}
