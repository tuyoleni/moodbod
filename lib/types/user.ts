import { Project } from './project';

export interface User {
    messages: any;
    payments: any;
    services: any;
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'client';
    projects?: Project[];
    createdAt?: Date;
    updatedAt?: Date;
}