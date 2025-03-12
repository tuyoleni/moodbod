import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCurrency } from '@/lib/context/CurrencyContext';
import { Service, ServiceStatus } from '@/lib/types';

interface ServicesTableProps {
  services: Service[];
  projectId: string;
  onPayment: (projectId: string, amount: number, isService?: boolean, serviceId?: string) => Promise<void>;
  processingPayment: string | null;
}

export default function ServicesTable({ services, projectId, onPayment, processingPayment }: ServicesTableProps) {
  const { formatAmount } = useCurrency();

  return (
    <TableRow>
      <TableCell colSpan={6} className="bg-muted/50 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{formatAmount(service.price || 0)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant={service.status === ServiceStatus.APPROVED ? 'secondary' : 'warning'}>
                      {service.status}
                    </Badge>
                    {service.status === ServiceStatus.APPROVED && !service.paid && (
                      <ServicePaymentDialog
                        service={service}
                        projectId={projectId}
                        onPayment={onPayment}
                        processingPayment={processingPayment}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  );
}