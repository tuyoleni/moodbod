import { ServiceStatus } from './enums';

export interface Service {
    id: string;
    name: string;
    category: string;
    description: string;
    basePrice: number;
    status: ServiceStatus;
}