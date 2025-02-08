
import React from "react";
import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { StoredWorkCard } from "@/types/workCard";

interface WorkCardTableRowProps {
  card: StoredWorkCard;
  userRole: string;
  onRowClick: (card: StoredWorkCard) => void;
  onDelete: (id: string) => void;
  onViewDetails: (content: string) => void;
}

export function WorkCardTableRow({
  card,
  userRole,
  onRowClick,
  onDelete,
  onViewDetails,
}: WorkCardTableRowProps) {
  const getStatusBadge = () => {
    switch (card.status) {
      case 'completed':
        return (
          <Badge variant="secondary" className="bg-green-500 text-white hover:bg-green-600">
            Completed on {card.completionDate}
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge variant="default">
            Scheduled: {new Date(card.scheduledDate!).toLocaleDateString()}
          </Badge>
        );
      default:
        return <Badge variant="secondary">Draft</Badge>;
    }
  };

  return (
    <TableRow
      className={userRole === 'maintenance-planner' ? 'cursor-pointer hover:bg-gray-50' : ''}
      onClick={() => onRowClick(card)}
    >
      <TableCell className="font-medium">{card.id}</TableCell>
      <TableCell>{card.date}</TableCell>
      <TableCell>
        <Badge variant="outline">{card.environment}</Badge>
      </TableCell>
      <TableCell>{card.flightHours}</TableCell>
      <TableCell>{card.cycles}</TableCell>
      <TableCell>{getStatusBadge()}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(card.content);
          }}
        >
          <Info className="h-4 w-4 mr-1" />
          View Details
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
          className="text-destructive hover:text-destructive/90"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
