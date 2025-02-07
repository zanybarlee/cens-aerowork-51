
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export function ComplianceManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [directive, setDirective] = useState("");
  const { toast } = useToast();

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

  const query = async (data: { question: string }) => {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/prediction/4131f902-cf99-4885-991d-4662f38113bb",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result.text;
  };

  const handleNewComplianceTask = async () => {
    if (!directive.trim()) {
      toast({
        title: "Error",
        description: "Please enter a directive to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `can you provide Text Analysis and Categorization of ${directive}`;
      const response = await query({ question: prompt });
      setAiResponse(response);
      setIsModalOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze directive. Please try again.",
        variant: "destructive",
      });
      console.error("Error analyzing directive:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <>
      <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-workspace-text flex justify-between items-center">
            <span>Compliance Management</span>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <Label htmlFor="directive" className="sr-only">
                  Directive
                </Label>
                <Input
                  id="directive"
                  placeholder="Enter directive to analyze..."
                  value={directive}
                  onChange={(e) => setDirective(e.target.value)}
                  className="min-w-[300px]"
                />
              </div>
              <Button
                className="bg-workspace-primary hover:bg-workspace-primary/90"
                onClick={handleNewComplianceTask}
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "New Compliance Task"}
              </Button>
            </div>
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Compliance Analysis</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none dark:prose-invert bg-muted p-4 rounded-lg">
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
