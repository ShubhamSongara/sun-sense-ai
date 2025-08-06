import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PredictionSection from "@/components/sections/PredictionSection";
import VisualizationSection from "@/components/sections/VisualizationSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <PredictionSection />
      <VisualizationSection />
    </div>
  );
};

export default Index;
