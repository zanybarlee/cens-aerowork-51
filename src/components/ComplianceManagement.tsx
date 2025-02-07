
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

export function ComplianceManagement() {
  const complianceTasks = [
    {
      id: 1,
      directive: "AD 2024-03",
      description: "Main Rotor Blade Inspection",
      deadline: "2024-04-15",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      directive: "SB 407-23-12",
      description: "Tail Rotor Drive Shaft Check",
      deadline: "2024-05-01",
      status: "completed",
      priority: "medium",
    },
    {
      id: 3,
      directive: "AD 2024-02",
      description: "Transmission Mount Inspection",
      deadline: "2024-04-30",
      status: "in-progress",
      priority: "high",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-workspace-success">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-workspace-warning">
            <Clock className="w-4 h-4 mr-1" />
            In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-workspace-error">
            <AlertCircle className="w-4 h-4 mr-1" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-workspace-text flex justify-between items-center">
          <span>Compliance Management</span>
          <Button className="bg-workspace-primary hover:bg-workspace-primary/90">
            New Compliance Task
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Directive</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.directive}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-workspace-primary hover:text-workspace-primary/90"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
