import { Header } from "@/components/Header";
import { ScrollHero } from "@/components/ScrollHero";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProcessSection } from "@/components/ProcessSection";
import { GallerySection } from "@/components/GallerySection";
import { WhySection } from "@/components/WhySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main aria-label="Lurra Projects premium landscaping Melbourne">
        <ScrollHero />
        <ExperienceSection />
        <ProcessSection />
        <GallerySection />
        <WhySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}