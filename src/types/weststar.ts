
export interface Aircraft {
  tailNumber: string;
  model: string;
  flightHours: number;
  cycles: number;
  environment: string;
  lastInspectionDate?: string;
}

export interface ComplianceDirective {
  id: string;
  type: 'AD' | 'SB';
  reference: string;
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
  title: string;
  steps: string[];
  partsRequired: string[];
  laborHours: number;
  createdAt: string;
  status: 'draft' | 'active' | 'completed';
}
