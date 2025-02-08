
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
import { ComboboxField } from "./ComboboxField";
import { locationPresets, technicianPresets, partPresets } from "./schedulePresets";

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
