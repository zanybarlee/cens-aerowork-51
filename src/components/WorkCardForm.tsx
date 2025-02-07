
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function WorkCardForm() {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-workspace-text">
          Work Card Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="flightHours">Flight Hours</Label>
          <Input
            id="flightHours"
            type="number"
            placeholder="Enter total flight hours"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cycles">Cycles</Label>
          <Input id="cycles" type="number" placeholder="Enter total cycles" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="environment">Operating Environment</Label>
          <Input
            id="environment"
            placeholder="e.g., Coastal, Desert, Arctic"
          />
        </div>
        <Button className="w-full bg-workspace-primary hover:bg-workspace-primary/90 text-white">
          Generate Work Card
        </Button>
      </CardContent>
    </Card>
  );
}
