import React, { useState } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/types';
import { ChevronDown, ChevronUp, ExternalLink, CreditCard, MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useCurrency } from '@/lib/context/CurrencyContext';
import ServicesTable from './ServicesTable';
import ProjectActions from './ProjectActions';

interface ProjectRowProps {
  project: Project;
  onPayment: (projectId: string, amount: number, isService?: boolean, serviceId?: string) => Promise<void>;
  processingPayment: string | null;
}

export default function ProjectRow({ project, onPayment, processingPayment }: ProjectRowProps) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const { formatAmount } = useCurrency();

  return (
    <React.Fragment>
      <TableRow className={`group cursor-pointer hover:bg-muted/50 ${project.services && project.services.length > 0 ? 'relative' : ''}`}>
        <TableCell>
          <div>
            <p className="font-medium">{project.name}</p>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
        </TableCell>
        <TableCell>
          <Badge variant="secondary">{project.package.name}</Badge>
        </TableCell>
        <TableCell>{formatAmount(project.package.price)}</TableCell>
        <TableCell>
          <Badge variant={project.payments?.some(p => p.status === 'completed') ? 'secondary' : 'warning'}>
            {project.payments?.some(p => p.status === 'completed') ? 'Paid' : 'Pending'}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2">
            {formatAmount(
              project.package.price +
              (project.services?.reduce((sum, service) => sum + (service.price || 0), 0) || 0)
            )}
            {project.services && project.services.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </TableCell>
        <TableCell>
          <ProjectActions
            project={project}
            onPayment={onPayment}
            processingPayment={processingPayment}
          />
        </TableCell>
      </TableRow>
      {expanded && project.services && project.services.length > 0 && (
        <ServicesTable
          services={project.services}
          projectId={project.id}
          onPayment={onPayment}
          processingPayment={processingPayment}
        />
      )}
    </React.Fragment>
  );
}