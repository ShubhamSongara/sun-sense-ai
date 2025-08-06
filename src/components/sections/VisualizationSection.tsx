import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, BarChart3, PieChart, TrendingUp } from "lucide-react";

// Mock data for visualizations
const historicalData = [
  { month: 'Jan', solar: 12.5 },
  { month: 'Feb', solar: 15.2 },
  { month: 'Mar', solar: 18.7 },
  { month: 'Apr', solar: 22.1 },
  { month: 'May', solar: 24.8 },
  { month: 'Jun', solar: 26.3 },
  { month: 'Jul', solar: 25.1 },
  { month: 'Aug', solar: 23.9 },
  { month: 'Sep', solar: 21.2 },
  { month: 'Oct', solar: 17.8 },
  { month: 'Nov', solar: 14.3 },
  { month: 'Dec', solar: 11.9 }
];

const predictionAccuracy = [
  { month: 'Jan', predicted: 12.8, actual: 12.5 },
  { month: 'Feb', predicted: 15.1, actual: 15.2 },
  { month: 'Mar', predicted: 18.9, actual: 18.7 },
  { month: 'Apr', predicted: 21.9, actual: 22.1 },
  { month: 'May', predicted: 24.5, actual: 24.8 },
  { month: 'Jun', predicted: 26.1, actual: 26.3 }
];

const featureImportance = [
  { feature: 'Temperature', importance: 28.5, color: 'bg-red-500' },
  { feature: 'Cloud Cover', importance: 24.2, color: 'bg-blue-500' },
  { feature: 'Month', importance: 18.7, color: 'bg-green-500' },
  { feature: 'Humidity', importance: 12.1, color: 'bg-purple-500' },
  { feature: 'Wind Speed', importance: 8.9, color: 'bg-yellow-500' },
  { feature: 'Pressure', importance: 7.6, color: 'bg-indigo-500' }
];

const SimpleLineChart = ({ data }: { data: typeof historicalData }) => (
  <div className="h-64 flex items-end justify-between px-4 py-8 bg-gradient-to-t from-primary/5 to-transparent rounded-lg">
    {data.map((item, index) => (
      <div key={item.month} className="flex flex-col items-center space-y-2">
        <div 
          className="w-8 bg-gradient-solar rounded-t-md transition-all duration-1000 hover:scale-110"
          style={{ 
            height: `${(item.solar / 30) * 200}px`,
            animationDelay: `${index * 100}ms`
          }}
        />
        <span className="text-xs text-muted-foreground font-medium">{item.month}</span>
      </div>
    ))}
  </div>
);

const SimpleBarChart = ({ data }: { data: typeof predictionAccuracy }) => (
  <div className="h-64 flex items-end justify-between px-4 py-8 bg-gradient-to-t from-accent/5 to-transparent rounded-lg">
    {data.map((item, index) => (
      <div key={item.month} className="flex flex-col items-center space-y-2">
        <div className="flex space-x-1">
          <div 
            className="w-6 bg-primary rounded-t-md"
            style={{ height: `${(item.predicted / 30) * 180}px` }}
          />
          <div 
            className="w-6 bg-accent rounded-t-md"
            style={{ height: `${(item.actual / 30) * 180}px` }}
          />
        </div>
        <span className="text-xs text-muted-foreground font-medium">{item.month}</span>
      </div>
    ))}
  </div>
);

const FeatureImportanceChart = ({ data }: { data: typeof featureImportance }) => (
  <div className="space-y-4 p-4">
    {data.map((item, index) => (
      <div key={item.feature} className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{item.feature}</span>
          <span className="text-sm text-muted-foreground">{item.importance}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
            style={{ 
              width: `${item.importance}%`,
              animationDelay: `${index * 200}ms`
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

const VisualizationSection = () => {
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
    <section id="visualization" ref={sectionRef} className="py-20 px-6 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-energy bg-clip-text text-transparent">
            Data Insights & Analytics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore historical trends, model accuracy, and key factors influencing solar energy predictions
          </p>
        </div>

        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <LineChart className="w-4 h-4" />
              Solar Trends
            </TabsTrigger>
            <TabsTrigger value="accuracy" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Model Accuracy
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Feature Importance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <Card className={`transition-all duration-1000 delay-200 solar-glow ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Historical Solar Radiation Trends
                </CardTitle>
                <p className="text-muted-foreground">
                  Monthly average solar irradiance patterns based on 10 years of NASA POWER data
                </p>
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={historicalData} />
                <div className="flex flex-wrap gap-4 mt-6 justify-center">
                  <Badge variant="secondary">Peak: June (26.3 MJ/m²/day)</Badge>
                  <Badge variant="secondary">Low: December (11.9 MJ/m²/day)</Badge>
                  <Badge variant="secondary">Average: 19.1 MJ/m²/day</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accuracy">
            <Card className={`transition-all duration-1000 delay-200 solar-glow ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  Prediction vs Actual (2024)
                </CardTitle>
                <p className="text-muted-foreground">
                  Comparison of XGBoost model predictions against actual solar radiation measurements
                </p>
              </CardHeader>
              <CardContent>
                <SimpleBarChart data={predictionAccuracy} />
                <div className="flex justify-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span className="text-sm">Predicted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-accent rounded"></div>
                    <span className="text-sm">Actual</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Badge className="bg-green-500 text-white">RMSE: 0.85 MJ/m²/day</Badge>
                  <Badge className="bg-blue-500 text-white ml-2">R² Score: 0.94</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card className={`transition-all duration-1000 delay-200 solar-glow ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-secondary" />
                  XGBoost Feature Importance
                </CardTitle>
                <p className="text-muted-foreground">
                  Relative importance of weather parameters in predicting solar radiation
                </p>
              </CardHeader>
              <CardContent>
                <FeatureImportanceChart data={featureImportance} />
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Insights</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Temperature is the strongest predictor of solar radiation levels</li>
                    <li>• Cloud cover significantly impacts solar energy generation potential</li>
                    <li>• Seasonal patterns (month) play a crucial role in predictions</li>
                    <li>• Combined features provide 94% prediction accuracy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default VisualizationSection;