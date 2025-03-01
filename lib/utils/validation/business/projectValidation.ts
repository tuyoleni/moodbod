import { ProjectStatus, ProjectType } from '@/lib/types';

export const validateProjectStatus = (status: ProjectStatus): boolean => {
    return Object.values(ProjectStatus).includes(status);
};

export const validateProjectType = (type: ProjectType): boolean => {
    return Object.values(ProjectType).includes(type);
};