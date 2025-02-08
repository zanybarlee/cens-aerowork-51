
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Info, Trash2, Calendar } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StoredWorkCardsTableProps {
  workCards: StoredWorkCard[];
  onDelete: (id: string) => void;
  onViewDetails: (content: string) => void;
  onSchedule: (cardId: string, scheduledDate: string, scheduledLocation: string, assignedTechnician: string, requiredParts: { partNumber: string; quantity: number }[]) => void;
  userRole: string;
}

export function StoredWorkCardsTable({ workCards, onDelete, onViewDetails, onSchedule, userRole }: StoredWorkCardsTableProps) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [schedulingData, setSchedulingData] = useState({
    scheduledDate: '',
    scheduledLocation: '',
    assignedTechnician: '',
    partNumber: '',
    quantity: ''
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Effect to refresh the table data
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 1000); // Refresh every second

    return () => clearInterval(refreshInterval);
  }, []);

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
      // Trigger an immediate refresh
      setRefreshTrigger(prev => prev + 1);
    }
  };

  const handleRowClick = (card: StoredWorkCard) => {
    if (userRole === 'maintenance-planner') {
      setSelectedCardId(card.id);
      // Pre-fill existing scheduling data if available
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
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workCards.map((card) => (
            <TableRow 
              key={card.id}
              className={userRole === 'maintenance-planner' ? 'cursor-pointer hover:bg-gray-50' : ''}
              onClick={() => handleRowClick(card)}
            >
              <TableCell>{card.date}</TableCell>
              <TableCell>
                <Badge variant="outline">{card.environment}</Badge>
              </TableCell>
              <TableCell>{card.flightHours}</TableCell>
              <TableCell>{card.cycles}</TableCell>
              <TableCell>
                <Badge variant={card.status === 'scheduled' ? 'default' : 'secondary'}>
                  {card.status || 'draft'}
                </Badge>
              </TableCell>
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
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {schedulingData.scheduledDate ? 'Update Schedule' : 'Schedule Maintenance'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Date</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={schedulingData.scheduledDate}
                onChange={(e) => setSchedulingData(prev => ({ ...prev, scheduledDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduledLocation">Location</Label>
              <Input
                id="scheduledLocation"
                value={schedulingData.scheduledLocation}
                onChange={(e) => setSchedulingData(prev => ({ ...prev, scheduledLocation: e.target.value }))}
                placeholder="e.g., Subang HQ – Bay 2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedTechnician">Assigned Technician</Label>
              <Input
                id="assignedTechnician"
                value={schedulingData.assignedTechnician}
                onChange={(e) => setSchedulingData(prev => ({ ...prev, assignedTechnician: e.target.value }))}
                placeholder="e.g., Tech ID: 007"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partNumber">Required Part Number</Label>
              <Input
                id="partNumber"
                value={schedulingData.partNumber}
                onChange={(e) => setSchedulingData(prev => ({ ...prev, partNumber: e.target.value }))}
                placeholder="e.g., AW139-GSKT-TR"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={schedulingData.quantity}
                onChange={(e) => setSchedulingData(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="e.g., 2"
              />
            </div>
            <Button onClick={handleScheduleSubmit} className="w-full">
              {schedulingData.scheduledDate ? 'Update Schedule' : 'Schedule Maintenance'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
