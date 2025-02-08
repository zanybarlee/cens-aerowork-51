
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Aircraft } from "@/types/weststar";

interface MaintenanceSchedulerProps {
  aircraft: Aircraft;
}

export function MaintenanceScheduler({ aircraft }: MaintenanceSchedulerProps) {
  const maintenanceDate = new Date('2025-02-15');
  const inventoryStatus = {
    "AW139-GSKT-TR": {
      inStock: 2,
      leadTime: "2 weeks"
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Maintenance Schedule - {aircraft.tailNumber}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Next Scheduled Maintenance</h3>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">Date: {maintenanceDate.toLocaleDateString()}</p>
              <p className="text-sm">Location: Subang HQ – Bay 2</p>
              <p className="text-sm">Technician: Tech ID: 007, AW139 Certified</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Inventory Status</h3>
            {Object.entries(inventoryStatus).map(([part, status]) => (
              <div key={part} className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{part}</Badge>
                <span className="text-sm">
                  In stock: {status.inStock} sets
                  {status.leadTime && ` (Lead time: ${status.leadTime})`}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Maintenance Calendar</h3>
            <Calendar
              mode="single"
              selected={maintenanceDate}
              className="rounded-md border"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
