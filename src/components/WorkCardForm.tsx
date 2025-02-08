
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkCardFormProps } from "@/types/workCard";
import { useWorkCards } from "@/hooks/useWorkCards";
import { useWorkCardGeneration } from "@/hooks/useWorkCardGeneration";
import { WorkCardInputForm } from "./WorkCardGenerator/WorkCardInputForm";
import { WorkCardDetails } from "./WorkCardGenerator/WorkCardDetails";
import { StoredWorkCardsTable } from "./WorkCardGenerator/StoredWorkCardsTable";

export function WorkCardForm({ userRole, aircraft }: WorkCardFormProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { storedWorkCards, addWorkCard, deleteWorkCard } = useWorkCards(userRole);
  const { workCard, isLoading, generateWorkCard, setWorkCard } = useWorkCardGeneration(aircraft);

  const handleSubmit = async (flightHours: string, cycles: string, environment: string) => {
    const generatedContent = await generateWorkCard(flightHours, cycles, environment);
    
    if (generatedContent) {
      setIsDetailsOpen(true);
      
      const newWorkCard = {
        id: Date.now().toString(),
        content: generatedContent,
        flightHours,
        cycles,
        environment,
        date: new Date().toLocaleDateString(),
        role: userRole
      };
      
      addWorkCard(newWorkCard);
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

      <WorkCardDetails 
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        content={workCard}
      />

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
