
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComplianceManagement } from "@/components/ComplianceManagement";
import { WorkCardForm } from "@/components/WorkCardForm";
import { MainDashboard } from "@/components/MainDashboard";
import { MaintenanceScheduler } from "@/components/MaintenanceScheduler";
import { Aircraft } from "@/types/weststar";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { RoleSelector, UserRole } from "@/components/RoleSelector";

export default function WeststarDashboard() {
  const [selectedRole, setSelectedRole] = useState<string>("planner");
  const [showRoleSelector, setShowRoleSelector] = useState(true);
  const navigate = useNavigate();
  
  const aircraft: Aircraft = {
    tailNumber: "9M-WST",
    model: "AW139",
    flightHours: 3500,
    cycles: 1200,
    environment: "offshore",
    lastInspectionDate: "2025-01-12"
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role.id);
    setShowRoleSelector(false);
  };

  const renderRoleSpecificContent = () => {
    switch (selectedRole) {
      case "compliance-manager":
        return (
          <div className="space-y-6">
            <ComplianceManagement userRole={selectedRole} aircraft={aircraft} />
          </div>
        );
      case "maintenance-planner":
        return (
          <div className="space-y-6">
            <MaintenanceScheduler aircraft={aircraft} />
            <ComplianceManagement userRole={selectedRole} aircraft={aircraft} />
          </div>
        );
      case "engineer-technician":
        return (
          <div className="space-y-6">
            <WorkCardForm userRole={selectedRole} aircraft={aircraft} />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <MaintenanceScheduler aircraft={aircraft} />
            <ComplianceManagement userRole={selectedRole} aircraft={aircraft} />
            <WorkCardForm userRole={selectedRole} aircraft={aircraft} />
          </div>
        );
    }
  };

  return (
    <>
      <RoleSelector 
        open={showRoleSelector} 
        onClose={() => setShowRoleSelector(false)}
        onRoleSelect={handleRoleSelect}
      />
      
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-900">
            Weststar Aviation Services - AW139 Maintenance
          </h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 text-blue-900 hover:text-blue-700 hover:bg-blue-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
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
            {renderRoleSpecificContent()}
          </div>
        </div>
      </div>
    </>
  );
}

