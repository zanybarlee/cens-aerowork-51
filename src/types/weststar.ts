
export interface Aircraft {
  tailNumber: string;
  model: string;
  flightHours: number;
  cycles: number;
  environment: string;
  lastInspectionDate?: string;
  nextInspectionDue?: string;
}

export interface ComplianceDirective {
  id: string;
  type: 'AD' | 'SB';
  reference: string;
  issuingBody: string;
  applicableModels: string[];
  title: string;
  description: string;
  effectiveDate: string;
  status: 'open' | 'closed' | 'not-applicable';
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
  completionDetails?: {
    technician: string;
    date: string;
    remarks?: string;
  };
}

export interface MaintenanceTask {
  id: string;
  directiveId: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
  scheduledDate?: string;
  completedDate?: string;
  remarks?: string;
}

export interface WorkCard {
  id: string;
  taskId: string;
  aircraft: string;
  title: string;
  steps: string[];
  priority: 'high' | 'medium' | 'low';
  partsRequired: {
    partNumber: string;
    description: string;
    quantity: number;
  }[];
  laborHours: number;
  createdAt: string;
  status: 'draft' | 'active' | 'completed';
}

export interface InventoryPart {
  partNumber: string;
  description: string;
  stockQuantity: number;
  leadTimeDays: number;
  costUSD: number;
}
