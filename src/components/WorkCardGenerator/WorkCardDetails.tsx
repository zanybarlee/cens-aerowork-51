
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, MessageSquare, Signature } from "lucide-react";
import { StoredWorkCard } from "@/types/workCard";

interface WorkCardDetailsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
  workCard?: StoredWorkCard;
  userRole?: string;
  onComplete?: (results: string, remarks: string) => void;
}

export function WorkCardDetails({ 
  isOpen, 
  onOpenChange, 
  content,
  workCard,
  userRole,
  onComplete 
}: WorkCardDetailsProps) {
  const [taskResults, setTaskResults] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleComplete = () => {
    if (onComplete) {
      onComplete(taskResults, remarks);
      onOpenChange(false);
    }
  };

  const isCompleted = workCard?.status === 'completed';
  const isTechnician = userRole === 'engineer-technician';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Work Card Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="prose prose-sm max-w-none dark:prose-invert bg-muted p-6 rounded-lg">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {isTechnician && !isCompleted && workCard?.status === 'scheduled' && (
            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="results">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Task Results
                </Label>
                <Textarea
                  id="results"
                  placeholder="Enter task results (e.g., gearbox oil sample normal, no metal particles found)"
                  value={taskResults}
                  onChange={(e) => setTaskResults(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">
                  <Signature className="w-4 h-4 inline mr-2" />
                  Completion Remarks
                </Label>
                <Textarea
                  id="remarks"
                  placeholder="Enter any remarks or observations"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button 
                onClick={handleComplete}
                className="w-full"
                disabled={!taskResults.trim()}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete Work Card
              </Button>
            </div>
          )}

          {isCompleted && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <Label>Task Results</Label>
                <p className="mt-1 text-sm">{workCard.taskResults}</p>
              </div>
              <div>
                <Label>Completion Remarks</Label>
                <p className="mt-1 text-sm">{workCard.completionRemarks}</p>
              </div>
              <div>
                <Label>Completed By</Label>
                <p className="mt-1 text-sm">{workCard.completedBy}</p>
              </div>
              <div>
                <Label>Completion Date</Label>
                <p className="mt-1 text-sm">{workCard.completionDate}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
