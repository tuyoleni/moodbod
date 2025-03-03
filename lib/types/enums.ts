export enum ProjectStatus {
    REQUESTED = 'requested',
    IN_PROGRESS = 'in progress',
    IN_REVIEW = 'in review',
    COMPLETED = 'completed',
    ACTIVE = "activate",
    REJECTED = "rejected"
}

export enum PaymentMethod {
    BANK_TRANSFER = 'bank transfer',
    CREDIT_CARD = 'credit card',
    PAYPAL = 'paypal'
}

export enum ServiceStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    ACTIVE = 'active',
    IN_PROGRESS = 'in progress',
    COMPLETED = 'completed',
    REMOVED = 'removed'
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