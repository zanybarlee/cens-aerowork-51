
import { useState, useEffect } from "react";
import { ComplianceDirective } from "@/types/weststar";
import { useToast } from "@/hooks/use-toast";

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

export const useDirectives = () => {
  const [directives, setDirectives] = useState<ComplianceDirective[]>(() => {
    const savedDirectives = localStorage.getItem('complianceDirectives');
    return savedDirectives ? JSON.parse(savedDirectives) : INITIAL_DIRECTIVES;
  });
  const { toast } = useToast();

  // Save to localStorage whenever directives change
  useEffect(() => {
    localStorage.setItem('complianceDirectives', JSON.stringify(directives));
  }, [directives]);

  const addDirective = async (formData: {
    reference: string;
    type: 'AD' | 'SB';
    issuingBody: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    deadline: string;
  }) => {
    try {
      const newDirective: ComplianceDirective = {
        id: `DIR-${Math.random().toString(36).substr(2, 9)}`,
        type: formData.type,
        reference: formData.reference,
        issuingBody: formData.issuingBody,
        applicableModels: ["AW139"],
        title: formData.title,
        description: formData.description,
        effectiveDate: new Date().toISOString().split('T')[0],
        status: "open",
        priority: formData.priority,
        deadline: formData.deadline,
      };

      // Update state with the new directive
      const updatedDirectives = [newDirective, ...directives];
      setDirectives(updatedDirectives);
      
      // Explicitly save to localStorage
      localStorage.setItem('complianceDirectives', JSON.stringify(updatedDirectives));

      toast({
        title: "Success",
        description: "New directive has been added and saved successfully",
      });

      return newDirective;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add new directive",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateComplianceStatus = (
    reference: string, 
    status: 'open' | 'closed' | 'not-applicable',
    completionDetails?: ComplianceDirective['completionDetails']
  ) => {
    setDirectives(prev => {
      const updated = prev.map(directive => {
        if (directive.reference === reference) {
          return {
            ...directive,
            status,
            completionDetails
          };
        }
        return directive;
      });
      localStorage.setItem('complianceDirectives', JSON.stringify(updated));
      return updated;
    });
  };

  return {
    directives,
    addDirective,
    updateComplianceStatus
  };
};
