import { 
    BaseFeatures, 
    EcommerceFeatures, 
    MarketingFeatures, 
    BrandingFeatures, 
    MaintenanceFeatures,
    ProjectType 
} from '@/lib/types';

export const validateFeatures = (
    features: BaseFeatures | EcommerceFeatures | MarketingFeatures | BrandingFeatures | MaintenanceFeatures,
    type: ProjectType
): boolean => {
    switch (type) {
        case ProjectType.WEBSITE:
            return validateBaseFeatures(features as BaseFeatures);
        case ProjectType.ECOMMERCE:
            return validateEcommerceFeatures(features as EcommerceFeatures);
        case ProjectType.MARKETING:
            return validateMarketingFeatures(features as MarketingFeatures);
        case ProjectType.BRANDING:
            return validateBrandingFeatures(features as BrandingFeatures);
        default:
            return false;
    }
};

export const validateBaseFeatures = (features: BaseFeatures): boolean => {
    return 'pages' in features &&
           'revisions' in features &&
           'mobileResponsive' in features &&
           'contactForm' in features &&
           'socialMediaLinks' in features &&
           'seoSetup' in features &&
           'customDesign' in features;
};

export const validateEcommerceFeatures = (features: EcommerceFeatures): boolean => {
    return 'productListings' in features &&
           'shoppingCart' in features &&
           'paymentGateway' in features &&
           validateBaseFeatures(features);
};

export const validateMarketingFeatures = (features: MarketingFeatures): boolean => {
    return 'keywordResearch' in features &&
           'onPageOptimization' in features &&
           'technicalSeo' in features &&
           'monthlyReports' in features;
};

export const validateBrandingFeatures = (features: BrandingFeatures): boolean => {
    return 'logoDesign' in features &&
           'colorPalette' in features &&
           'brandGuidelines' in features;
};