
export interface StoredWorkCard {
  id: string;
  content: string;
  flightHours: string;
  cycles: string;
  environment: string;
  date: string;
  role: string;
}

export interface WorkCardFormProps {
  userRole: string;
}
