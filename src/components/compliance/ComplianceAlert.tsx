
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BellRing } from "lucide-react";

interface ComplianceAlertProps {
  show: boolean;
}

export function ComplianceAlert({ show }: ComplianceAlertProps) {
  if (!show) return null;

  return (
    <Alert className="bg-blue-50 border-blue-200">
      <BellRing className="h-4 w-4" />
      <AlertTitle>New Directive Alert</AlertTitle>
      <AlertDescription>
        A new directive has been added that matches AW139 (9M-WST) status.
        Please review and take necessary action.
      </AlertDescription>
    </Alert>
  );
}
