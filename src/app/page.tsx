import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import SectionNav from "@/components/SectionNav";
import GovBanner from "@/components/GovBanner";
import Hero from "@/components/Hero";
import FoodMarquee from "@/components/FoodMarquee";
import StatsSection from "@/components/StatRing";
import Manifesto from "@/components/Manifesto";
import DarkSection from "@/components/DarkSection";
import ThreeSteps from "@/components/ThreeSteps";
import PyramidSection from "@/components/PyramidSection";
import GuidelinesCard from "@/components/GuidelinesCard";
import ClosingStatement from "@/components/ClosingStatement";
import EatRealFood from "@/components/EatRealFood";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <SectionNav />
      <GovBanner />
      <main>
        <Hero />
        <FoodMarquee />
        <StatsSection />
        <Manifesto />
        <DarkSection>
          <ThreeSteps />
          <PyramidSection />
          <GuidelinesCard />
        </DarkSection>
        <ClosingStatement />
        <EatRealFood />
      </main>
    </SmoothScroll>
  );
}
