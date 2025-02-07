
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function WorkCardForm() {
  const [flightHours, setFlightHours] = useState("");
  const [cycles, setCycles] = useState("");
  const [environment, setEnvironment] = useState("");
  const [workCard, setWorkCard] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generatePrompt = (flightHours: string, cycles: string, environment: string) => {
    return `For aircraft with ${flightHours} flight hours, ${cycles} cycles, operating in ${environment} environment, considering Every third 100 hour inspection (300 hours) or every 12 months & DMC-412-A-96-00-00-00A-00SA-A, can you provide all the related inspection description, tasks and parts and generate the work card?`;
  };

  async function query(data: { question: string }) {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/prediction/7f8cd391-aa9d-417e-bf62-9f468fda4422",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result.text;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setWorkCard("");

    try {
      const prompt = generatePrompt(flightHours, cycles, environment);
      const response = await query({ question: prompt });
      setWorkCard(response);

      toast({
        title: "Work Card Generated",
        description: "The work card has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate work card. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating work card:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-workspace-text">
            Work Card Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="flightHours">Flight Hours</Label>
              <Input
                id="flightHours"
                type="number"
                placeholder="Enter total flight hours"
                value={flightHours}
                onChange={(e) => setFlightHours(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycles">Cycles</Label>
              <Input
                id="cycles"
                type="number"
                placeholder="Enter total cycles"
                value={cycles}
                onChange={(e) => setCycles(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="environment">Operating Environment</Label>
              <Input
                id="environment"
                placeholder="e.g., Coastal, Desert, Arctic"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-workspace-primary hover:bg-workspace-primary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Work Card"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {workCard && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-workspace-text">
              Generated Work Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap bg-muted p-4 rounded-lg">
              {workCard}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
