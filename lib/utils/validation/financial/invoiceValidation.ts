import { InvoiceStatus } from '@/lib/types';

export const validateInvoiceStatus = (status: InvoiceStatus): boolean => {
    return Object.values(InvoiceStatus).includes(status);
};