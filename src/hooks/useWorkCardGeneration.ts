
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Aircraft } from "@/types/weststar";

export const useWorkCardGeneration = (aircraft: Aircraft | undefined) => {
  const [workCard, setWorkCard] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generatePrompt = (flightHours: string, cycles: string, environment: string) => {
    const basePrompt = `Generate a comprehensive work card for an AW139 helicopter (${aircraft?.tailNumber}) with ${flightHours} flight hours and ${cycles} cycles, operating in ${environment} environment.`;
    
    const hoursNum = parseInt(flightHours);
    if (hoursNum >= 3500 && hoursNum <= 3600) {
      return `${basePrompt}

Key requirements:
1. Include Tail Rotor Gearbox Inspection as per CAAM/AD/TRG-2025-01
2. Reference OEM manual sections and CAAM directives
3. List all required parts, tools, and their part numbers
4. Specify safety precautions and required PPE
5. Include estimated labor hours
6. Detail step-by-step maintenance procedures
7. Specify any special tooling requirements
8. Include quality assurance checkpoints

Please format the response with clear sections for:
- Task Overview
- Safety Precautions
- Required Parts and Tools
- Step-by-Step Procedures
- Quality Checks
- Sign-off Requirements`;
    }
    
    return `${basePrompt}

Please include:
1. Required maintenance tasks based on flight hours and cycles
2. Safety precautions and required PPE
3. Required parts and tools
4. Step-by-step procedures
5. Quality assurance checkpoints`;
  };

  const generateWorkCard = async (flightHours: string, cycles: string, environment: string) => {
    setIsLoading(true);
    setWorkCard("");

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const prompt = generatePrompt(flightHours, cycles, environment);
      // Mock response
      const mockResponse = `# Work Card - ${aircraft?.tailNumber}
Generated on: ${new Date().toLocaleDateString()}

${parseInt(flightHours) >= 3500 && parseInt(flightHours) <= 3600 ? 
`⚠️ **HIGH PRIORITY - COMPLIANCE DIRECTIVE**
- CAAM/AD/TRG-2025-01
- Tail Rotor Gearbox Inspection Required
- Must be completed before 3,600 flight hours

` : ''}

## Task Overview
- Aircraft: ${aircraft?.tailNumber} (AW139)
- Flight Hours: ${flightHours}
- Cycles: ${cycles}
- Environment: ${environment}

## Safety Precautions
1. Ensure aircraft is properly grounded
2. Display "Maintenance in Progress" signs
3. Required PPE:
   - Safety glasses
   - Work gloves
   - Steel-toed boots
   - High-visibility vest

## Required Parts and Tools
1. Parts:
   - Gearbox oil (P/N: AW139-GB-OIL10)
   - Gasket set (P/N: AW139-GSKT-TR)
2. Tools:
   - Torque wrench set
   - Oil drain pan
   - Inspection mirror
   - Borescope (if required)

## Step-by-Step Procedures
1. Initial Setup (2 hours)
   - Position aircraft in maintenance area
   - Install safety barriers
   - Connect ground power
   
2. Inspection Tasks (4 hours)
   - Remove access panels
   - Conduct visual inspection
   - Check oil levels
   - Inspect mounting bolts
   
3. Completion (2 hours)
   - Reinstall panels
   - System test
   - Documentation

## Quality Checks
- All work must be documented in the aircraft technical log
- Any discrepancies must be reported to the maintenance supervisor
- Final inspection required before return to service

## References
- Aircraft Maintenance Manual: Chapter ${Math.floor(Math.random() * 20 + 1)}-${Math.floor(Math.random() * 50 + 1)}
- CAAM Regulations: Part 145
${parseInt(flightHours) >= 3500 && parseInt(flightHours) <= 3600 ? 
'- CAAM/AD/TRG-2025-01' : ''}

## Sign-off Requirements
- Licensed Aircraft Maintenance Engineer
- Quality Assurance Inspector
- Maintenance Manager approval required for return to service

## Electronic Signature
Technician ID: _____________
Date: _____________
Time: _____________`;
      
      setWorkCard(mockResponse);
      return mockResponse;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate work card. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating work card:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    workCard,
    isLoading,
    generateWorkCard,
    setWorkCard
  };
};
