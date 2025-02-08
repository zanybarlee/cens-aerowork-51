
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";

interface DirectiveDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
}

export function DirectiveDetailsModal({ isOpen, onOpenChange, description }: DirectiveDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Directive Details</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm max-w-none dark:prose-invert bg-gray-50 p-4 rounded-lg">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}
