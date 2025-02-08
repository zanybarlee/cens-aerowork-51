
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkCardInputForm } from "./WorkCardGenerator/WorkCardInputForm";
import { useWorkCardGeneration } from "@/hooks/useWorkCardGeneration";
import { WorkCardFormProps, StoredWorkCard } from "@/types/workCard";
import { WorkCardDetails } from "./WorkCardGenerator/WorkCardDetails";
import { useWorkCards } from "@/hooks/useWorkCards";
import { v4 as uuidv4 } from 'uuid';
import { StoredWorkCardsTable } from "./WorkCardGenerator/StoredWorkCardsTable";
import { useToast } from "@/hooks/use-toast";

export function WorkCardForm({ userRole, aircraft }: WorkCardFormProps) {
  const { workCard, isLoading, generateWorkCard } = useWorkCardGeneration(aircraft);
  const { addWorkCard, storedWorkCards, deleteWorkCard, scheduleWorkCard } = useWorkCards(userRole);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<StoredWorkCard | undefined>();
  const { toast } = useToast();

  // Listen for work card generation events
  useEffect(() => {
    const handleWorkCardGeneration = async (event: CustomEvent) => {
      const { flightHours, cycles, environment, directive } = event.detail;
      await handleSubmit(flightHours, cycles, environment);
    };

    window.addEventListener('generateWorkCard', handleWorkCardGeneration as EventListener);
    return () => {
      window.removeEventListener('generateWorkCard', handleWorkCardGeneration as EventListener);
    };
  }, []);

  const handleSubmit = async (flightHours: string, cycles: string, environment: string) => {
    const generatedCard = await generateWorkCard(flightHours, cycles, environment);
    if (generatedCard) {
      const workCardId = `WC-${new Date().getFullYear()}-${uuidv4().slice(0, 8)}`.toUpperCase();
      const newCard: StoredWorkCard = {
        id: workCardId,
        content: generatedCard,
        flightHours,
        cycles,
        environment,
        date: new Date().toLocaleDateString(),
        role: userRole,
        status: 'draft' as const
      };
      addWorkCard(newCard);
      setSelectedCard(newCard);
      setSelectedContent(generatedCard);
      setShowModal(true);
    }
  };

  const handleViewDetails = (content: string) => {
    const card = storedWorkCards.find(c => c.content === content);
    setSelectedCard(card);
    setSelectedContent(content);
    setShowModal(true);
  };

  const handleComplete = (taskResults: string, remarks: string, signature: string) => {
    if (selectedCard) {
      const updatedCard: StoredWorkCard = {
        ...selectedCard,
        status: 'completed' as const,
        taskResults,
        completionRemarks: remarks,
        completedBy: signature,
        completionDate: new Date().toLocaleDateString()
      };
      addWorkCard(updatedCard);

      // If this is a compliance-related work card, update the bulletin status
      if (updatedCard.flightHours >= "3500" && updatedCard.flightHours <= "3600") {
        toast({
          title: "Compliance Update",
          description: "CAAM/AD/TRG-2025-01 status has been updated to Closed in the Compliance Management System.",
        });
      }

      toast({
        title: "Work Card Completed",
        description: "The work card has been completed and signed off successfully.",
      });

      setShowModal(false);
    }
  };

  return (
    <Card className="w-full" id="work-card-section">
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
