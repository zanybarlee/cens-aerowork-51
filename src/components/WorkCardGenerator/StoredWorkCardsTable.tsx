
import React from "react";
import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StoredWorkCard } from "@/types/workCard";

interface StoredWorkCardsTableProps {
  workCards: StoredWorkCard[];
  onDelete: (id: string) => void;
  onViewDetails: (content: string) => void;
}

export function StoredWorkCardsTable({ workCards, onDelete, onViewDetails }: StoredWorkCardsTableProps) {
  if (workCards.length === 0) return null;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Flight Hours</TableHead>
            <TableHead>Cycles</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workCards.map((card) => (
            <TableRow key={card.id}>
              <TableCell>{card.date}</TableCell>
              <TableCell>
                <Badge variant="outline">{card.environment}</Badge>
              </TableCell>
              <TableCell>{card.flightHours}</TableCell>
              <TableCell>{card.cycles}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(card.content)}
                >
                  <Info className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(card.id)}
                  className="text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
