
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: 'open' | 'closed' | 'not-applicable';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "closed":
      return (
        <Badge className="bg-green-500">
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Closed
        </Badge>
      );
    case "open":
      return (
        <Badge className="bg-yellow-500">
          <Clock className="w-4 h-4 mr-1" />
          Open
        </Badge>
      );
    case "not-applicable":
      return (
        <Badge variant="outline">
          Not Applicable
        </Badge>
      );
    default:
      return null;
  }
}
