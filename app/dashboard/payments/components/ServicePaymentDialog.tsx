import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Service } from '@/lib/types';
import { useCurrency } from '@/lib/context/CurrencyContext';

interface ServicePaymentDialogProps {
  service: Service;
  projectId: string;
  onPayment: (projectId: string, amount: number, isService?: boolean, serviceId?: string) => Promise<void>;
  processingPayment: string | null;
}

export default function ServicePaymentDialog({
  service,
  projectId,
  onPayment,
  processingPayment
}: ServicePaymentDialogProps) {
  const { formatAmount } = useCurrency();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={processingPayment === service.id}
        >
          {processingPayment === service.id ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Pay Service
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Service Payment</DialogTitle>
          <DialogDescription>
            You are about to pay {formatAmount(service.price || 0)} for the {service.name} service.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            variant="default"
            onClick={() => onPayment(projectId, service.price || 0, true, service.id)}
            disabled={processingPayment === service.id}
          >
            Confirm Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}