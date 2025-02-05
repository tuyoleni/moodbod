import { PricingPackage, ProjectType } from '@/lib/types/database';

export const pricingPackages: PricingPackage[] = [
    {
        id: 'basic-website',
        name: 'Basic Single-Page Website',
        description: 'Perfect for individuals or small businesses just starting out.',
        basePrice: 1800,
        category: ProjectType.WEBSITE,
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
        category: ProjectType.WEBSITE,
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
        id: 'ecommerce',
        name: 'E-commerce Website',
        description: 'For businesses ready to sell products online.',
        basePrice: 8000,
        category: ProjectType.ECOMMERCE,
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
        id: 'seo-package',
        name: 'Advanced SEO Package',
        description: 'Comprehensive keyword research and optimization to improve your search rankings.',
        basePrice: 1500,
        category: 'marketing',
        features: ['Keyword research', 'On-page optimization', 'Technical SEO', 'Monthly reports']
    },
    // Add more services as needed
]; 