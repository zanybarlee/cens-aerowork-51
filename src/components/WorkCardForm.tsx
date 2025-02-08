
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkCardInputForm } from "./WorkCardGenerator/WorkCardInputForm";
import { useWorkCardGeneration } from "@/hooks/useWorkCardGeneration";
import { WorkCardFormProps } from "@/types/workCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

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
      <CardContent className="space-y-6">
        <WorkCardInputForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          aircraft={aircraft}
        />
        
        {workCard && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Generated Work Card</h3>
            <Card className="bg-muted">
              <CardContent className="p-4">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{workCard}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
