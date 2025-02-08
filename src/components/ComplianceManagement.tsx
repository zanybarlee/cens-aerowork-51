
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { ComplianceDirective } from "@/types/weststar";
import { ComplianceAlert } from "./compliance/ComplianceAlert";
import { ComplianceTable } from "./compliance/ComplianceTable";
import { DirectiveInput } from "./compliance/DirectiveInput";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewDirectiveAlert(true);
      toast({
        title: "New Directive Detected",
        description: "CAAM/AD/TRG-2025-01 requires immediate attention for AW139 (9M-WST)",
        variant: "destructive",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  const complianceDirectives: ComplianceDirective[] = [
    {
      id: "CAAM-2025-01",
      type: "AD",
      reference: "CAAM/AD/TRG-2025-01",
      title: "Tail Rotor Gearbox Inspection",
      description: "Mandatory inspection of tail rotor gearbox for AW139 helicopters with flight hours between 3,500-3,600. Inspection must be performed within 100 flight hours from current status.\n\n**OEM Requirements:**\n- Visual inspection for corrosion\n- Torque checks on all mounting bolts\n- Magnetic particle inspection of critical areas\n- Lubrication system integrity check",
      effectiveDate: "2025-04-15",
      status: "open",
      priority: "high",
      deadline: "2025-05-15"
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

  const filterDirectives = (directives: ComplianceDirective[]) => {
    if (!aircraft) return directives;

    return directives.filter(directive => {
      const isRelevantToModel = directive.description.toLowerCase().includes(aircraft.model.toLowerCase());
      const flightHourMatch = directive.reference === "CAAM/AD/TRG-2025-01" 
        ? aircraft.flightHours >= 3500 && aircraft.flightHours <= 3600
        : true;

      return isRelevantToModel && flightHourMatch;
    });
  };

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

  const filteredDirectives = filterDirectives(complianceDirectives);

  return (
    <>
      <Card className="w-full shadow-lg animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-900 flex justify-between items-center">
            <span>Compliance Monitoring - {aircraft?.tailNumber}</span>
            <DirectiveInput
              value={directive}
              onChange={setDirective}
              onSubmit={handleNewComplianceDirective}
              isLoading={isLoading}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ComplianceAlert show={showNewDirectiveAlert} />
          <ComplianceTable
            directives={filteredDirectives}
            onViewDetails={(description) => {
              setAiResponse(description);
              setIsModalOpen(true);
            }}
          />
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
