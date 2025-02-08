
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

interface CyclesInputProps {
  value: string;
  onChange: (value: string) => void;
  currentCycles: number;
}

export function CyclesInput({ value, onChange, currentCycles }: CyclesInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      onChange(value);
    }
  };

  return (
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
              <p className="text-sm">Current cycles: {currentCycles}</p>
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
            <DropdownMenuItem onClick={() => onChange("1200")}>
              1200 Cycles (Current)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChange("1250")}>
              1250 Cycles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChange("1300")}>
              1300 Cycles
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
