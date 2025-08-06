import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeroButton } from "@/components/ui/hero-button";
import { Badge } from "@/components/ui/badge";
import { Settings, Link, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApiConfigSection = () => {
  const [apiEndpoint, setApiEndpoint] = useState(
    localStorage.getItem('solar-api-endpoint') || ''
  );
  const [apiKey, setApiKey] = useState(
    localStorage.getItem('solar-api-key') || ''
  );
  const [isConfigured, setIsConfigured] = useState(
    !!localStorage.getItem('solar-api-endpoint')
  );
  
  const { toast } = useToast();

  const handleSaveConfig = () => {
    if (!apiEndpoint.trim()) {
      toast({
        title: "Missing API Endpoint",
        description: "Please enter your API endpoint URL.",
        variant: "destructive"
      });
      return;
    }

    // Validate URL format
    try {
      new URL(apiEndpoint);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid API endpoint URL.",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('solar-api-endpoint', apiEndpoint);
    if (apiKey.trim()) {
      localStorage.setItem('solar-api-key', apiKey);
    }

    setIsConfigured(true);
    toast({
      title: "Configuration Saved",
      description: "Your API settings have been saved successfully.",
    });
  };

  const handleTestConnection = async () => {
    if (!apiEndpoint.trim()) {
      toast({
        title: "No API Endpoint",
        description: "Please configure your API endpoint first.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Test connection with a simple GET request
      const response = await fetch(apiEndpoint, {
        method: 'HEAD', // Use HEAD to test connection without data
        headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}
      });

      if (response.ok) {
        toast({
          title: "Connection Successful",
          description: "Your API endpoint is responding correctly.",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: `API returned status: ${response.status}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to the API endpoint.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="mb-8 border-dashed border-2 border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          API Configuration
          {isConfigured && (
            <Badge className="bg-green-500 text-white">
              <Check className="w-3 h-3 mr-1" />
              Configured
            </Badge>
          )}
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Configure your custom ML prediction API endpoint
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="api-endpoint">API Endpoint URL</Label>
          <Input
            id="api-endpoint"
            type="url"
            placeholder="https://your-api.com/predict"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Your ML model API endpoint that accepts POST requests
          </p>
        </div>

        <div>
          <Label htmlFor="api-key">API Key (Optional)</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Your API key (if required)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Leave empty if your API doesn't require authentication
          </p>
        </div>

        <div className="flex gap-2">
          <HeroButton 
            variant="solar" 
            onClick={handleSaveConfig}
            className="flex-1"
          >
            <Settings className="w-4 h-4" />
            Save Configuration
          </HeroButton>
          
          <HeroButton 
            variant="outline" 
            onClick={handleTestConnection}
            disabled={!apiEndpoint.trim()}
          >
            <Link className="w-4 h-4" />
            Test Connection
          </HeroButton>
        </div>

        {isConfigured && (
          <div className="bg-muted/30 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-2">Expected API Format</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Method:</strong> POST</p>
              <p><strong>Content-Type:</strong> application/json</p>
              <p><strong>Request Body:</strong></p>
              <pre className="bg-muted/50 p-2 rounded text-xs overflow-x-auto">
{`{
  "temperature": 25.5,
  "humidity": 65,
  "wind_speed": 3.2,
  "precipitation": 0,
  "pressure": 101.3,
  "month": 6,
  "day_of_year": 180,
  "weekday": 1
}`}
              </pre>
              <p><strong>Expected Response:</strong></p>
              <pre className="bg-muted/50 p-2 rounded text-xs">
{`{ "prediction": 24.8 }`}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiConfigSection;