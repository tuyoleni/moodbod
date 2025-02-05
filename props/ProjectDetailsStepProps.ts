import { ProjectType } from '@/lib/types/database';

export interface ProjectDetailsStepProps {
    formData: {
        type: ProjectType;
        name: string;
        description: string;
        requirements: string;
        projectGoals: string[];
        targetAudience: string;
    };
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}