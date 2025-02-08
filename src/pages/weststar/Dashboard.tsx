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
import { LogOut, UserCircle } from "lucide-react";
import { RoleSelector, UserRole, roles } from "@/components/RoleSelector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

export default function WeststarDashboard() {
  const [selectedRole, setSelectedRole] = useState<string>("planner");
  const [showRoleSelector, setShowRoleSelector] = useState(true);
  const [showAircraftDetails, setShowAircraftDetails] = useState(false);
  const { toast } = useToast();
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
    toast({
      title: "Role Selected",
      description: `You are now working as ${role.title}`,
    });
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
            <WorkCardForm userRole={selectedRole} aircraft={aircraft} />
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
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-blue-900">
              Weststar Aviation Services - AW139 Maintenance
            </h1>
            {!showRoleSelector && (
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-md">
                <UserCircle className="h-5 w-5 text-blue-900" />
                <span className="text-blue-900 font-medium">
                  {roles.find(r => r.id === selectedRole)?.title || "User"}
                </span>
              </div>
            )}
          </div>
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
            <Card 
              className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setShowAircraftDetails(true)}
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

            <MainDashboard />

            <Dialog open={showAircraftDetails} onOpenChange={setShowAircraftDetails}>
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
