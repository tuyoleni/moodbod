import { Timestamp } from 'firebase/firestore';

export interface User {
    id: string;
    email: string;
    name: string;
    company?: string;
    role: 'client' | 'admin';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}