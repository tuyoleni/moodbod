import { Timestamp } from 'firebase/firestore';
import { PaymentMethod, InvoiceStatus } from './enums';
import { Project } from './project';
import { User } from './user';

export interface Payment {
    id: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    projectId: string;
    userId: string;
    project?: Project;
    user?: User;
    createdAt: Date;
    updatedAt?: Date;
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