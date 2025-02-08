
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Aircraft } from "@/types/weststar";

interface AircraftStatusCardProps {
  aircraft: Aircraft;
  onClick: () => void;
}

export function AircraftStatusCard({ aircraft, onClick }: AircraftStatusCardProps) {
  return (
    <Card 
      className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Aircraft Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tail Number:</span>
            <span className="font-medium">{aircraft.tailNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Model:</span>
            <span className="font-medium">{aircraft.model}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Flight Hours:</span>
            <span className="font-medium">{aircraft.flightHours}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Cycles:</span>
            <span className="font-medium">{aircraft.cycles}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Environment:</span>
            <span className="font-medium capitalize">{aircraft.environment}</span>
          </div>
          {aircraft.lastInspectionDate && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Inspection:</span>
              <span className="font-medium">
                {new Date(aircraft.lastInspectionDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
