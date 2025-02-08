
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StoredWorkCard } from "@/types/workCard";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Preset options
const locationPresets = [
  { value: "subang-hq-bay1", label: "Subang HQ – Bay 1" },
  { value: "subang-hq-bay2", label: "Subang HQ – Bay 2" },
  { value: "kota-kinabalu-hangar", label: "Kota Kinabalu Hangar" },
  { value: "miri-facility", label: "Miri Facility" },
];

const technicianPresets = [
  { value: "tech-001", label: "Tech ID: 001 - John Smith" },
  { value: "tech-002", label: "Tech ID: 002 - Jane Doe" },
  { value: "tech-003", label: "Tech ID: 003 - Mike Johnson" },
  { value: "tech-007", label: "Tech ID: 007 - Robert Wilson" },
];

const partPresets = [
  { value: "AW139-GSKT-TR", label: "AW139-GSKT-TR - Tail Rotor Gasket" },
  { value: "AW139-BRK-MN", label: "AW139-BRK-MN - Main Brake Assembly" },
  { value: "AW139-FLT-OIL", label: "AW139-FLT-OIL - Oil Filter" },
  { value: "AW139-BLD-SET", label: "AW139-BLD-SET - Main Rotor Blade Set" },
];

interface ScheduleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCard: StoredWorkCard | undefined;
  onSchedule: (
    cardId: string,
    scheduledDate: string,
    scheduledLocation: string,
    assignedTechnician: string,
    requiredParts: { partNumber: string; quantity: number }[]
  ) => void;
  schedulingData: {
    scheduledDate: string;
    scheduledLocation: string;
    assignedTechnician: string;
    partNumber: string;
    quantity: string;
  };
  setSchedulingData: React.Dispatch<
    React.SetStateAction<{
      scheduledDate: string;
      scheduledLocation: string;
      assignedTechnician: string;
      partNumber: string;
      quantity: string;
    }>
  >;
}

export function ScheduleDialog({
  isOpen,
  onOpenChange,
  selectedCard,
  onSchedule,
  schedulingData,
  setSchedulingData,
}: ScheduleDialogProps) {
  const [openLocation, setOpenLocation] = React.useState(false);
  const [openTechnician, setOpenTechnician] = React.useState(false);
  const [openPart, setOpenPart] = React.useState(false);

  const handleScheduleSubmit = () => {
    if (selectedCard) {
      onSchedule(
        selectedCard.id,
        schedulingData.scheduledDate,
        schedulingData.scheduledLocation,
        schedulingData.assignedTechnician,
        [{ partNumber: schedulingData.partNumber, quantity: Number(schedulingData.quantity) }]
      );
      onOpenChange(false);
    }
  };

  const ComboboxField = ({ 
    label, 
    value, 
    onChange, 
    options, 
    open, 
    setOpen, 
    placeholder 
  }: { 
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string; }[];
    open: boolean;
    setOpen: (open: boolean) => void;
    placeholder: string;
  }) => (
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
            {value || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder={`Search or enter custom ${label.toLowerCase()}...`}
              value={value}
              onValueChange={onChange}
            />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup heading={`Preset ${label}s`}>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(option.label);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.label ? "opacity-100" : "opacity-0"
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {schedulingData.scheduledDate ? 'Update Schedule' : 'Schedule Maintenance'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="scheduledDate">Date</Label>
            <Input
              id="scheduledDate"
              type="date"
              value={schedulingData.scheduledDate}
              onChange={(e) => setSchedulingData(prev => ({ ...prev, scheduledDate: e.target.value }))}
            />
          </div>

          <ComboboxField
            label="Location"
            value={schedulingData.scheduledLocation}
            onChange={(value) => setSchedulingData(prev => ({ ...prev, scheduledLocation: value }))}
            options={locationPresets}
            open={openLocation}
            setOpen={setOpenLocation}
            placeholder="Select location..."
          />

          <ComboboxField
            label="Assigned Technician"
            value={schedulingData.assignedTechnician}
            onChange={(value) => setSchedulingData(prev => ({ ...prev, assignedTechnician: value }))}
            options={technicianPresets}
            open={openTechnician}
            setOpen={setOpenTechnician}
            placeholder="Select technician..."
          />

          <ComboboxField
            label="Required Part"
            value={schedulingData.partNumber}
            onChange={(value) => setSchedulingData(prev => ({ ...prev, partNumber: value }))}
            options={partPresets}
            open={openPart}
            setOpen={setOpenPart}
            placeholder="Select part number..."
          />

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={schedulingData.quantity}
              onChange={(e) => setSchedulingData(prev => ({ ...prev, quantity: e.target.value }))}
              placeholder="Enter quantity..."
            />
          </div>

          <Button onClick={handleScheduleSubmit} className="w-full">
            {schedulingData.scheduledDate ? 'Update Schedule' : 'Schedule Maintenance'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
