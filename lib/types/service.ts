import { Project } from './project';
import { ServiceStatus } from './enums';

export interface Service {
    requestedAt: any;
    id: string;
    name: string;
    description: string;
    projectId: string;
    project?: Project;
    createdAt: Date;
    updatedAt?: Date;
    status: ServiceStatus;
}