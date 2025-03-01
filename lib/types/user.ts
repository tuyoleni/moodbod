import { Project } from './project';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'client';
    projects?: Project[];
    createdAt?: Date;
    updatedAt?: Date;
}