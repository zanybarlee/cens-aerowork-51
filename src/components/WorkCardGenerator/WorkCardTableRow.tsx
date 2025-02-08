
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
  onViewDetails: (card: StoredWorkCard) => void;
}

export function WorkCardTableRow({
  card,
  userRole,
  onRowClick,
  onDelete,
  onViewDetails,
}: WorkCardTableRowProps) {
  return (
    <TableRow
      className={userRole === 'maintenance-planner' ? 'cursor-pointer hover:bg-gray-50' : ''}
      onClick={() => onRowClick(card)}
    >
      <TableCell>{card.date}</TableCell>
      <TableCell>
        <Badge variant="outline">{card.environment}</Badge>
      </TableCell>
      <TableCell>{card.flightHours}</TableCell>
      <TableCell>{card.cycles}</TableCell>
      <TableCell>
        <Badge variant={card.status === 'scheduled' ? 'default' : 'secondary'}>
          {card.status === 'scheduled' ? `Scheduled: ${new Date(card.scheduledDate!).toLocaleDateString()}` : 'draft'}
        </Badge>
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(card);
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
