
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Aircraft } from "@/types/weststar";

interface AircraftDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aircraft: Aircraft;
}

export function AircraftDetailsDialog({ open, onOpenChange, aircraft }: AircraftDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Aircraft Status Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 p-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-blue-900 mb-2">Basic Information</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Tail Number:</span>
                    <span className="font-medium">{aircraft.tailNumber}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Model:</span>
                    <span className="font-medium">{aircraft.model}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Environment:</span>
                    <span className="font-medium capitalize">{aircraft.environment}</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-blue-900 mb-2">Usage Statistics</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Total Flight Hours:</span>
                    <span className="font-medium">{aircraft.flightHours}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Total Cycles:</span>
                    <span className="font-medium">{aircraft.cycles}</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-blue-900 mb-2">Maintenance Information</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Last Inspection:</span>
                    <span className="font-medium">
                      {new Date(aircraft.lastInspectionDate!).toLocaleDateString()}
                    </span>
                  </p>
                  {aircraft.nextInspectionDue && (
                    <p className="flex justify-between">
                      <span className="text-gray-600">Next Inspection Due:</span>
                      <span className="font-medium">
                        {new Date(aircraft.nextInspectionDue).toLocaleDateString()}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
