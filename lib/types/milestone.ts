import { Timestamp } from 'firebase/firestore';
import { ServiceStatus } from './enums';

export interface Milestone {
    updatedAt: any;
    updatedBy(updatedBy: any): unknown;
    id: string;
    title: string;
    description: string;
    dueDate: Timestamp;
    status: ServiceStatus;
    paymentRequired?: number;
}