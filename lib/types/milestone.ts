import { Timestamp } from 'firebase/firestore';
import { FeedbackStatus, FeedbackType, ServiceStatus } from './enums';

export interface Milestone {
    id: ServiceStatus;
    description: string;
    paymentRequired?: number;
    projectId: string;
    createdAt: any;
    feedback?: MilestoneFeedback[];
    status: ServiceStatus;
}

export interface MilestoneFeedback {
    id: string;
    content: string;
    createdAt: Timestamp;
    createdBy: string;
    type: FeedbackType;
    status: FeedbackStatus;
    revisionNumber?: number;
}