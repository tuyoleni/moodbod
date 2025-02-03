import { Timestamp } from 'firebase/firestore';

// User-related types
export interface User {
    id: string;
    email: string;
    name: string;
    company?: string;
    role: 'client' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

// Project-related types
export interface Project {
    [x: string]: any;
    id: string;
    userId: string;
    name: string;
    description: string;
    type: 'website' | 'ecommerce' | 'branding' | 'custom';
    status: 'requested' | 'received' | 'in_discussion' | 'in_progress' | 'in_review' | 'completed' | 'on_hold' | 'cancelled' | 'pending';
    package: ProjectPackage;
    additionalServices: ProjectService[];
    requirements: string;
    services: Service[];
    totalCost: number;
    paidAmount: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    contactEnabled: boolean;
    lastContactDate?: Timestamp;
}

export interface ProjectPackage {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    category: 'website' | 'ecommerce' | 'branding' | 'marketing' | 'maintenance';
    features: string[];
    status: 'active' | 'completed';
}

export interface ProjectService {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    category: 'website' | 'ecommerce' | 'branding' | 'marketing' | 'maintenance';
    status: 'pending' | 'in_progress' | 'completed';
    addedAt: Date;
}

export interface Milestone {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: 'pending' | 'in_progress' | 'completed';
    paymentRequired?: number;
}

// Payment-related types
export interface Payment {
    id: string;
    projectId: string;
    userId: string;
    amount: number;
    type: 'initial' | 'milestone' | 'final';
    status: 'pending' | 'completed' | 'failed';
    method: 'bank_transfer' | 'credit_card';
    date: Date;
    invoice?: Invoice;
}

export interface Invoice {
    id: string;
    projectId: string;
    userId: string;
    amount: number;
    items: InvoiceItem[];
    status: 'draft' | 'sent' | 'paid';
    dueDate: Date;
    paidDate?: Date;
}

export interface InvoiceItem {
    description: string;
    amount: number;
    quantity: number;
}

// Communication-related types
export interface Message {
    id: string;
    projectId: string;
    userId: string;
    content: string;
    attachments?: Attachment[];
    createdAt: Date;
    readBy: string[];
}

export interface Attachment {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    category: 'website' | 'ecommerce' | 'branding' | 'marketing' | 'maintenance';
    features: string[];
    status?: 'pending' | 'in_progress' | 'completed' | 'active';
}

export interface Feature {
    id: string;
    name: string;
    description: string;
    price: number;
    status: 'pending' | 'in_progress' | 'completed';
}

export interface PricingPackage {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    features: string[];
    category: 'website' | 'ecommerce' | 'branding' | 'marketing' | 'maintenance';
}

export type ProjectType = 'website' | 'ecommerce' | 'branding' | 'custom'; 