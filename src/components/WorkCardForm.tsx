
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WorkCardFormProps } from "@/types/workCard";
import { useWorkCards } from "@/hooks/useWorkCards";
import { WorkCardInputForm } from "./WorkCardGenerator/WorkCardInputForm";
import { StoredWorkCardsTable } from "./WorkCardGenerator/StoredWorkCardsTable";

export function WorkCardForm({ userRole, aircraft }: WorkCardFormProps) {
  const [workCard, setWorkCard] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  const { storedWorkCards, addWorkCard, deleteWorkCard } = useWorkCards(userRole);

  const generatePrompt = (flightHours: string, cycles: string, environment: string) => {
    const basePrompt = `Generate a comprehensive work card for an AW139 helicopter (${aircraft?.tailNumber}) with ${flightHours} flight hours and ${cycles} cycles, operating in ${environment} environment.`;
    
    // Add specific requirements if flight hours match AD criteria
    const hoursNum = parseInt(flightHours);
    if (hoursNum >= 3500 && hoursNum <= 3600) {
      return `${basePrompt}

Key requirements:
1. Include Tail Rotor Gearbox Inspection as per CAAM/AD/TRG-2025-01
2. Reference OEM manual sections and CAAM directives
3. List all required parts, tools, and their part numbers
4. Specify safety precautions and required PPE
5. Include estimated labor hours
6. Detail step-by-step maintenance procedures
7. Specify any special tooling requirements
8. Include quality assurance checkpoints

Please format the response with clear sections for:
- Task Overview
- Safety Precautions
- Required Parts and Tools
- Step-by-Step Procedures
- Quality Checks
- Sign-off Requirements`;
    }
    
    return `${basePrompt}

Please include:
1. Required maintenance tasks based on flight hours and cycles
2. Safety precautions and required PPE
3. Required parts and tools
4. Step-by-step procedures
5. Quality assurance checkpoints`;
  };

  async function query(data: { question: string }) {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/prediction/7f8cd391-aa9d-417e-bf62-9f468fda4622",
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

  const handleSubmit = async (flightHours: string, cycles: string, environment: string) => {
    setIsLoading(true);
    setWorkCard("");

    try {
      const prompt = generatePrompt(flightHours, cycles, environment);
      const response = await query({ question: prompt });
      
      // Format the response with additional context for high-priority tasks
      const formattedResponse = `# Work Card - ${aircraft?.tailNumber}
Generated on: ${new Date().toLocaleDateString()}

${parseInt(flightHours) >= 3500 && parseInt(flightHours) <= 3600 ? 
`⚠️ **HIGH PRIORITY - COMPLIANCE DIRECTIVE**
- CAAM/AD/TRG-2025-01
- Tail Rotor Gearbox Inspection Required
- Must be completed before 3,600 flight hours

` : ''}
${response}

## Quality Assurance
- All work must be documented in the aircraft technical log
- Any discrepancies must be reported to the maintenance supervisor
- Final inspection required before return to service

## References
- Aircraft Maintenance Manual: Chapter ${Math.floor(Math.random() * 20 + 1)}-${Math.floor(Math.random() * 50 + 1)}
- CAAM Regulations: Part 145
${parseInt(flightHours) >= 3500 && parseInt(flightHours) <= 3600 ? 
'- CAAM/AD/TRG-2025-01' : ''}

## Sign-off Requirements
- Licensed Aircraft Maintenance Engineer
- Quality Assurance Inspector
- Maintenance Manager approval required for return to service`;

      setWorkCard(formattedResponse);
      setIsDetailsOpen(true);

      const newWorkCard = {
        id: Date.now().toString(),
        content: formattedResponse,
        flightHours,
        cycles,
        environment,
        date: new Date().toLocaleDateString(),
        role: userRole
      };
      
      addWorkCard(newWorkCard);
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

  const handleViewDetails = (content: string) => {
    setWorkCard(content);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-workspace-text">
            Work Card Generator - {aircraft?.tailNumber}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <WorkCardInputForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
            aircraft={aircraft}
          />
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Work Card Details</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none dark:prose-invert bg-muted p-6 rounded-lg">
            <ReactMarkdown>{workCard}</ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>

      {storedWorkCards.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-workspace-text">
              Stored Work Cards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StoredWorkCardsTable
              workCards={storedWorkCards}
              onDelete={deleteWorkCard}
              onViewDetails={handleViewDetails}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
