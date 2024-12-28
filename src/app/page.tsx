import { Benefits } from "@/components/home/Benefits";
import { BlogSection } from "@/components/home/BlogSection";
import { CTASection } from "@/components/home/CTASection";
import { FAQ } from "@/components/home/FAQ";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { MaintenanceOffer } from "@/components/home/MaintenanceOffer";
import { MaintenanceSection } from "@/components/home/MaintenanceSection";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ROICalculator } from "@/components/home/ROICalculator";
import { ServiceArea } from "@/components/home/ServiceArea";
import { Stats } from "@/components/home/Stats";
import { SuccessStories } from "@/components/home/SuccessStories";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { SolarMaintenance } from "@/components/home/SolarMaintenance";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Features />
      <Benefits />
      <SolarMaintenance />
      <ROICalculator />
      <MaintenanceSection />
      <ProcessTimeline />
      <TrustIndicators />
      <ServiceArea />
      <SuccessStories />
      <MaintenanceOffer />
      <FAQ />
      <BlogSection />
      <CTASection />
    </main>
  );
}
