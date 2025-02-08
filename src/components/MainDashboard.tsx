
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Package, Timer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sampleDirectives, sampleInventory, sampleWorkCards } from "@/data/sampleData";

export function MainDashboard() {
  const [selectedStat, setSelectedStat] = React.useState<string | null>(null);
  const [showDetails, setShowDetails] = React.useState(false);

  const stats = [
    {
      label: "Pending Tasks",
      value: "12",
      icon: Clock,
      color: "text-blue-600",
      details: sampleWorkCards.filter(card => card.status === "active").map(card => ({
        title: card.title,
        subtitle: `Aircraft: ${card.aircraft}`,
        info: `Priority: ${card.priority}`
      }))
    },
    {
      label: "Parts Required",
      value: "28",
      icon: Package,
      color: "text-purple-600",
      details: sampleInventory.map(part => ({
        title: part.partNumber,
        subtitle: part.description,
        info: `Stock: ${part.stockQuantity}`
      }))
    },
    {
      label: "Est. Labor Hours",
      value: "45",
      icon: Timer,
      color: "text-green-600",
      details: sampleWorkCards.map(card => ({
        title: card.title,
        subtitle: `Labor Hours: ${card.laborHours}`,
        info: `Aircraft: ${card.aircraft}`
      }))
    }
  ];

  const handleStatClick = (label: string) => {
    setSelectedStat(label);
    setShowDetails(true);
  };

  const selectedStatData = stats.find(stat => stat.label === selectedStat);

  return (
    <>
      <div className="space-y-4">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleStatClick(stat.label)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full bg-gray-50 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
                <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedStat}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 p-4">
              {selectedStatData?.details.map((detail, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{detail.title}</h3>
                  <p className="text-sm text-gray-600">{detail.subtitle}</p>
                  <p className="text-sm text-gray-500 mt-1">{detail.info}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
