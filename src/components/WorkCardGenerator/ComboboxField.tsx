
import React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ComboboxFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; }[];
  open: boolean;
  setOpen: (open: boolean) => void;
  placeholder: string;
}

export function ComboboxField({
  label,
  value,
  onChange,
  options,
  open,
  setOpen,
  placeholder,
}: ComboboxFieldProps) {
  const getDisplayValue = () => {
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : value || placeholder;
  };

  const handleSelect = (currentValue: string) => {
    const selectedOption = options.find(opt => opt.value === currentValue);
    if (selectedOption) {
      onChange(selectedOption.value);
      setOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {getDisplayValue()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder={`Search or enter custom ${label.toLowerCase()}...`}
              onValueChange={(search) => {
                if (!options.some(opt => opt.value === search || opt.label === search)) {
                  onChange(search);
                }
              }}
            />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup heading={`Preset ${label}s`}>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
