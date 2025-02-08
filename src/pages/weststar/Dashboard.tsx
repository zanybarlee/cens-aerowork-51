
import React, { useState } from "react";
import { ComplianceManagement } from "@/components/ComplianceManagement";
import { WorkCardForm } from "@/components/WorkCardForm";
import { MainDashboard } from "@/components/MainDashboard";
import { MaintenanceScheduler } from "@/components/MaintenanceScheduler";
import { Aircraft } from "@/types/weststar";
import { useNavigate } from "react-router-dom";
import { RoleSelector, UserRole } from "@/components/RoleSelector";
import { useToast } from "@/components/ui/use-toast";
import { AircraftStatusCard } from "@/components/weststar/AircraftStatusCard";
import { AircraftDetailsDialog } from "@/components/weststar/AircraftDetailsDialog";
import { DashboardHeader } from "@/components/weststar/DashboardHeader";

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
        <DashboardHeader 
          selectedRole={selectedRole} 
          showRoleSelector={showRoleSelector}
          onLogout={handleLogout}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            <AircraftStatusCard 
              aircraft={aircraft}
              onClick={() => setShowAircraftDetails(true)}
            />

            <MainDashboard />

            <AircraftDetailsDialog
              open={showAircraftDetails}
              onOpenChange={setShowAircraftDetails}
              aircraft={aircraft}
            />
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
