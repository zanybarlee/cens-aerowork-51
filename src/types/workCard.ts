
import { Aircraft } from "./weststar";

export interface StoredWorkCard {
  id: string;
  content: string;
  flightHours: string;
  cycles: string;
  environment: string;
  date: string;
  role: string;
  status: 'draft' | 'scheduled' | 'completed';
  scheduledDate?: string;
  scheduledLocation?: string;
  assignedTechnician?: string;
  completedBy?: string;
  completionDate?: string;
  completionRemarks?: string;
  taskResults?: string;
  requiredParts?: {
    partNumber: string;
    quantity: number;
  }[];
}

export interface WorkCardFormProps {
  userRole: string;
  aircraft: Aircraft;
}
