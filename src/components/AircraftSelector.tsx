
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const aircraftModels = [
  { id: "bell429", name: "Bell 429" },
  { id: "bell407", name: "Bell 407" },
];

export function AircraftSelector({
  onSelect,
}: {
  onSelect: (model: string) => void;
}) {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-workspace-text">
          Select Aircraft Model
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={onSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose aircraft model" />
          </SelectTrigger>
          <SelectContent>
            {aircraftModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
