
import { format } from "date-fns";

interface AircraftInfoProps {
  aircraft: {
    tailNumber: string;
    model: string;
    environment: string;
    lastInspectionDate?: string;
  };
}

export function AircraftInfo({ aircraft }: AircraftInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg mb-4">
      <div>
        <p className="text-sm font-medium">Tail Number: {aircraft.tailNumber}</p>
        <p className="text-sm font-medium">Model: {aircraft.model}</p>
      </div>
      <div>
        <p className="text-sm font-medium">Environment: {aircraft.environment}</p>
        {aircraft.lastInspectionDate && (
          <p className="text-sm font-medium">
            Last Inspection: {format(new Date(aircraft.lastInspectionDate), 'MMM dd, yyyy')}
          </p>
        )}
      </div>
    </div>
  );
}
