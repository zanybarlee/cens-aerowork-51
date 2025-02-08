
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ComplianceAlert } from "./compliance/ComplianceAlert";
import { ComplianceTable } from "./compliance/ComplianceTable";
import { NewDirectiveForm } from "./compliance/NewDirectiveForm";
import { DirectiveDetailsModal } from "./compliance/DirectiveDetailsModal";
import { useDirectives } from "@/hooks/useDirectives";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
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
  const [isNewDirectiveModalOpen, setIsNewDirectiveModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [showNewDirectiveAlert, setShowNewDirectiveAlert] = useState(false);
  const { directives, addDirective } = useDirectives();
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      await addDirective(formData);
      setIsNewDirectiveModalOpen(false);
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

      <DirectiveDetailsModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        description={aiResponse}
      />

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

