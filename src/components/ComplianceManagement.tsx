
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { ComplianceDirective } from "@/types/weststar";
import { ComplianceAlert } from "./compliance/ComplianceAlert";
import { ComplianceTable } from "./compliance/ComplianceTable";
import { NewDirectiveForm } from "./compliance/NewDirectiveForm";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

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

const INITIAL_DIRECTIVES: ComplianceDirective[] = [
  {
    id: "CAAM-2025-01",
    type: "AD",
    reference: "CAAM/AD/TRG-2025-01",
    issuingBody: "CAAM",
    applicableModels: ["AW139"],
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
    issuingBody: "Leonardo",
    applicableModels: ["AW139", "AW169"],
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
    issuingBody: "CAAM",
    applicableModels: ["AW139"],
    title: "Tail Rotor Drive Shaft Inspection",
    description: "Inspection of tail rotor drive shaft for wear patterns",
    effectiveDate: "2024-03-01",
    status: "open",
    priority: "high",
    deadline: "2024-04-30"
  }
];

export function ComplianceManagement({ userRole, aircraft }: ComplianceManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewDirectiveModalOpen, setIsNewDirectiveModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [showNewDirectiveAlert, setShowNewDirectiveAlert] = useState(false);
  const [directives, setDirectives] = useState<ComplianceDirective[]>(() => {
    const savedDirectives = localStorage.getItem('complianceDirectives');
    return savedDirectives ? JSON.parse(savedDirectives) : INITIAL_DIRECTIVES;
  });
  const { toast } = useToast();

  // Save directives to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('complianceDirectives', JSON.stringify(directives));
  }, [directives]);

  useEffect(() => {
    const handleComplianceUpdate = (event: CustomEvent) => {
      const { reference, status, completionDetails } = event.detail;
      setDirectives(prev => {
        const newDirectives = prev.map(directive => {
          if (directive.reference === reference) {
            return {
              ...directive,
              status,
              completionDetails
            };
          }
          return directive;
        });
        // Save to localStorage after update
        localStorage.setItem('complianceDirectives', JSON.stringify(newDirectives));
        return newDirectives;
      });
    };

    window.addEventListener('updateComplianceStatus', handleComplianceUpdate as EventListener);
    return () => {
      window.removeEventListener('updateComplianceStatus', handleComplianceUpdate as EventListener);
    };
  }, []);

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

  const handleGenerateWorkCard = (directive: ComplianceDirective) => {
    const event = new CustomEvent('generateWorkCard', { 
      detail: { 
        flightHours: aircraft?.flightHours.toString() || '',
        cycles: aircraft?.cycles.toString() || '',
        environment: aircraft?.environment || '',
        directive: directive
      } 
    });
    window.dispatchEvent(event);
    
    toast({
      title: "Work Card Generation",
      description: "Work card form has been pre-filled with directive details.",
    });
    
    setIsModalOpen(false);

    const workCardSection = document.getElementById('work-card-section');
    if (workCardSection) {
      workCardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddDirective = async (formData: {
    reference: string;
    type: 'AD' | 'SB';
    issuingBody: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    deadline: string;
  }) => {
    setIsLoading(true);
    try {
      // Simulating AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newDirective: ComplianceDirective = {
        id: `DIR-${Math.random().toString(36).substr(2, 9)}`,
        type: formData.type,
        reference: formData.reference,
        issuingBody: formData.issuingBody,
        applicableModels: [aircraft?.model || "AW139"],
        title: formData.title,
        description: formData.description,
        effectiveDate: new Date().toISOString().split('T')[0],
        status: "open",
        priority: formData.priority,
        deadline: formData.deadline,
      };

      setDirectives(prev => {
        const newDirectives = [newDirective, ...prev];
        localStorage.setItem('complianceDirectives', JSON.stringify(newDirectives));
        return newDirectives;
      });
      
      setIsNewDirectiveModalOpen(false);
      toast({
        title: "Success",
        description: "New directive has been added and saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add directive",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full shadow-lg animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-900 flex justify-between items-center">
            <span>Compliance Monitoring - {aircraft?.tailNumber}</span>
            <Button
              onClick={() => setIsNewDirectiveModalOpen(true)}
              className="bg-blue-900 hover:bg-blue-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Directive
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ComplianceAlert show={showNewDirectiveAlert} />
          <ComplianceTable
            directives={directives}
            onViewDetails={(description) => {
              setAiResponse(description);
              setIsModalOpen(true);
            }}
            onGenerateWorkCard={handleGenerateWorkCard}
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

      <Dialog open={isNewDirectiveModalOpen} onOpenChange={setIsNewDirectiveModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Directive</DialogTitle>
          </DialogHeader>
          <NewDirectiveForm onSubmit={handleAddDirective} isLoading={isLoading} />
        </DialogContent>
      </Dialog>
    </>
  );
}

