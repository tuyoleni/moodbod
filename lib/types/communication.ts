import { Timestamp } from 'firebase/firestore';
import { FeedbackType, FeedbackStatus } from './enums';
import { Attachment } from './file';
import { Project } from './project';
import { User } from './user';

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
    content: string;
    projectId: string;
    userId: string;
    project?: Project;
    user?: User;
    attachments?: Attachment[];
    createdAt: Date;
    updatedAt?: Date;
    readBy: string[];
}