
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AircraftInfo } from "./AircraftInfo";
import { FlightHoursInput } from "./FlightHoursInput";
import { CyclesInput } from "./CyclesInput";
import { EnvironmentInput } from "./EnvironmentInput";

interface WorkCardInputFormProps {
  onSubmit: (flightHours: string, cycles: string, environment: string) => Promise<void>;
  isLoading: boolean;
  aircraft: {
    tailNumber: string;
    model: string;
    flightHours: number;
    cycles: number;
    environment: string;
    lastInspectionDate?: string;
  };
}

export function WorkCardInputForm({ onSubmit, isLoading, aircraft }: WorkCardInputFormProps) {
  const [flightHours, setFlightHours] = useState(aircraft.flightHours.toString());
  const [cycles, setCycles] = useState(aircraft.cycles.toString());
  const [environment, setEnvironment] = useState(aircraft.environment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(flightHours, cycles, environment);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AircraftInfo aircraft={aircraft} />

      <FlightHoursInput
        value={flightHours}
        onChange={setFlightHours}
        currentFlightHours={aircraft.flightHours}
      />

      <CyclesInput
        value={cycles}
        onChange={setCycles}
        currentCycles={aircraft.cycles}
      />

      <EnvironmentInput
        value={environment}
        onChange={(e) => setEnvironment(e.target.value)}
      />

      <Button 
        type="submit"
        className="w-full bg-workspace-primary hover:bg-workspace-primary/90 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Work Card"
        )}
      </Button>
    </form>
  );
}
