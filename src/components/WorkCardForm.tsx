
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkCardInputForm } from "./WorkCardGenerator/WorkCardInputForm";
import { useWorkCardGeneration } from "@/hooks/useWorkCardGeneration";
import { WorkCardFormProps } from "@/types/workCard";
import { WorkCardDetails } from "./WorkCardGenerator/WorkCardDetails";
import { useWorkCards } from "@/hooks/useWorkCards";
import { v4 as uuidv4 } from 'uuid';
import { StoredWorkCardsTable } from "./WorkCardGenerator/StoredWorkCardsTable";

export function WorkCardForm({ userRole, aircraft }: WorkCardFormProps) {
  const { workCard, isLoading, generateWorkCard } = useWorkCardGeneration(aircraft);
  const { addWorkCard, storedWorkCards, deleteWorkCard } = useWorkCards(userRole);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string>("");

  const handleSubmit = async (flightHours: string, cycles: string, environment: string) => {
    const generatedCard = await generateWorkCard(flightHours, cycles, environment);
    if (generatedCard) {
      // Store the work card
      addWorkCard({
        id: uuidv4(),
        content: generatedCard,
        flightHours,
        cycles,
        environment,
        date: new Date().toLocaleDateString(),
        role: userRole
      });
      setSelectedContent(generatedCard);
      setShowModal(true);
    }
  };

  const handleViewDetails = (content: string) => {
    setSelectedContent(content);
    setShowModal(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Work Card Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <WorkCardInputForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          aircraft={aircraft}
        />
        
        <StoredWorkCardsTable 
          workCards={storedWorkCards}
          onDelete={deleteWorkCard}
          onViewDetails={handleViewDetails}
        />

        <WorkCardDetails
          isOpen={showModal}
          onOpenChange={setShowModal}
          content={selectedContent || workCard || ""}
        />
      </CardContent>
    </Card>
  );
}
