
import React from "react";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WorkCardDetailsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
}

export function WorkCardDetails({ isOpen, onOpenChange, content }: WorkCardDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Work Card Details</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm max-w-none dark:prose-invert bg-muted p-6 rounded-lg">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}
