import { Project } from './project';

export interface User {
    messages: Record<string, unknown>;
    payments: Record<string, unknown>;
    services: Record<string, unknown>;
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'client';
    projects?: Project[];
    createdAt?: Date;
    updatedAt?: Date;
}