
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkCardInputForm } from "./WorkCardGenerator/WorkCardInputForm";
import { useWorkCardGeneration } from "@/hooks/useWorkCardGeneration";
import { WorkCardFormProps } from "@/types/workCard";
import { WorkCardDetails } from "./WorkCardGenerator/WorkCardDetails";
import { useWorkCards } from "@/hooks/useWorkCards";
import { v4 as uuidv4 } from 'uuid';

export function WorkCardForm({ userRole, aircraft }: WorkCardFormProps) {
  const { workCard, isLoading, generateWorkCard } = useWorkCardGeneration(aircraft);
  const { addWorkCard } = useWorkCards(userRole);
  const [showModal, setShowModal] = useState(false);

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
      setShowModal(true);
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
        
        {workCard && (
          <WorkCardDetails
            isOpen={showModal}
            onOpenChange={setShowModal}
            content={workCard}
          />
        )}
      </CardContent>
    </Card>
  );
}
