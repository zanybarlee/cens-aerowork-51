
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface EnvironmentInputProps {
  value: string;
  onChange: (value: string) => void;
}

const environmentPresets = [
  { value: "offshore", label: "Offshore" },
  { value: "desert", label: "Desert" },
  { value: "arctic", label: "Arctic" },
  { value: "tropical", label: "Tropical" },
  { value: "coastal", label: "Coastal" },
  { value: "mountain", label: "Mountain" },
  { value: "urban", label: "Urban" },
];

export function EnvironmentInput({ value, onChange }: EnvironmentInputProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  // Handle direct input changes
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="environment">Operating Environment</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value || "Select operating environment..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder="Search or enter custom environment..."
              value={inputValue}
              onValueChange={handleInputChange}
            />
            <CommandEmpty>No environment found.</CommandEmpty>
            <CommandGroup>
              {environmentPresets.map((env) => (
                <CommandItem
                  key={env.value}
                  value={env.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setInputValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === env.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {env.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
