// types/database.ts
import { Timestamp } from 'firebase/firestore';

// ======================
// ENUM DEFINITIONS
// ======================
export enum ProjectStatus {
    REQUESTED = 'requested',
    IN_PROGRESS = 'in_progress',
    IN_REVIEW = 'in_review',
    COMPLETED = 'completed'
}

export enum PaymentMethod {
    BANK_TRANSFER = 'bank_transfer',
    CREDIT_CARD = 'credit_card',
    PAYPAL = 'paypal'
}

export enum ServiceStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed'
}

export enum FeedbackType {
    REVISION = 'revision',
    APPROVAL = 'approval',
    COMMENT = 'comment'
}

export enum FeedbackStatus {
    PENDING = 'pending',
    ADDRESSED = 'addressed'
}

export enum InvoiceStatus {
    DRAFT = 'draft',
    SENT = 'sent',
    PAID = 'paid'
}

export enum ProjectType {
    WEBSITE = 'website',
    ECOMMERCE = 'ecommerce',
    BRANDING = 'branding',
    MARKETING = 'marketing'
}

// ======================
// USER RELATED TYPES
// ======================
export interface User {
    id: string;
    email: string;
    name: string;
    company?: string;
    role: 'client' | 'admin';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// ======================
// PROJECT CORE TYPES
// ======================
export interface Project {
    id: string;
    userId: string; // Reference to User document
    name: string;
    description: string;
    type: ProjectType;
    status: ProjectStatus;

    // Package and Services
    package: ProjectPackage;
    additionalServices: Service[];

    // Project Details
    requirements: string;
    projectGoals: string[];
    targetAudience: string;

    // Financial (values in cents to avoid floating point issues)
    totalCost: number;    // In cents (100 = $1.00)
    paidAmount: number;   // In cents (paidAmount <= totalCost)

    // Optional Details
    liveUrl?: string;

    // Timestamps
    createdAt: Timestamp;
    updatedAt: Timestamp;

    // Comments and Feedback
    comments: Comment[];
    feedback: Feedback[];

    // Milestones
    milestones: Milestone[];

    // Payments
    payments: Payment[];
}

// ======================
// PROJECT COMPONENTS
// ======================
export interface ProjectPackage {
    id: string;
    name: string;
    description: string;
    basePrice: number; // In cents
    features?: string[];
}

export interface Service {
    id: string;
    name: string;
    category: string;
    description: string;
    basePrice: number; // In cents
    status: ServiceStatus;
}

// ======================
// COMMUNICATION TYPES
// ======================
export interface Comment {
    id: string;
    projectId: string;
    userId: string;     // Reference to User document
    content: string;
    createdAt: Timestamp;
}

export interface Feedback {
    id: string;
    projectId: string;
    userId: string;     // Reference to User document
    type: FeedbackType;
    content: string;
    status: FeedbackStatus;
    createdAt: Timestamp;
}

// ======================
// MILESTONES & PAYMENTS
// ======================
export interface Milestone {
    id: string;
    title: string;
    description: string;
    dueDate: Timestamp;
    status: ServiceStatus; // Reusing ServiceStatus enum
    paymentRequired?: number; // In cents
}

export interface Payment {
    id: string;
    projectId: string;
    userId: string;     // Reference to User document
    amount: number;     // In cents
    type: 'initial' | 'milestone' | 'final';
    status: 'pending' | 'completed' | 'failed';
    method: PaymentMethod;
    date: Timestamp;
    invoice?: Invoice;
}

// ======================
// FINANCIAL TYPES
// ======================
export interface Invoice {
    id: string;
    projectId: string;
    userId: string;     // Reference to User document
    paymentRef?: string; // Reference to Payment document
    amount: number;     // In cents
    items: InvoiceItem[];
    status: InvoiceStatus;
    dueDate: Timestamp;
    paidDate?: Timestamp;
}

export interface InvoiceItem {
    description: string;
    amount: number;     // In cents
    quantity: number;
}

// ======================
// ADDITIONAL TYPES
// ======================
export interface Message {
    id: string;
    projectId: string;
    userId: string;     // Reference to User document
    content: string;
    attachments?: Attachment[];
    createdAt: Timestamp;
    readBy: string[];   // Array of user IDs
}

export interface Attachment {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;       // In bytes
}

export interface PricingPackage {
    id: string;
    name: string;
    description: string;
    basePrice: number;  // In cents
    features: string[];
    category: ProjectType | 'maintenance';
}

// ======================
// VALIDATION INTERFACES
// ======================
export interface ProjectValidation {
    isValid: boolean;
    balanceDue?: number; // In cents
    progress?: number;   // 0-100 percentage
    nextMilestone?: Milestone;
}