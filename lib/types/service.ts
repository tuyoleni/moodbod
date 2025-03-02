import { Project } from './project';
import { ServiceStatus } from './enums';

export interface Service {
    id: string;
    name?: string;
    description?: string;
    projectId?: string;
    project?: Project;
    createdAt?: Date;
    requestedAt?: Date;
    status?: ServiceStatus;
    category?: string;
    price?: number;
}