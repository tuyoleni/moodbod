import { websitePackages } from '@/lib/data/services';
import { motion } from 'framer-motion';
import { PricingPackage } from '@/lib/types/database';
import { Check } from 'lucide-react';

interface PackageSelectionStepProps {
    formData: any;
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function PackageSelectionStep({ formData, setFormData, onNext }: PackageSelectionStepProps) {
    const relevantPackages = websitePackages.filter(pkg => pkg.category === formData.type);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Choose a Package</h3>
                <p className="text-gray-600">Select the package that best fits your needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relevantPackages.map((pkg: PricingPackage) => (
                    <motion.div
                        key={pkg.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            setFormData({ ...formData, selectedPackage: pkg });
                            onNext();
                        }}
                        className={`cursor-pointer p-6 rounded-xl border-2 transition-colors ${formData.selectedPackage?.id === pkg.id
                                ? 'border-black bg-black/5'
                                : 'border-gray-200 hover:border-black/20'
                            }`}
                    >
                        <h4 className="font-medium text-lg mb-2">{pkg.name}</h4>
                        <p className="text-gray-600 mb-4">{pkg.description}</p>
                        <div className="text-2xl font-semibold mb-4">
                            N${pkg.basePrice.toLocaleString()}
                        </div>
                        <ul className="space-y-2">
                            {pkg.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 