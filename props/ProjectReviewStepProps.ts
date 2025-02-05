import { ProjectPackage, ProjectType, Service } from '@/lib/types/database';

export interface ProjectReviewStepProps {
    formData: {
        type: ProjectType;
        name: string;
        description: string;
        requirements: string;
        projectGoals: string[];
        targetAudience: string;
        selectedPackage: ProjectPackage;
        additionalServices: Service[];
    };
    onNext: () => void;
    onBack: () => void;
}