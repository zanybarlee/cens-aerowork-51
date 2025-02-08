
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StoredWorkCard } from "@/types/workCard";
import { WorkCardTableRow } from "./WorkCardTableRow";
import { ScheduleDialog } from "./ScheduleDialog";

interface StoredWorkCardsTableProps {
  workCards: StoredWorkCard[];
  onDelete: (id: string) => void;
  onViewDetails: (content: string) => void;
  onSchedule: (
    cardId: string,
    scheduledDate: string,
    scheduledLocation: string,
    assignedTechnician: string,
    requiredParts: { partNumber: string; quantity: number }[]
  ) => void;
  userRole: string;
}

export function StoredWorkCardsTable({
  workCards,
  onDelete,
  onViewDetails,
  onSchedule,
  userRole,
}: StoredWorkCardsTableProps) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [schedulingData, setSchedulingData] = useState({
    scheduledDate: '',
    scheduledLocation: '',
    assignedTechnician: '',
    partNumber: '',
    quantity: ''
  });

  const handleRowClick = (card: StoredWorkCard) => {
    if (userRole === 'maintenance-planner') {
      setSelectedCardId(card.id);
      if (card.status === 'scheduled') {
        setSchedulingData({
          scheduledDate: card.scheduledDate || '',
          scheduledLocation: card.scheduledLocation || '',
          assignedTechnician: card.assignedTechnician || '',
          partNumber: card.requiredParts?.[0]?.partNumber || '',
          quantity: card.requiredParts?.[0]?.quantity?.toString() || ''
        });
      }
      setIsDialogOpen(true);
    }
  };

  const handleScheduleSubmit = () => {
    if (selectedCardId) {
      onSchedule(
        selectedCardId,
        schedulingData.scheduledDate,
        schedulingData.scheduledLocation,
        schedulingData.assignedTechnician,
        [{ partNumber: schedulingData.partNumber, quantity: Number(schedulingData.quantity) }]
      );
      setIsDialogOpen(false);
      setSelectedCardId(null);
      setSchedulingData({
        scheduledDate: '',
        scheduledLocation: '',
        assignedTechnician: '',
        partNumber: '',
        quantity: ''
      });
    }
  };

  if (workCards.length === 0) return null;

  const selectedCard = workCards.find(card => card.id === selectedCardId);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Work Card ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Flight Hours</TableHead>
            <TableHead>Cycles</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workCards.map((card) => (
            <WorkCardTableRow
              key={card.id}
              card={card}
              userRole={userRole}
              onRowClick={handleRowClick}
              onDelete={onDelete}
              onViewDetails={onViewDetails}
            />
          ))}
        </TableBody>
      </Table>

      <ScheduleDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedCard={selectedCard}
        onSchedule={onSchedule}
        schedulingData={schedulingData}
        setSchedulingData={setSchedulingData}
      />
    </div>
  );
}
