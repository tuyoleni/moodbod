import { PricingPackage } from '@/lib/types/database';

export interface PackageSelectionStepProps {
    formData: {
        type: string;
        selectedPackage?: PricingPackage;
    };
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}
