
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

export function WorkCardForm({ userRole }: WorkCardFormProps) {
  const [workCard, setWorkCard] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  const { storedWorkCards, addWorkCard, deleteWorkCard } = useWorkCards(userRole);

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

  const handleSubmit = async (flightHours: string, cycles: string, environment: string) => {
    setIsLoading(true);
    setWorkCard("");

    try {
      const prompt = generatePrompt(flightHours, cycles, environment);
      const response = await query({ question: prompt });
      setWorkCard(response);
      setIsDetailsOpen(true);

      const newWorkCard = {
        id: Date.now().toString(),
        content: response,
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
            Work Card Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <WorkCardInputForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Work Card Details</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none dark:prose-invert bg-muted p-4 rounded-lg">
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
