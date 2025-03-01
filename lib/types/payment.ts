import { Timestamp } from 'firebase/firestore';
import { PaymentMethod, InvoiceStatus } from './enums';

export interface Payment {
    id: string;
    projectId: string;
    userId: string;
    amount: number;
    type: 'initial' | 'milestone' | 'final';
    status: 'pending' | 'completed' | 'failed';
    method: PaymentMethod;
    date: Timestamp;
    invoice?: Invoice;
}

export interface Invoice {
    id: string;
    projectId: string;
    userId: string;
    paymentRef?: string;
    amount: number;
    items: InvoiceItem[];
    status: InvoiceStatus;
    dueDate: Timestamp;
    paidDate?: Timestamp;
}

export interface InvoiceItem {
    description: string;
    amount: number;
    quantity: number;
}