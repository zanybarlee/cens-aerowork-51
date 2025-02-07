import React, { useState, useEffect } from "react";
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
import { AlertCircle, CheckCircle2, Clock, Eye, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface ComplianceResponse {
  id: string;
  directive: string;
  response: string;
  timestamp: string;
  deadline?: string;
  priority?: 'high' | 'medium' | 'low';
  status?: 'pending' | 'in-progress' | 'completed';
}

interface ComplianceManagementProps {
  userRole: string;
}

export function ComplianceManagement({ userRole }: ComplianceManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [directive, setDirective] = useState("");
  const [responses, setResponses] = useState<ComplianceResponse[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<ComplianceResponse | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load stored responses from localStorage based on userRole
    const storedResponses = localStorage.getItem(`complianceResponses_${userRole}`);
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, [userRole]);

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
    {
      id: 4,
      directive: "SB 407-24-01",
      description: "Engine Control Unit Update",
      deadline: "2024-06-15",
      status: "pending",
      priority: "medium",
    },
    {
      id: 5,
      directive: "AD 2024-04",
      description: "Fuel System Inspection",
      deadline: "2024-05-30",
      status: "pending",
      priority: "high",
    }
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
      
      // Generate a random deadline between 15 and 45 days from now
      const randomDays = Math.floor(Math.random() * (45 - 15 + 1)) + 15;
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + randomDays);
      
      const newResponse: ComplianceResponse = {
        id: Date.now().toString(),
        directive: directive,
        response: response,
        timestamp: new Date().toLocaleString(),
        deadline: deadline.toISOString().split('T')[0],
        priority: Math.random() < 0.4 ? 'high' : Math.random() < 0.7 ? 'medium' : 'low',
        status: 'pending'
      };

      const updatedResponses = [...responses, newResponse];
      setResponses(updatedResponses);
      localStorage.setItem(`complianceResponses_${userRole}`, JSON.stringify(updatedResponses));

      setAiResponse(response);
      setIsModalOpen(true);
      setDirective("");
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

  const handleViewResponse = (response: ComplianceResponse) => {
    setSelectedResponse(response);
    setAiResponse(response.response);
    setIsModalOpen(true);
  };

  const handleDeleteResponse = (id: string) => {
    const updatedResponses = responses.filter(response => response.id !== id);
    setResponses(updatedResponses);
    localStorage.setItem(`complianceResponses_${userRole}`, JSON.stringify(updatedResponses));
    
    toast({
      title: "Success",
      description: "Response deleted successfully",
    });
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
        <CardContent className="space-y-6">
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

          {responses.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Directive</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {responses.map((response) => (
                    <TableRow key={response.id}>
                      <TableCell className="font-medium max-w-[200px]">
                        <span className="block truncate" title={response.directive}>
                          {response.directive}
                        </span>
                      </TableCell>
                      <TableCell>{response.deadline}</TableCell>
                      <TableCell>{getPriorityBadge(response.priority || 'medium')}</TableCell>
                      <TableCell>{getStatusBadge(response.status || 'pending')}</TableCell>
                      <TableCell>{response.timestamp}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewResponse(response)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteResponse(response.id)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Compliance Analysis
              {selectedResponse && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({selectedResponse.timestamp})
                </span>
              )}
            </DialogTitle>
            {selectedResponse && (
              <DialogDescription>
                Directive: {selectedResponse.directive}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="prose prose-sm max-w-none dark:prose-invert bg-muted p-4 rounded-lg">
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
