import { ProjectType } from '@/lib/types/database';

export const projectTypes: { id: ProjectType; name: string; description: string; icon: string }[] = [
    {
        id: ProjectType.WEBSITE,
        name: 'Website',
        description: 'Build a responsive website',
        icon: 'Globe'
    },
    {
        id: ProjectType.ECOMMERCE,
        name: 'E-commerce',
        description: 'Create an online store',
        icon: 'ShoppingCart'
    },
    {
        id: ProjectType.BRANDING,
        name: 'Branding',
        description: 'Design a unique brand identity',
        icon: 'Palette'
    },
    {
        id: ProjectType.MARKETING,
        name: 'Marketing',
        description: 'Promote your product or service',
        icon: 'Sparkles'
    }
];