import { Project } from './project';
import { ServiceStatus } from './enums';

export interface Service {
    id: string;
    name: string;
    description: string;
    status: ServiceStatus;
    category: string;
    price: number;
}