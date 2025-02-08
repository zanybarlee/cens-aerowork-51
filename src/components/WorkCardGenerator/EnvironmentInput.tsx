
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface EnvironmentInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}

const environmentPresets = [
  { value: "offshore", label: "Offshore" },
  { value: "desert", label: "Desert" },
  { value: "arctic", label: "Arctic" },
  { value: "tropical", label: "Tropical" },
  { value: "coastal", label: "Coastal" },
  { value: "mountain", label: "Mountain" },
  { value: "urban", label: "Urban" },
];

export function EnvironmentInput({ value, onChange }: EnvironmentInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="environment">Operating Environment</Label>
      <Select
        value={value}
        onValueChange={(newValue) => {
          if (typeof onChange === 'function') {
            // If it's the event handler style
            if ('target' in onChange) {
              onChange({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
            } else {
              // If it's the direct value style
              onChange(newValue);
            }
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select operating environment" />
        </SelectTrigger>
        <SelectContent>
          {environmentPresets.map((env) => (
            <SelectItem key={env.value} value={env.value}>
              {env.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
