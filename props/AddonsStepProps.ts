import { Service } from '@/lib/types/database';

export interface AddonsStepProps {
    formData: {
        type: string;
        selectedPackage?: { basePrice: number };
        additionalServices: Service[];
    };
    setFormData: (data: any) => void;
}