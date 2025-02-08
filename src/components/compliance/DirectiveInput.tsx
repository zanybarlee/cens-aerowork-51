
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DirectiveInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function DirectiveInput({ value, onChange, onSubmit, isLoading }: DirectiveInputProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-grow">
        <Label htmlFor="directive" className="sr-only">
          Directive
        </Label>
        <Input
          id="directive"
          placeholder="Enter new directive to analyze..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-[300px]"
        />
      </div>
      <Button
        className="bg-blue-900 hover:bg-blue-800"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Add New Directive"}
      </Button>
    </div>
  );
}
