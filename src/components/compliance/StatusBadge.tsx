
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: 'open' | 'closed' | 'not-applicable';
  onClick?: () => void;
}

export function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const badgeProps = onClick ? {
    onClick,
    className: "cursor-pointer hover:opacity-80 transition-opacity",
    role: "button",
    "aria-label": `Change status from ${status}`
  } : {};

  switch (status) {
    case "closed":
      return (
        <Badge className="bg-green-500" {...badgeProps}>
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Closed
        </Badge>
      );
    case "open":
      return (
        <Badge className="bg-yellow-500" {...badgeProps}>
          <Clock className="w-4 h-4 mr-1" />
          Open
        </Badge>
      );
    case "not-applicable":
      return (
        <Badge variant="outline" {...badgeProps}>
          Not Applicable
        </Badge>
      );
    default:
      return null;
  }
}
