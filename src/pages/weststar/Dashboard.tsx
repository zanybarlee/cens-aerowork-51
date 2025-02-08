
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplianceManagement } from "@/components/ComplianceManagement";
import { WorkCardForm } from "@/components/WorkCardForm";
import { MainDashboard } from "@/components/MainDashboard";
import { Aircraft } from "@/types/weststar";

export default function WeststarDashboard() {
  const [selectedRole, setSelectedRole] = useState<string>("planner");
  
  const aircraft: Aircraft = {
    tailNumber: "9M-WST",
    model: "AW139",
    flightHours: 3500,
    cycles: 1200,
    environment: "offshore"
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">
        Weststar Aviation Services - AW139 Maintenance
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Aircraft Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tail Number: {aircraft.tailNumber}</p>
              <p className="text-sm text-muted-foreground">Model: {aircraft.model}</p>
              <p className="text-sm text-muted-foreground">Flight Hours: {aircraft.flightHours}</p>
              <p className="text-sm text-muted-foreground">Cycles: {aircraft.cycles}</p>
              <p className="text-sm text-muted-foreground">Environment: {aircraft.environment}</p>
            </div>
          </CardContent>
        </Card>

        <MainDashboard />
      </div>

      <div className="space-y-6">
        <ComplianceManagement userRole={selectedRole} aircraft={aircraft} />
        <WorkCardForm userRole={selectedRole} />
      </div>
    </div>
  );
}
