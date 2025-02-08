
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Package, Timer } from "lucide-react";

export function MainDashboard() {
  const stats = [
    {
      label: "Pending Tasks",
      value: "12",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      label: "Parts Required",
      value: "28",
      icon: Package,
      color: "text-purple-600"
    },
    {
      label: "Est. Labor Hours",
      value: "45",
      icon: Timer,
      color: "text-green-600"
    }
  ];

  return (
    <div className="space-y-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-white shadow-sm hover:shadow-md transition-shadow">
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
  );
}
