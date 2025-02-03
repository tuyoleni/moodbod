import { Service, PricingPackage } from '@/lib/types/database';

export const websitePackages: PricingPackage[] = [
    {
        id: 'basic-website',
        name: 'Basic Single-Page Website',
        description: 'Perfect for individuals or small businesses just starting out.',
        basePrice: 1800,
        category: 'website',
        features: [
            'Simple one-page design',
            'Mobile-friendly (responsive design)',
            'Basic contact form',
            '2 revisions',
            'Social media links',
            'Basic SEO setup'
        ]
    },
    {
        id: 'standard-website',
        name: 'Standard Website',
        description: 'Ideal for growing businesses looking for more features.',
        basePrice: 4500,
        category: 'website',
        features: [
            'Up to 3 pages',
            'Custom design',
            'Mobile-friendly (responsive design)',
            'Contact form',
            '3 revisions',
            'Social media integration',
            'Basic SEO setup'
        ]
    },
    {
        id: 'ecommerce-website',
        name: 'E-commerce Website',
        description: 'For businesses ready to sell products online.',
        basePrice: 8000,
        category: 'ecommerce',
        features: [
            'Up to 5 pages',
            'Custom design for online store',
            'Product listings (up to 30 products)',
            'Shopping cart functionality',
            'Basic payment gateway setup',
            'Mobile-friendly design',
            '4 revisions',
            'Basic SEO setup'
        ]
    }
];

export const additionalServices = [
    {
        id: 'additional-pages',
        name: 'Additional Website Pages',
        description: 'Expand your website with up to 5 additional pages of custom content.',
        basePrice: 500,
        category: 'website',
        features: ['Custom design', 'Content integration', 'Mobile responsive']
    },
    {
        id: 'advanced-seo',
        name: 'Advanced SEO Package',
        description: 'Comprehensive keyword research and optimization to improve your search rankings.',
        basePrice: 1500,
        category: 'marketing',
        features: ['Keyword research', 'On-page optimization', 'Monthly reports']
    },
    {
        id: 'branding-package',
        name: 'Business Branding Package',
        description: 'Comprehensive branding including logo design, color palette, and brand guidelines.',
        basePrice: 2500,
        category: 'branding',
        features: ['Logo design', 'Color palette', 'Brand guidelines']
    },
    {
        id: 'content-writing',
        name: 'Content Writing & Strategy',
        description: 'Professional content creation to engage your target audience.',
        basePrice: 300,
        category: 'marketing',
        features: ['SEO-optimized content', 'Professional writing', 'Per page pricing']
    },
    {
        id: 'extra-revisions',
        name: 'Extra Design Revisions',
        description: 'Additional design adjustments beyond the included revision rounds.',
        basePrice: 250,
        category: 'website',
        features: ['Per revision pricing', 'Quick turnaround', 'Unlimited changes']
    },
    {
        id: 'priority-support',
        name: 'Priority Support',
        description: 'Fast-track support with priority response for your website needs.',
        basePrice: 300,
        category: 'maintenance',
        features: ['Monthly subscription', 'Priority response', 'Direct support']
    },
    {
        id: 'website-maintenance',
        name: 'Website Maintenance',
        description: 'Regular updates, backups, and technical maintenance of your site.',
        basePrice: 600,
        category: 'maintenance',
        features: ['Regular updates', 'Daily backups', 'Security monitoring']
    },
    {
        id: 'ecommerce-setup',
        name: 'E-commerce Setup',
        description: 'Professional setup of your online store with up to 100 products.',
        basePrice: 1500,
        category: 'ecommerce',
        features: ['Product setup', 'Category organization', 'Payment integration']
    },
    {
        id: 'analytics-setup',
        name: 'Analytics Setup',
        description: 'Installation and configuration of advanced tracking and reporting tools.',
        basePrice: 800,
        category: 'marketing',
        features: ['Google Analytics setup', 'Custom reporting', 'Goal tracking']
    }
];

export const infrastructureServices = [
    {
        id: 'ssl-certificate',
        name: 'SSL Certificate',
        description: 'Secure your website with HTTPS encryption.',
        basePrice: 250,
        category: 'maintenance',
        features: ['Yearly subscription', 'HTTPS encryption', 'Security badge']
    },
    {
        id: 'premium-hosting',
        name: 'Premium Hosting',
        description: 'High-performance hosting for your website.',
        basePrice: 100,
        category: 'maintenance',
        features: ['Monthly subscription', 'High performance', 'Daily backups']
    }
]; 