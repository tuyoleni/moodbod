import { PricingPackage, ProjectType } from "../types";

export const websitePackages: PricingPackage[] = [
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
        id: 'ecommerce-website',
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

export const additionalServices = [
    {
        id: 'additional-pages',
        name: 'Additional Website Pages',
        description: 'Expand your website with up to 5 additional pages of custom content.',
        price: 500,
        category: 'website',
        isMultiRequest: true,
        allowQuantity: true,
        quantity: 1
    },
    {
        id: 'advanced-seo',
        name: 'Advanced SEO Package',
        description: 'Comprehensive keyword research and optimization to improve your search rankings.',
        price: 1500,
        category: 'marketing',
        isMultiRequest: false
    },
    {
        id: 'branding-package',
        name: 'Business Branding Package',
        description: 'Comprehensive branding including logo design, color palette, and brand guidelines.',
        price: 2500,
        category: 'branding',
        isMultiRequest: false
    },
    {
        id: 'content-writing',
        name: 'Content Writing & Strategy',
        description: 'Professional content creation to engage your target audience.',
        price: 300,
        category: 'marketing',
        isMultiRequest: true,
        allowQuantity: true,
        quantity: 1
    },
    {
        id: 'extra-revisions',
        name: 'Extra Design Revisions',
        description: 'Additional design adjustments beyond the included revision rounds.',
        price: 250,
        category: 'website',
        isMultiRequest: true,
        allowQuantity: true,
        quantity: 1
    },
    {
        id: 'priority-support',
        name: 'Priority Support',
        description: 'Fast-track support with priority response for your website needs.',
        price: 300,
        category: 'maintenance',
        isMultiRequest: false
    },
    {
        id: 'website-maintenance',
        name: 'Website Maintenance',
        description: 'Regular updates, backups, and technical maintenance of your site.',
        price: 600,
        category: 'maintenance',
        isMultiRequest: false
    },
    {
        id: 'ecommerce-setup',
        name: 'E-commerce Setup',
        description: 'Professional setup of your online store with up to 100 products.',
        price: 1500,
        category: 'ecommerce',
        isMultiRequest: false
    },
    {
        id: 'analytics-setup',
        name: 'Analytics Setup',
        description: 'Installation and configuration of advanced tracking and reporting tools.',
        price: 800,
        category: 'marketing',
        isMultiRequest: false
    }
];

export const infrastructureServices = [
    {
        id: 'ssl-certificate',
        name: 'SSL Certificate',
        description: 'Secure your website with HTTPS encryption.',
        price: 250,
        category: 'maintenance',
        features: ['Yearly subscription', 'HTTPS encryption', 'Security badge']
    },
    {
        id: 'premium-hosting',
        name: 'Premium Hosting',
        description: 'High-performance hosting for your website.',
        price: 100,
        category: 'maintenance',
        features: ['Monthly subscription', 'High performance', 'Daily backups']
    }
];