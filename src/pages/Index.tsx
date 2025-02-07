
import React from "react";
import { AircraftSelector } from "@/components/AircraftSelector";
import { WorkCardForm } from "@/components/WorkCardForm";
import { MainDashboard } from "@/components/MainDashboard";

const Index = () => {
  const handleAircraftSelect = (model: string) => {
    console.log("Selected aircraft:", model);
  };

  return (
    <div className="min-h-screen bg-workspace-background">
      <div className="container mx-auto py-8 px-4 space-y-8">
        <header className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-workspace-primary mb-2">
            Aerospace Work Card Generator
          </h1>
          <p className="text-workspace-text text-lg">
            Create detailed maintenance work cards with ease
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <AircraftSelector onSelect={handleAircraftSelect} />
            <WorkCardForm />
          </div>
          <div className="space-y-8">
            <MainDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
