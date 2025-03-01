import { Timestamp } from 'firebase/firestore';
import { FeedbackType, FeedbackStatus } from './enums';
import { Attachment } from './file';

export interface Comment {
    id: string;
    projectId: string;
    userId: string;
    content: string;
    createdAt: Timestamp;
}

export interface Feedback {
    id: string;
    projectId: string;
    userId: string;
    type: FeedbackType;
    content: string;
    status: FeedbackStatus;
    createdAt: Timestamp;
}

export interface Message {
    id: string;
    projectId: string;
    userId: string;
    content: string;
    attachments?: Attachment[];
    createdAt: Timestamp;
    readBy: string[];
}