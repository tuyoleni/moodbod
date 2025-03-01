import { Timestamp } from 'firebase/firestore';
import { ServiceStatus } from './enums';

export interface Milestone {
    id: string;
    title: string;
    description: string;
    dueDate: Timestamp;
    status: ServiceStatus;
    paymentRequired?: number;
}