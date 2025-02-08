
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Clock } from "lucide-react";

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
          <li>Must be performed at or before 3,600 flight hours</li>
          <li>Current status: Within inspection window (3,500-3,600 hours)</li>
          <li>Due by: 10 days (2025-05-15)</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
