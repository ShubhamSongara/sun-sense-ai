import { useEffect, useState } from "react";
import { HeroButton } from "@/components/ui/hero-button";
import { Sun, Zap, TrendingUp } from "lucide-react";
import heroImage from "@/assets/solar-hero.jpg";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-sky">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Floating Solar Icons */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Sun className="absolute top-20 right-20 w-8 h-8 text-primary opacity-60 float" />
        <Zap className="absolute top-1/3 left-10 w-6 h-6 text-accent opacity-40 float" style={{ animationDelay: "2s" }} />
        <TrendingUp className="absolute bottom-32 right-32 w-7 h-7 text-secondary opacity-50 float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-solar bg-clip-text text-transparent leading-tight">
            SunSense AI
          </h1>
          
          <p className="text-2xl md:text-3xl font-light mb-4 text-white drop-shadow-lg">
            Harness the Power of the Sun with AI
          </p>
          
          <p className="text-lg md:text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Predict solar energy generation using advanced machine learning and NASA weather data. 
            Experience the future of renewable energy forecasting.
          </p>
        </div>

        <div className="animate-bounce-in space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
          <HeroButton 
            variant="solar" 
            size="xl"
            onClick={() => scrollToSection("prediction")}
            className="w-full sm:w-auto"
          >
            <Sun className="w-5 h-5" />
            Predict Solar Energy
          </HeroButton>
          
          <HeroButton 
            variant="energy" 
            size="xl"
            onClick={() => scrollToSection("about")}
            className="w-full sm:w-auto"
          >
            <TrendingUp className="w-5 h-5" />
            Learn More
          </HeroButton>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;