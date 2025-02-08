
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplianceManagement } from "@/components/ComplianceManagement";
import { WorkCardForm } from "@/components/WorkCardForm";
import { MainDashboard } from "@/components/MainDashboard";
import { MaintenanceScheduler } from "@/components/MaintenanceScheduler";
import { Aircraft } from "@/types/weststar";
import { Calendar } from "@/components/ui/calendar";

export default function WeststarDashboard() {
  const [selectedRole, setSelectedRole] = useState<string>("planner");
  
  const aircraft: Aircraft = {
    tailNumber: "9M-WST",
    model: "AW139",
    flightHours: 3500,
    cycles: 1200,
    environment: "offshore",
    lastInspectionDate: "2025-01-12"
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-900">
          Weststar Aviation Services - AW139 Maintenance
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-white shadow-md">
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

          <MainDashboard />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-9">
          <MaintenanceScheduler aircraft={aircraft} />
          
          <div className="mt-6 space-y-6">
            <ComplianceManagement userRole={selectedRole} aircraft={aircraft} />
            <WorkCardForm userRole={selectedRole} aircraft={aircraft} />
          </div>
        </div>
      </div>
    </div>
  );
}
