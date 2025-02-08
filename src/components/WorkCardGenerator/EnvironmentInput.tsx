
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EnvironmentInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EnvironmentInput({ value, onChange }: EnvironmentInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="environment">Operating Environment</Label>
      <Input
        id="environment"
        placeholder="e.g., Coastal, Desert, Arctic"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
