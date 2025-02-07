
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MainDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-workspace-text">
            Pending Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-workspace-primary">12</div>
        </CardContent>
      </Card>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-workspace-text">
            Parts Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-workspace-accent">28</div>
        </CardContent>
      </Card>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-workspace-text">
            Est. Labor Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-workspace-success">45</div>
        </CardContent>
      </Card>
    </div>
  );
}
