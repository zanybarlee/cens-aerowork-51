
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WorkCardInputFormProps {
  onSubmit: (flightHours: string, cycles: string, environment: string) => Promise<void>;
  isLoading: boolean;
}

export function WorkCardInputForm({ onSubmit, isLoading }: WorkCardInputFormProps) {
  const [flightHours, setFlightHours] = useState("100");
  const [cycles, setCycles] = useState("");
  const [environment, setEnvironment] = useState("");

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
      <div className="space-y-2">
        <Label htmlFor="flightHours">Flight Hours</Label>
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
              <DropdownMenuItem onClick={() => setFlightHours("100")}>
                100 Hours
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFlightHours("300")}>
                300 Hours
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFlightHours("600")}>
                600 Hours
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cycles">Cycles</Label>
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
              <DropdownMenuItem onClick={() => setCycles("10")}>
                10 Cycles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCycles("20")}>
                20 Cycles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCycles("50")}>
                50 Cycles
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
