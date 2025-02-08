
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Calendar as CalendarIcon } from "lucide-react";
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
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          Maintenance Schedule - {aircraft.tailNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-700">Next Scheduled Maintenance</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm">Date: {maintenanceDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Location: Subang HQ – Bay 2</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Technician: Tech ID: 007, AW139 Certified</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-700">Inventory Status</h3>
              {Object.entries(inventoryStatus).map(([part, status]) => (
                <div key={part} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-white">
                      {part}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      In stock: {status.inStock} sets
                      {status.leadTime && ` (Lead time: ${status.leadTime})`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-gray-700">Maintenance Calendar</h3>
            <Calendar
              mode="single"
              selected={maintenanceDate}
              className="rounded-md border bg-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
