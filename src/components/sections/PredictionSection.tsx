import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeroButton } from "@/components/ui/hero-button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sun, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionData {
  temperature: string;
  humidity: string;
  windSpeed: string;
  precipitation: string;
  pressure: string;
  month: string;
  dayOfYear: string;
  weekday: string;
}

const PredictionSection = () => {
  const [formData, setFormData] = useState<PredictionData>({
    temperature: "",
    humidity: "",
    windSpeed: "",
    precipitation: "",
    pressure: "",
    month: "",
    dayOfYear: "",
    weekday: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const handleInputChange = (field: keyof PredictionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePredict = async () => {
    // Validate inputs
    const requiredFields = Object.entries(formData);
    const emptyFields = requiredFields.filter(([_, value]) => !value.trim());
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get an accurate prediction.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to ML model
      // In real implementation, this would call your Python Flask/FastAPI backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock prediction calculation based on inputs
      const temp = parseFloat(formData.temperature);
      const humidity = parseFloat(formData.humidity);
      const wind = parseFloat(formData.windSpeed);
      const precip = parseFloat(formData.precipitation);
      
      // Simplified prediction logic (replace with actual ML model call)
      const basePrediction = 15 + (temp * 0.3) - (humidity * 0.1) + (wind * 0.2) - (precip * 2);
      const seasonalFactor = parseInt(formData.month) <= 6 ? 1.2 : 0.8;
      const mockPrediction = Math.max(0, basePrediction * seasonalFactor);
      
      setPrediction(parseFloat(mockPrediction.toFixed(2)));
      
      toast({
        title: "Prediction Complete!",
        description: "Solar energy forecast has been generated successfully.",
      });
      
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Unable to generate prediction. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPredictionCategory = (value: number) => {
    if (value > 20) return { label: "Excellent", color: "bg-green-500", icon: Sun };
    if (value > 15) return { label: "Good", color: "bg-yellow-500", icon: Zap };
    if (value > 10) return { label: "Moderate", color: "bg-orange-500", icon: TrendingUp };
    return { label: "Low", color: "bg-red-500", icon: TrendingUp };
  };

  return (
    <section id="prediction" ref={sectionRef} className="py-20 px-6 bg-gradient-to-br from-background to-muted/50">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-solar bg-clip-text text-transparent">
            Solar Energy Predictor
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter current weather conditions to get an AI-powered prediction of solar energy generation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className={`transition-all duration-1000 delay-200 solar-glow ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Weather Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="25.5"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange("temperature", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    type="number"
                    placeholder="65"
                    value={formData.humidity}
                    onChange={(e) => handleInputChange("humidity", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="windSpeed">Wind Speed (m/s)</Label>
                  <Input
                    id="windSpeed"
                    type="number"
                    placeholder="3.2"
                    value={formData.windSpeed}
                    onChange={(e) => handleInputChange("windSpeed", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="precipitation">Precipitation (mm)</Label>
                  <Input
                    id="precipitation"
                    type="number"
                    placeholder="0"
                    value={formData.precipitation}
                    onChange={(e) => handleInputChange("precipitation", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="pressure">Pressure (kPa)</Label>
                  <Input
                    id="pressure"
                    type="number"
                    placeholder="101.3"
                    value={formData.pressure}
                    onChange={(e) => handleInputChange("pressure", e.target.value)}
                  />
                </div>

                <div>
                  <Label>Month</Label>
                  <Select value={formData.month} onValueChange={(value) => handleInputChange("month", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dayOfYear">Day of Year</Label>
                  <Input
                    id="dayOfYear"
                    type="number"
                    placeholder="180"
                    min="1"
                    max="366"
                    value={formData.dayOfYear}
                    onChange={(e) => handleInputChange("dayOfYear", e.target.value)}
                  />
                </div>

                <div>
                  <Label>Weekday</Label>
                  <Select value={formData.weekday} onValueChange={(value) => handleInputChange("weekday", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                        <SelectItem key={day} value={index.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <HeroButton 
                variant="solar" 
                size="lg" 
                onClick={handlePredict}
                disabled={isLoading}
                className="w-full mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" />
                    Predict Solar Energy
                  </>
                )}
              </HeroButton>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className={`transition-all duration-1000 delay-400 solar-glow ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Prediction Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {prediction === null ? (
                <div className="text-center py-12">
                  <Sun className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    Enter weather parameters and click predict to see solar energy forecast
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Predicted Solar Irradiance</p>
                    <div className="text-4xl font-bold bg-gradient-solar bg-clip-text text-transparent">
                      {prediction} MJ/m²/day
                    </div>
                  </div>
                  
                  {(() => {
                    const category = getPredictionCategory(prediction);
                    const IconComponent = category.icon;
                    return (
                      <div className="flex items-center justify-center gap-2">
                        <IconComponent className="w-5 h-5" />
                        <Badge className={`${category.color} text-white`}>
                          {category.label} Generation Potential
                        </Badge>
                      </div>
                    );
                  })()}
                  
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold">Energy Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      {prediction > 20 
                        ? "Excellent conditions for solar energy generation! Perfect weather for maximum panel efficiency."
                        : prediction > 15
                        ? "Good solar conditions. Panels should generate substantial energy today."
                        : prediction > 10
                        ? "Moderate solar potential. Some cloud cover may be affecting irradiance levels."
                        : "Low solar generation expected. Weather conditions are not optimal for solar panels."
                      }
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PredictionSection;