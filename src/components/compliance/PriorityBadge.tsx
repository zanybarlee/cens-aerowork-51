
import React from "react";
import { Badge } from "@/components/ui/badge";

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  switch (priority) {
    case "high":
      return <Badge className="bg-red-500">High</Badge>;
    case "medium":
      return <Badge className="bg-yellow-500">Medium</Badge>;
    case "low":
      return <Badge className="bg-green-500">Low</Badge>;
    default:
      return null;
  }
}
