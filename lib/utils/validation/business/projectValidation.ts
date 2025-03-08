import { ServiceStatus, ProjectType } from '@/lib/types';

export const validateProjectStatus = (status: ServiceStatus): boolean => {
    return Object.values(ServiceStatus).includes(status);
};

export const validateProjectType = (type: ProjectType): boolean => {
    return Object.values(ProjectType).includes(type);
};