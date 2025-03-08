export enum PaymentMethod {
    BANK_TRANSFER = 'bank transfer',
    CREDIT_CARD = 'credit card',
    PAYPAL = 'paypal'
}

export enum ServiceStatus {
    REQUEST = 'request',
    ANALYZING = 'analyzing',
    PAYMENT_PENDING = 'payment pending',
    PLANNING = 'planning',
    DEVELOPMENT = 'development',
    REVIEW = 'review',
    TESTING = 'testing',
    COMPLETED = 'completed',
    REJECTED = 'rejected',
    REMOVED = 'removed',
    APPROVED='approved'
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