import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CloudRain, 
  Thermometer, 
  Wind, 
  Gauge, 
  Droplets, 
  Sun,
  Brain,
  Database
} from "lucide-react";

const features = [
  { icon: Thermometer, label: "Temperature (T2M)", description: "Daily temperature measurements in Celsius", color: "text-red-500" },
  { icon: Droplets, label: "Humidity (RH2M)", description: "Relative humidity percentage", color: "text-blue-500" },
  { icon: Wind, label: "Wind Speed (WS2M)", description: "Wind speed at 2 meters height", color: "text-green-500" },
  { icon: CloudRain, label: "Precipitation", description: "Daily rainfall measurements", color: "text-indigo-500" },
  { icon: Gauge, label: "Pressure (PS)", description: "Surface pressure readings", color: "text-purple-500" },
  { icon: Sun, label: "Solar Radiation", description: "Clear sky solar irradiance", color: "text-yellow-500" }
];

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 bg-gradient-to-br from-muted/50 to-background">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-energy bg-clip-text text-transparent">
            AI-Powered Solar Prediction
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our advanced XGBoost machine learning model analyzes 10 years of NASA POWER API weather data 
            from Pune, India (2015-2024) to predict solar energy generation with remarkable accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Dataset Info */}
          <Card className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} solar-glow`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="w-6 h-6 text-primary" />
                NASA POWER Dataset
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We collect comprehensive daily weather data spanning nearly a decade, providing our AI model 
                with rich historical patterns to learn from. This extensive dataset ensures accurate predictions 
                across various weather conditions and seasonal variations.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">2015-2024 Data</Badge>
                <Badge variant="secondary">Pune, India</Badge>
                <Badge variant="secondary">Daily Resolution</Badge>
                <Badge variant="secondary">NASA POWER API</Badge>
              </div>
            </CardContent>
          </Card>

          {/* ML Model Info */}
          <Card className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} solar-glow`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-accent" />
                XGBoost ML Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our XGBoost Regressor model is trained to predict ALLSKY_SFC_SW_DWN (All Sky Surface Shortwave 
                Downward Irradiance) - the key metric for solar energy potential. The model learns complex 
                relationships between weather parameters and solar radiation.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">XGBoost Algorithm</Badge>
                <Badge variant="secondary">Gradient Boosting</Badge>
                <Badge variant="secondary">Feature Engineering</Badge>
                <Badge variant="secondary">High Accuracy</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weather Features Grid */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 text-foreground">Weather Features Analyzed</h3>
          <p className="text-muted-foreground">Key meteorological parameters that influence solar energy generation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.label}
              className={`transition-all duration-700 hover:scale-105 solar-glow ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                <h4 className="font-semibold mb-2 text-lg">{feature.label}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;