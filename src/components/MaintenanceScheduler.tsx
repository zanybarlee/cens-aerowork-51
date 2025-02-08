
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Calendar as CalendarIcon } from "lucide-react";
import { Aircraft } from "@/types/weststar";
import { useWorkCards } from "@/hooks/useWorkCards";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MaintenanceSchedulerProps {
  aircraft: Aircraft;
}

export function MaintenanceScheduler({ aircraft }: MaintenanceSchedulerProps) {
  const { storedWorkCards } = useWorkCards('maintenance-planner');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);
  
  // Find all scheduled work cards
  const scheduledCards = storedWorkCards.filter(card => card.status === 'scheduled');
  
  // Get work cards for selected date
  const getWorkCardsForDate = (date: Date) => {
    return scheduledCards.filter(card => {
      const cardDate = new Date(card.scheduledDate);
      return cardDate.toDateString() === date.toDateString();
    });
  };

  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const cardsForDate = getWorkCardsForDate(date);
      if (cardsForDate.length > 0) {
        setShowDialog(true);
      }
    }
  };

  // Find the latest scheduled work card for default display
  const latestScheduledCard = scheduledCards
    .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())[0];

  const maintenanceDate = latestScheduledCard ? new Date(latestScheduledCard.scheduledDate) : new Date();
  
  // Get the parts from the latest scheduled card
  const inventoryStatus = latestScheduledCard?.requiredParts?.reduce((acc, part) => {
    acc[part.partNumber] = {
      inStock: part.quantity,
      leadTime: "2 weeks"
    };
    return acc;
  }, {} as Record<string, { inStock: number; leadTime: string }>) || {};

  // Create a list of dates that have scheduled maintenance
  const scheduledDates = scheduledCards.map(card => new Date(card.scheduledDate));

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          Maintenance Schedule - {aircraft.tailNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-700">Next Scheduled Maintenance</h3>
              {latestScheduledCard ? (
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm">Date: {maintenanceDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Location: {latestScheduledCard.scheduledLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Technician: {latestScheduledCard.assignedTechnician}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm text-gray-500">No maintenance currently scheduled</span>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-700">Required Parts</h3>
              {Object.entries(inventoryStatus).length > 0 ? (
                Object.entries(inventoryStatus).map(([part, status]) => (
                  <div key={part} className="bg-gray-50 p-4 rounded-lg mb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-white">
                        {part}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        Required: {status.inStock} sets
                        {status.leadTime && ` (Lead time: ${status.leadTime})`}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm text-gray-500">No parts requirements specified</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-gray-700">Maintenance Calendar</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              className="rounded-md border bg-white"
              modifiers={{
                scheduled: scheduledDates
              }}
              modifiersStyles={{
                scheduled: {
                  backgroundColor: '#dbeafe',
                  borderRadius: '4px'
                }
              }}
            />
          </div>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Scheduled Maintenance for {selectedDate?.toLocaleDateString()}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[50vh] mt-4 pr-4">
              <div className="space-y-4">
                {selectedDate && getWorkCardsForDate(selectedDate).map((card, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Location: {card.scheduledLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Technician: {card.assignedTechnician}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      <strong>Work Card Details:</strong>
                      <p className="mt-1 whitespace-pre-wrap">{card.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
