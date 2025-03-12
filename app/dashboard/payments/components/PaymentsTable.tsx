import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Project } from '@/lib/types';
import ProjectRow from './ProjectRow';

interface PaymentsTableProps {
  projects: Project[];
  onPayment: (projectId: string, amount: number, isService?: boolean, serviceId?: string) => Promise<void>;
  processingPayment: string | null;
}

export default function PaymentsTable({ projects, onPayment, processingPayment }: PaymentsTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Details</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Base Price</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onPayment={onPayment}
              processingPayment={processingPayment}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}