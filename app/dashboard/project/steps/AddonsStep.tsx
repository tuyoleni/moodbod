'use client';

import { additionalServices } from '@/lib/data/services';
import { motion } from 'framer-motion';
import { Service, ServiceStatus } from '@/lib/types/database';
import { AddonsStepProps } from '@/props/AddonsStepProps';

export default function AddonsStep({ formData, setFormData }: AddonsStepProps) {
    const relevantServices = additionalServices.filter(service =>
        service.category === formData.type || service.category === 'maintenance'
    );

    const calculateTotal = () => {
        const basePrice = formData.selectedPackage?.basePrice || 0;
        const addonsTotal = formData.additionalServices.reduce(
            (sum, service) => sum + service.basePrice,
            0
        );
        return basePrice + addonsTotal;
    };

    const toggleService = (service: Service) => {
        const isSelected = formData.additionalServices.some((s) => s.id === service.id);
        const updatedServices = isSelected
            ? formData.additionalServices.filter((s) => s.id !== service.id)
            : [...formData.additionalServices, service];

        setFormData({ ...formData, additionalServices: updatedServices });
    };

    return (
        <div className="px-8 py-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Additional Services</h3>
                <p className="text-gray-600">Enhance your project with these add-ons.</p>
                <p className="mt-2 font-medium">Total Price: N${calculateTotal().toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {relevantServices.map((service) => (
                    <motion.div
                        key={service.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleService({ ...service, status: ServiceStatus.PENDING })}
                        className={`cursor-pointer p-6 rounded-xl border-2 transition-colors ${formData.additionalServices.some((s) => s.id === service.id)
                            ? 'border-black bg-black/5'
                            : 'border-gray-200 hover:border-black/20'
                            }`}
                    >
                        <h4 className="font-medium mb-2">{service.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                        <div className="text-xl font-semibold mb-4">
                            N${service.basePrice.toLocaleString()}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {service.features.map((feature, index) => (
                                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}