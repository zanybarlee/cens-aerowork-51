
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
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

interface FlightHoursInputProps {
  value: string;
  onChange: (value: string) => void;
  currentFlightHours: number;
}

export function FlightHoursInput({ value, onChange, currentFlightHours }: FlightHoursInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      onChange(value);
    }
  };

  return (
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
              <p className="text-sm">Current flight hours: {currentFlightHours}</p>
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
          value={value}
          onChange={handleChange}
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
            <DropdownMenuItem onClick={() => onChange("3500")}>
              3500 Hours (Current)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChange("3600")}>
              3600 Hours
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChange("3700")}>
              3700 Hours
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
