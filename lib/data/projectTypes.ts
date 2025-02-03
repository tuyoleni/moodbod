import { ProjectType } from '@/lib/types/database';

export const projectTypes = [
    {
        id: 'website',
        name: 'Website',
        description: 'Create a professional website for your business',
        icon: 'Globe'
    },
    {
        id: 'ecommerce',
        name: 'E-commerce',
        description: 'Build an online store to sell your products',
        icon: 'ShoppingCart'
    },
    {
        id: 'branding',
        name: 'Branding',
        description: 'Develop your brand identity with logo, colors, and guidelines',
        icon: 'Palette'
    },
    {
        id: 'custom',
        name: 'Custom Project',
        description: "Have a unique project in mind? Let's discuss your specific needs",
        icon: 'Sparkles'
    }
] as const;

export type ProjectTypeId = typeof projectTypes[number]['id']; 