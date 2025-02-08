
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ComplianceAlertProps {
  show: boolean;
}

export function ComplianceAlert({ show }: ComplianceAlertProps) {
  if (!show) return null;

  return (
    <Alert className="bg-red-50 border-red-200">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <AlertTitle className="text-red-800">Urgent Inspection Required</AlertTitle>
      <AlertDescription className="text-red-700">
        <p>New AD CAAM/AD/TRG-2025-01 requires immediate attention:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Tail Rotor Gearbox Inspection required</li>
          <li>Current flight hours: 3,500</li>
          <li>Inspection due within: 100 flight hours</li>
          <li>Aircraft affected: AW139 (9M-WST)</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
