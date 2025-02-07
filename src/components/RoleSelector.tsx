
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, Wrench, ClipboardCheck, Plane } from "lucide-react";

export type UserRole = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  module: "workcard" | "compliance" | "both";
};

const roles: UserRole[] = [
  {
    id: "maintenance-planner",
    title: "Maintenance Planner",
    icon: <Plane className="h-6 w-6" />,
    description: "Schedule and allocate resources",
    module: "both",
  },
  {
    id: "engineer-technician",
    title: "Engineer & Technician",
    icon: <Wrench className="h-6 w-6" />,
    description: "Execute maintenance tasks",
    module: "both",
  },
  {
    id: "quality-inspector",
    title: "Quality Assurance & Inspector",
    icon: <ClipboardCheck className="h-6 w-6" />,
    description: "Validate compliance and tasks",
    module: "both",
  },
  {
    id: "compliance-manager",
    title: "Compliance Manager",
    icon: <Shield className="h-6 w-6" />,
    description: "Oversee airworthiness directives",
    module: "compliance",
  },
  {
    id: "fleet-manager",
    title: "Fleet Manager",
    icon: <Plane className="h-6 w-6" />,
    description: "Monitor fleet readiness",
    module: "workcard",
  },
];

interface RoleSelectorProps {
  open: boolean;
  onClose: () => void;
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelector({ open, onClose, onRoleSelect }: RoleSelectorProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader className="bg-white rounded-t-lg">
          <DialogTitle className="text-2xl font-bold text-workspace-primary">
            Select Your Role
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap justify-center gap-4 p-4 bg-white rounded-b-lg">
          {roles.map((role) => (
            <Button
              key={role.id}
              variant="outline"
              className={cn(
                "w-[220px] h-auto p-4 flex flex-col items-center text-center hover:bg-workspace-primary/5",
                "border-2 hover:border-workspace-primary transition-all duration-200 bg-white"
              )}
              onClick={() => onRoleSelect(role)}
            >
              <div className="text-workspace-primary mb-2">{role.icon}</div>
              <h3 className="font-semibold mb-1">{role.title}</h3>
              <p className="text-sm text-muted-foreground w-full px-2 break-words">{role.description}</p>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
