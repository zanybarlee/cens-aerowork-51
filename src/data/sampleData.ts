
import { Aircraft, ComplianceDirective, InventoryPart, WorkCard } from "@/types/weststar";

export const sampleAircraft: Aircraft[] = [
  {
    tailNumber: "9M-WST",
    model: "AW139",
    flightHours: 3500,
    cycles: 1200,
    environment: "Offshore",
    lastInspectionDate: "2025-01-12",
    nextInspectionDue: "2025-02-15"
  },
  {
    tailNumber: "9M-ABC",
    model: "AW169",
    flightHours: 2100,
    cycles: 800,
    environment: "Offshore",
    lastInspectionDate: "2025-01-01",
    nextInspectionDue: "2025-03-01"
  },
  {
    tailNumber: "9M-XYZ",
    model: "AW189",
    flightHours: 4100,
    cycles: 1500,
    environment: "VIP",
    lastInspectionDate: "2025-01-20",
    nextInspectionDue: "2025-03-20"
  }
];

export const sampleDirectives: ComplianceDirective[] = [
  {
    id: "DIR-001",
    type: "AD",
    reference: "CAAM/AD/TRG-2025-01",
    issuingBody: "CAAM",
    applicableModels: ["AW139"],
    title: "Tail Rotor Gearbox Inspection",
    description: "Mandatory inspection of tail rotor gearbox due to potential wear issues",
    effectiveDate: "2025-01-30",
    status: "open",
    priority: "high",
    deadline: "2025-02-15"
  },
  {
    id: "DIR-002",
    type: "AD",
    reference: "CAAM/AD/ENG-2025-02",
    issuingBody: "CAAM",
    applicableModels: ["AW169", "AW189"],
    title: "Engine Fuel Control Unit Upgrade",
    description: "Mandatory upgrade of engine fuel control unit to revision B",
    effectiveDate: "2025-01-25",
    status: "open",
    priority: "medium",
    deadline: "2025-03-01"
  },
  {
    id: "DIR-003",
    type: "SB",
    reference: "OEM/SB/AW139-453",
    issuingBody: "Leonardo",
    applicableModels: ["AW139"],
    title: "Avionics Software Patch",
    description: "Installation of latest avionics software update",
    effectiveDate: "2025-01-10",
    status: "closed",
    priority: "low",
    completionDetails: {
      technician: "Tech 007",
      date: "2025-01-15",
      remarks: "Software update completed successfully"
    }
  }
];

export const sampleInventory: InventoryPart[] = [
  {
    partNumber: "AW139-GB-OIL10",
    description: "Gearbox Oil (10L drum)",
    stockQuantity: 5,
    leadTimeDays: 10,
    costUSD: 300
  },
  {
    partNumber: "AW139-GSKT-TR",
    description: "Tail Rotor Gearbox Gasket Set",
    stockQuantity: 2,
    leadTimeDays: 14,
    costUSD: 200
  },
  {
    partNumber: "AW169-FCUNIT-REVB",
    description: "Fuel Control Unit (Revision B)",
    stockQuantity: 1,
    leadTimeDays: 21,
    costUSD: 1500
  },
  {
    partNumber: "AW189-AVIONICS-PATCH",
    description: "Avionics Software Patch Module",
    stockQuantity: 0,
    leadTimeDays: 30,
    costUSD: 2000
  }
];

export const sampleWorkCards: WorkCard[] = [
  {
    id: "WC-2025-001",
    taskId: "TASK-001",
    aircraft: "9M-WST",
    title: "Tail Rotor GB Inspection",
    steps: [
      "Remove tail rotor fairing",
      "Drain gearbox oil and inspect for particles",
      "Perform visual inspection of gearbox housing",
      "Replace oil with new (P/N AW139-GB-OIL10)",
      "Reinstall fairing and perform test run"
    ],
    priority: "high",
    partsRequired: [
      {
        partNumber: "AW139-GB-OIL10",
        description: "Gearbox Oil (10L drum)",
        quantity: 1
      },
      {
        partNumber: "AW139-GSKT-TR",
        description: "Tail Rotor Gearbox Gasket Set",
        quantity: 1
      }
    ],
    laborHours: 8,
    createdAt: "2025-01-30",
    status: "active"
  },
  {
    id: "WC-2025-002",
    taskId: "TASK-002",
    aircraft: "9M-WST",
    title: "Routine 300hr Check",
    steps: [
      "Check rotor head assembly",
      "Inspect hydraulic lines",
      "Perform general visual inspection",
      "Document findings"
    ],
    priority: "medium",
    partsRequired: [],
    laborHours: 4,
    createdAt: "2025-01-30",
    status: "draft"
  }
];
