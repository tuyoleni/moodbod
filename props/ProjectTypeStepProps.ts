import { ProjectType } from '@/lib/types/database';

export interface ProjectTypeStepProps {
    formData: {
        type: ProjectType;
    };
    setFormData: (data: any) => void;
    onNext: () => void;
}