
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkCardInputForm } from "./WorkCardGenerator/WorkCardInputForm";
import { useWorkCardGeneration } from "@/hooks/useWorkCardGeneration";
import { WorkCardFormProps } from "@/types/workCard";

export function WorkCardForm({ userRole, aircraft }: WorkCardFormProps) {
  const { workCard, isLoading, generateWorkCard } = useWorkCardGeneration(aircraft);

  const handleSubmit = async (flightHours: string, cycles: string, environment: string) => {
    await generateWorkCard(flightHours, cycles, environment);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Work Card Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <WorkCardInputForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          aircraft={aircraft}
        />
      </CardContent>
    </Card>
  );
}

