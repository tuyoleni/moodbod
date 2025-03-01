import { ServiceStatus } from '@/lib/types';

export const validateServiceStatus = (status: ServiceStatus): boolean => {
    return Object.values(ServiceStatus).includes(status);
};