import { Timestamp } from 'firebase/firestore';
import { ProjectType, ProjectStatus } from './enums';
import { BaseFeatures, EcommerceFeatures, MarketingFeatures, BrandingFeatures, MaintenanceFeatures } from './features';
import { Service } from './service';
import { Feedback } from './communication';
import { Milestone } from './milestone';
import { Payment } from './payment';

export interface Project {
    id: string;
    userId: string;
    name: string;
    description: string;
    type: ProjectType;
    status: ProjectStatus;
    package: ProjectPackage;
    additionalServices: Service[];
    requirements: string;
    projectGoals: string[];
    targetAudience: string;
    totalCost: number;
    paidAmount: number;
    liveUrl?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    comments: Comment[];
    feedback: Feedback[];
    milestones: Milestone[];
    payments: Payment[];
}

export interface ProjectPackage {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    features: BaseFeatures | EcommerceFeatures | MarketingFeatures | BrandingFeatures | MaintenanceFeatures;
}

export interface PricingPackage {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    category: ProjectType | 'maintenance';
    features: BaseFeatures | EcommerceFeatures | MarketingFeatures | BrandingFeatures | MaintenanceFeatures;
}

export interface ProjectValidation {
    isValid: boolean;
    balanceDue?: number;
    progress?: number;
    nextMilestone?: Milestone;
}