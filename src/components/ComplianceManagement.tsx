
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
import { AlertCircle, CheckCircle2, Clock, Eye, Trash2, BellRing } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ComplianceDirective } from "@/types/weststar";

interface ComplianceManagementProps {
  userRole: string;
  aircraft?: {
    tailNumber: string;
    model: string;
    flightHours: number;
    cycles: number;
    environment: string;
  };
}

export function ComplianceManagement({ userRole, aircraft }: ComplianceManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [directive, setDirective] = useState("");
  const [showNewDirectiveAlert, setShowNewDirectiveAlert] = useState(false);
  const { toast } = useToast();

  // Sample directives data - in a real app this would come from an API
  const complianceDirectives: ComplianceDirective[] = [
    {
      id: "CAAM-2024-01",
      type: "AD",
      reference: "CAAM/AD/TRG-2024-01",
      title: "Main Rotor Blade Inspection",
      description: "Mandatory inspection of main rotor blades for possible delamination",
      effectiveDate: "2024-03-15",
      status: "open",
      priority: "high",
      deadline: "2024-04-15"
    },
    {
      id: "SB-407-24-01",
      type: "SB",
      reference: "SB 407-24-01",
      title: "Engine Control Unit Update",
      description: "Software update for enhanced engine control system",
      effectiveDate: "2024-02-01",
      status: "closed",
      priority: "medium",
      deadline: "2024-06-15"
    },
    {
      id: "CAAM-2024-02",
      type: "AD",
      reference: "CAAM/AD/TRG-2024-02",
      title: "Tail Rotor Drive Shaft Inspection",
      description: "Inspection of tail rotor drive shaft for wear patterns",
      effectiveDate: "2024-03-01",
      status: "open",
      priority: "high",
      deadline: "2024-04-30"
    }
  ];

  // Filter directives based on aircraft data
  const filterDirectives = (directives: ComplianceDirective[]) => {
    if (!aircraft) return directives;

    return directives.filter(directive => {
      // Example filtering logic based on aircraft model and flight hours
      const isRelevantToModel = directive.description.toLowerCase().includes('aw139') || 
                               !directive.description.toLowerCase().includes('model');
      
      // Assuming some directives have flight hour thresholds in their description
      const flightHourMatch = directive.description.toLowerCase().includes('flight hours') ? 
        aircraft.flightHours >= 3000 : true;

      return isRelevantToModel && flightHourMatch;
    });
  };

  const filteredDirectives = filterDirectives(complianceDirectives);

  const handleNewComplianceDirective = async () => {
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
      const prompt = `Analyze compliance directive: ${directive} for AW139 helicopter`;
      const response = await query({ question: prompt });
      setAiResponse(response);
      setIsModalOpen(true);
      setDirective("");
      
      // Show new directive alert
      setShowNewDirectiveAlert(true);
      toast({
        title: "New Directive Added",
        description: "A new compliance directive has been added to the queue.",
      });
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "closed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Closed
          </Badge>
        );
      case "open":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="w-4 h-4 mr-1" />
            Open
          </Badge>
        );
      case "not-applicable":
        return (
          <Badge variant="outline">
            Not Applicable
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
      <Card className="w-full shadow-lg animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-900 flex justify-between items-center">
            <span>Compliance Monitoring</span>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <Label htmlFor="directive" className="sr-only">
                  Directive
                </Label>
                <Input
                  id="directive"
                  placeholder="Enter new directive to analyze..."
                  value={directive}
                  onChange={(e) => setDirective(e.target.value)}
                  className="min-w-[300px]"
                />
              </div>
              <Button
                className="bg-blue-900 hover:bg-blue-800"
                onClick={handleNewComplianceDirective}
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "Add New Directive"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {showNewDirectiveAlert && (
            <Alert className="bg-blue-50 border-blue-200">
              <BellRing className="h-4 w-4" />
              <AlertTitle>New Directive Alert</AlertTitle>
              <AlertDescription>
                A new directive has been added that matches AW139 (9M-WST) status.
                Please review and take necessary action.
              </AlertDescription>
            </Alert>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Effective Date</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDirectives.map((directive) => (
                  <TableRow key={directive.id}>
                    <TableCell className="font-medium">{directive.reference}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{directive.type}</Badge>
                    </TableCell>
                    <TableCell>{directive.title}</TableCell>
                    <TableCell>{directive.effectiveDate}</TableCell>
                    <TableCell>{directive.deadline}</TableCell>
                    <TableCell>{getPriorityBadge(directive.priority)}</TableCell>
                    <TableCell>{getStatusBadge(directive.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-900 hover:text-blue-800"
                        onClick={() => {
                          setAiResponse(directive.description);
                          setIsModalOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
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
            <DialogTitle>Directive Details</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none dark:prose-invert bg-gray-50 p-4 rounded-lg">
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
