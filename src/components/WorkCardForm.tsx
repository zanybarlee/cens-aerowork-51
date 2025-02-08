
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkCardInputForm } from "./WorkCardGenerator/WorkCardInputForm";
import { useWorkCardGeneration } from "@/hooks/useWorkCardGeneration";
import { WorkCardFormProps, StoredWorkCard } from "@/types/workCard";
import { WorkCardDetails } from "./WorkCardGenerator/WorkCardDetails";
import { useWorkCards } from "@/hooks/useWorkCards";
import { v4 as uuidv4 } from 'uuid';
import { StoredWorkCardsTable } from "./WorkCardGenerator/StoredWorkCardsTable";
import { useToast } from "@/components/ui/use-toast";

export function WorkCardForm({ userRole, aircraft }: WorkCardFormProps) {
  const { workCard, isLoading, generateWorkCard } = useWorkCardGeneration(aircraft);
  const { addWorkCard, storedWorkCards, deleteWorkCard, scheduleWorkCard } = useWorkCards(userRole);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<StoredWorkCard | undefined>();
  const { toast } = useToast();

  const handleSubmit = async (flightHours: string, cycles: string, environment: string) => {
    const generatedCard = await generateWorkCard(flightHours, cycles, environment);
    if (generatedCard) {
      const newCard = {
        id: uuidv4(),
        content: generatedCard,
        flightHours,
        cycles,
        environment,
        date: new Date().toLocaleDateString(),
        role: userRole,
        status: 'draft'
      };
      addWorkCard(newCard);
      setSelectedCard(newCard);
      setSelectedContent(generatedCard);
      setShowModal(true);
    }
  };

  const handleViewDetails = (card: StoredWorkCard) => {
    setSelectedCard(card);
    setSelectedContent(card.content);
    setShowModal(true);
  };

  const handleComplete = (taskResults: string, remarks: string) => {
    if (selectedCard) {
      const updatedCard = {
        ...selectedCard,
        status: 'completed' as const,
        taskResults,
        completionRemarks: remarks,
        completedBy: userRole,
        completionDate: new Date().toLocaleDateString()
      };
      addWorkCard(updatedCard);

      toast({
        title: "Work Card Completed",
        description: "The work card has been marked as completed and compliance records have been updated.",
      });

      // Close the modal
      setShowModal(false);
    }
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
          onSchedule={scheduleWorkCard}
          userRole={userRole}
        />

        <WorkCardDetails
          isOpen={showModal}
          onOpenChange={setShowModal}
          content={selectedContent}
          workCard={selectedCard}
          userRole={userRole}
          onComplete={handleComplete}
        />
      </CardContent>
    </Card>
  );
}
