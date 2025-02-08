
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { format } from "date-fns";

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

  const handleFlightHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setFlightHours(value);
    }
  };

  const handleCyclesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setCycles(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(flightHours, cycles, environment);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg mb-4">
        <div>
          <p className="text-sm font-medium">Tail Number: {aircraft.tailNumber}</p>
          <p className="text-sm font-medium">Model: {aircraft.model}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Environment: {aircraft.environment}</p>
          {aircraft.lastInspectionDate && (
            <p className="text-sm font-medium">
              Last Inspection: {format(new Date(aircraft.lastInspectionDate), 'MMM dd, yyyy')}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="flightHours">Flight Hours</Label>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <p className="text-sm">Current flight hours: {aircraft.flightHours}</p>
                <p className="text-sm text-muted-foreground">
                  Enter the updated flight hours after recent operations
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="relative flex gap-2">
          <Input
            id="flightHours"
            type="text"
            placeholder="Enter flight hours"
            value={flightHours}
            onChange={handleFlightHoursChange}
            className="flex-1"
            required
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" type="button">
                Presets
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFlightHours("3500")}>
                3500 Hours (Current)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFlightHours("3600")}>
                3600 Hours
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFlightHours("3700")}>
                3700 Hours
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="cycles">Cycles</Label>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <p className="text-sm">Current cycles: {aircraft.cycles}</p>
                <p className="text-sm text-muted-foreground">
                  Enter the updated number of cycles after recent operations
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="relative flex gap-2">
          <Input
            id="cycles"
            type="text"
            placeholder="Enter total cycles"
            value={cycles}
            onChange={handleCyclesChange}
            className="flex-1"
            required
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" type="button">
                Presets
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCycles("1200")}>
                1200 Cycles (Current)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCycles("1250")}>
                1250 Cycles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCycles("1300")}>
                1300 Cycles
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="environment">Operating Environment</Label>
        <Input
          id="environment"
          placeholder="e.g., Coastal, Desert, Arctic"
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
          required
        />
      </div>

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
