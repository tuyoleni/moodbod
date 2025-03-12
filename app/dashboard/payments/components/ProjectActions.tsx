import React from 'react';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/types';
import { ExternalLink, CreditCard, MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useCurrency } from '@/lib/context/CurrencyContext';

interface ProjectActionsProps {
  project: Project;
  onPayment: (projectId: string, amount: number, isService?: boolean, serviceId?: string) => Promise<void>;
  processingPayment: string | null;
}

export default function ProjectActions({ project, onPayment, processingPayment }: ProjectActionsProps) {
  const router = useRouter();
  const { formatAmount } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/dashboard/manage/${project.id}`)}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View Project
          </DropdownMenuItem>
          {!project.payments?.some(p => p.status === 'completed') && (
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Now
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Payment</DialogTitle>
                  <DialogDescription>
                    You are about to pay {formatAmount(project.package.price)} for the {project.package.name} package.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="default"
                    onClick={() => onPayment(project.id, project.package.price)}
                    disabled={processingPayment === project.id}
                  >
                    {processingPayment === project.id ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Confirm Payment
                      </span>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}