import SmoothScroll from "@/components/SmoothScroll";
import GovBanner from "@/components/GovBanner";
import Hero from "@/components/Hero";
import StatRing from "@/components/StatRing";
import Manifesto from "@/components/Manifesto";
import DarkSection from "@/components/DarkSection";
import ThreeSteps from "@/components/ThreeSteps";
import PyramidSection from "@/components/PyramidSection";
import GuidelinesCard from "@/components/GuidelinesCard";
import ClosingStatement from "@/components/ClosingStatement";

export default function Home() {
  return (
    <SmoothScroll>
      <GovBanner />
      <main>
        <Hero />
        <StatRing />
        <Manifesto />
        <DarkSection>
          <ThreeSteps />
          <PyramidSection />
          <GuidelinesCard />
        </DarkSection>
        <ClosingStatement />
      </main>
    </SmoothScroll>
  );
}
