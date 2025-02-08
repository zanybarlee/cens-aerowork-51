
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NewDirectiveFormProps {
  onSubmit: (directiveData: {
    reference: string;
    type: 'AD' | 'SB';
    issuingBody: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    deadline: string;
  }) => void;
  isLoading: boolean;
}

export function NewDirectiveForm({ onSubmit, isLoading }: NewDirectiveFormProps) {
  const [formData, setFormData] = React.useState({
    reference: '',
    type: 'AD' as const,
    issuingBody: '',
    title: '',
    description: '',
    priority: 'medium' as const,
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reference">Reference ID</Label>
          <Input
            id="reference"
            placeholder="e.g., CAAM/AD/2024-01"
            value={formData.reference}
            onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: 'AD' | 'SB') => setFormData(prev => ({ ...prev, type: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AD">Airworthiness Directive (AD)</SelectItem>
              <SelectItem value="SB">Service Bulletin (SB)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="issuingBody">Issuing Body</Label>
          <Input
            id="issuingBody"
            placeholder="e.g., CAAM, Leonardo"
            value={formData.issuingBody}
            onChange={(e) => setFormData(prev => ({ ...prev, issuingBody: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value: 'high' | 'medium' | 'low') => 
              setFormData(prev => ({ ...prev, priority: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter directive title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter detailed description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          id="deadline"
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-900 hover:bg-blue-800" 
        disabled={isLoading}
      >
        {isLoading ? "Adding Directive..." : "Add New Directive"}
      </Button>
    </form>
  );
}
