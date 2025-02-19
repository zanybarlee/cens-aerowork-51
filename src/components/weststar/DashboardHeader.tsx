
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";
import { roles } from "@/components/RoleSelector";

interface DashboardHeaderProps {
  selectedRole: string;
  showRoleSelector: boolean;
  onLogout: () => void;
}

export function DashboardHeader({ selectedRole, showRoleSelector, onLogout }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-blue-900">
          Asia Aviation Services - AW139 Maintenance
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
        onClick={onLogout}
        variant="outline"
        className="flex items-center gap-2 text-blue-900 hover:text-blue-700 hover:bg-blue-50"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </div>
  );
}
