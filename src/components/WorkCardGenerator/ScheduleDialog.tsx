
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
  const handleScheduleSubmit = () => {
    if (selectedCard) {
      onSchedule(
        selectedCard.id,
        schedulingData.scheduledDate,
        schedulingData.scheduledLocation,
        schedulingData.assignedTechnician,
        [{ partNumber: schedulingData.partNumber, quantity: Number(schedulingData.quantity) }]
      );
      onOpenChange(false); // Close the dialog after scheduling
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
          <div className="space-y-2">
            <Label htmlFor="scheduledLocation">Location</Label>
            <Input
              id="scheduledLocation"
              value={schedulingData.scheduledLocation}
              onChange={(e) => setSchedulingData(prev => ({ ...prev, scheduledLocation: e.target.value }))}
              placeholder="e.g., Subang HQ – Bay 2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedTechnician">Assigned Technician</Label>
            <Input
              id="assignedTechnician"
              value={schedulingData.assignedTechnician}
              onChange={(e) => setSchedulingData(prev => ({ ...prev, assignedTechnician: e.target.value }))}
              placeholder="e.g., Tech ID: 007"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="partNumber">Required Part Number</Label>
            <Input
              id="partNumber"
              value={schedulingData.partNumber}
              onChange={(e) => setSchedulingData(prev => ({ ...prev, partNumber: e.target.value }))}
              placeholder="e.g., AW139-GSKT-TR"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={schedulingData.quantity}
              onChange={(e) => setSchedulingData(prev => ({ ...prev, quantity: e.target.value }))}
              placeholder="e.g., 2"
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
