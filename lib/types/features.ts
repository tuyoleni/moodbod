export interface BaseFeatures {
    pages: number;
    revisions: number;
    mobileResponsive: boolean;
    contactForm: boolean;
    socialMediaLinks: boolean;
    seoSetup: boolean;
    customDesign: boolean;
}

export interface EcommerceFeatures extends BaseFeatures {
    productListings: number;
    shoppingCart: boolean;
    paymentGateway: boolean;
}

export interface MarketingFeatures {
    keywordResearch: boolean;
    onPageOptimization: boolean;
    technicalSeo: boolean;
    monthlyReports: boolean;
}

export interface BrandingFeatures {
    logoDesign: boolean;
    colorPalette: boolean;
    brandGuidelines: boolean;
    businessCards?: boolean;
}

export interface MaintenanceFeatures {
    updates: boolean;
    backups: boolean;
    securityMonitoring: boolean;
    responseTime: number; // in hours
}