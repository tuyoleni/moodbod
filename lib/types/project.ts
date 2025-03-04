import { Timestamp } from 'firebase/firestore';
import { ProjectType, ProjectStatus } from './enums';
import { BaseFeatures, EcommerceFeatures, MarketingFeatures, BrandingFeatures, MaintenanceFeatures } from './features';
import { Service } from './service';
import { Feedback, Message } from './communication';
import { Milestone } from './milestone';
import { Payment } from './payment';
import { User } from './user';

export interface Project {
    // Basic Information
    id: string;
    name: string;
    description: string;
    type: ProjectType;
    status: ProjectStatus;
    userId: string;
    user?: User;

    // Project Details
    package: ProjectPackage;
    additionalServices: Service[];
    services?: Service[];
    requirements: string;
    projectGoals: string[];
    targetAudience: string;
    liveUrl?: string;

    // Financial Information
    totalCost: number;
    paidAmount: number;
    payments: Payment[];

    // Timeline
    startDate: Timestamp;
    endDate: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;

    // Project Progress
    milestones: Milestone[];

    // Communication
    comments: Comment[];
    feedback: Feedback[];
    messages?: Message[];
}

export interface ProjectPackage {
    id: string;
    name: string;
    description: string;
    price: number;
    features: BaseFeatures | EcommerceFeatures | MarketingFeatures | BrandingFeatures | MaintenanceFeatures;
}

export interface PricingPackage {
    id: string;
    name: string;
    description: string;
    price: number;
    category: ProjectType | 'maintenance';
    features: BaseFeatures | EcommerceFeatures | MarketingFeatures | BrandingFeatures | MaintenanceFeatures;
}

export interface ProjectValidation {
    isValid: boolean;
    balanceDue?: number;
    progress?: number;
    nextMilestone?: Milestone;
}