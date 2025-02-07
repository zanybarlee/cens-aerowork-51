
import React from "react";
import { RoleSelector, UserRole } from "@/components/RoleSelector";
import { WorkCardForm } from "@/components/WorkCardForm";
import { ComplianceManagement } from "@/components/ComplianceManagement";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showRoleSelector, setShowRoleSelector] = React.useState(true);
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRoleSelector(false);
    toast({
      title: "Role selected",
      description: `You are now working as ${role.title}`,
    });
  };

  const handleBack = () => {
    if (selectedRole) {
      setSelectedRole(null);
      setShowRoleSelector(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-workspace-background to-workspace-secondary/10 p-8">
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="mb-4 flex items-center gap-2 text-workspace-primary hover:text-workspace-primary/90"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <RoleSelector
        open={showRoleSelector}
        onClose={() => setShowRoleSelector(false)}
        onRoleSelect={handleRoleSelect}
      />

      {selectedRole && (
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-workspace-primary mb-8">
            Welcome, {selectedRole.title}
          </h1>
          <div className="space-y-8">
            {(selectedRole.module === "workcard" || selectedRole.module === "both") && (
              <div>
                <h2 className="text-2xl font-bold text-workspace-primary mb-6">
                  Work Card Generator
                </h2>
                <WorkCardForm />
              </div>
            )}
            {(selectedRole.module === "compliance" || selectedRole.module === "both") && (
              <div>
                <h2 className="text-2xl font-bold text-workspace-primary mb-6">
                  Compliance Management
                </h2>
                <ComplianceManagement />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
