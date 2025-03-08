import { PricingPackage } from "../types";
import { ProjectType, ServiceStatus } from "../types/enums";
import { Service } from "../types/service";


export const pricingPackages: PricingPackage[] = [
    {
        id: 'basic-website',
        name: 'Basic Single-Page Website',
        description: 'Perfect for individuals or small businesses just starting out.',
        price: 1800,
        category: ProjectType.WEBSITE,
        features: {
            pages: 1,
            revisions: 2,
            mobileResponsive: true,
            contactForm: true,
            socialMediaLinks: true,
            seoSetup: true,
            customDesign: false
        }
    },
    {
        id: 'standard-website',
        name: 'Standard Website',
        description: 'Ideal for growing businesses looking for more features.',
        price: 4500,
        category: ProjectType.WEBSITE,
        features: {
            pages: 3,
            revisions: 3,
            mobileResponsive: true,
            contactForm: true,
            socialMediaLinks: true,
            seoSetup: true,
            customDesign: true
        }
    },
    {
        id: 'ecommerce',
        name: 'E-commerce Website',
        description: 'For businesses ready to sell products online.',
        price: 8000,
        category: ProjectType.ECOMMERCE,
        features: {
            pages: 5,
            revisions: 4,
            mobileResponsive: true,
            contactForm: true,
            socialMediaLinks: true,
            seoSetup: true,
            customDesign: true,
            productListings: 30,
            shoppingCart: true,
            paymentGateway: true
        }
    }
];

export const additionalServices: Service[] = [
    {
        id: 'additional-page',
        name: 'Additional Website Page',
        category: 'website',
        description: 'Add an extra page to your website with custom content.',
        price: 500,
        status: ServiceStatus.REQUEST
    },
    {
        id: 'seo-package',
        name: 'Advanced SEO Package',
        category: 'marketing',
        description: 'Comprehensive keyword research and optimization to improve your search rankings.',
        price: 1500,
        status: ServiceStatus.REQUEST
    },
    {
        id: 'branding-package',
        name: 'Brand Identity Package',
        category: 'branding',
        description: 'Complete brand identity design including logo and brand guidelines.',
        price: 2000,
        status: ServiceStatus.REQUEST
    },
    {
        id: 'maintenance-package',
        name: 'Website Maintenance',
        category: 'maintenance',
        description: 'Keep your website secure and up-to-date with regular maintenance.',
        price: 200,
        status: ServiceStatus.REQUEST
    },
    {
        id: 'extra-products',
        name: 'Additional Product Listings',
        category: 'ecommerce',
        description: 'Add more product listings to your e-commerce website.',
        price: 300,
        status: ServiceStatus.REQUEST
    }
];