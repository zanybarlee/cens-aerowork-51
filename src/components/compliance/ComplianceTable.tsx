
import React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComplianceDirective } from "@/types/weststar";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";

interface ComplianceTableProps {
  directives: ComplianceDirective[];
  onViewDetails: (description: string) => void;
}

export function ComplianceTable({ directives, onViewDetails }: ComplianceTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Effective Date</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {directives.map((directive) => (
            <TableRow key={directive.id}>
              <TableCell className="font-medium">{directive.reference}</TableCell>
              <TableCell>
                <Badge variant="outline">{directive.type}</Badge>
              </TableCell>
              <TableCell>{directive.title}</TableCell>
              <TableCell>{directive.effectiveDate}</TableCell>
              <TableCell>{directive.deadline}</TableCell>
              <TableCell>
                <PriorityBadge priority={directive.priority} />
              </TableCell>
              <TableCell>
                <StatusBadge status={directive.status} />
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-900 hover:text-blue-800"
                  onClick={() => onViewDetails(directive.description)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
