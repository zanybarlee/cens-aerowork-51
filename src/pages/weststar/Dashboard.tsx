
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplianceManagement } from "@/components/ComplianceManagement";
import { WorkCardForm } from "@/components/WorkCardForm";
import { MainDashboard } from "@/components/MainDashboard";

export default function WeststarDashboard() {
  const [selectedRole, setSelectedRole] = useState<string>("planner");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-workspace-text">
        Weststar Aviation Services - AW139 Maintenance
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Aircraft Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tail Number: 9M-WST</p>
              <p className="text-sm text-muted-foreground">Model: AW139</p>
              <p className="text-sm text-muted-foreground">Flight Hours: 3,500</p>
              <p className="text-sm text-muted-foreground">Cycles: 1,200</p>
              <p className="text-sm text-muted-foreground">Environment: Offshore</p>
            </div>
          </CardContent>
        </Card>

        <MainDashboard />
      </div>

      <div className="space-y-6">
        <ComplianceManagement userRole={selectedRole} />
        <WorkCardForm userRole={selectedRole} />
      </div>
    </div>
  );
}
