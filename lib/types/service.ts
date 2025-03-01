import { Project } from './project';
import { ServiceStatus } from './enums';

export interface Service {
    requestedAt: Record<string, unknown>;
    id: string;
    name: string;
    description: string;
    projectId: string;
    project?: Project;
    createdAt: Date;
    status: ServiceStatus;
}