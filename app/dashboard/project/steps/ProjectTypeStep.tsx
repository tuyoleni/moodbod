'use client';

import { motion } from 'framer-motion';
import { ProjectTypeStepProps } from '@/props/ProjectTypeStepProps';
import { Globe, ShoppingCart, Palette, Sparkles, LucideIcon } from 'lucide-react';
import { projectTypes } from '@/lib/data/projectTypes';
import { ProjectType } from '@/lib/types/database';

export const icons: Record<string, LucideIcon> = {
    Globe,
    ShoppingCart,
    Palette,
    Sparkles
};

export default function ProjectTypeStep({ formData, setFormData, onNext }: ProjectTypeStepProps) {
    const handleSelect = (type: ProjectType) => {
        setFormData({ ...formData, type });
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">What type of project do you need?</h3>
                <p className="text-gray-600">Choose the type of project you want to create.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTypes.map((type) => {
                    const Icon = icons[type.icon];
                    return (
                        <motion.div
                            key={type.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect(type.id as ProjectType)}
                            className={`cursor-pointer p-6 rounded-xl border-2 transition-colors ${formData.type === type.id
                                ? 'border-black bg-black/5'
                                : 'border-gray-200 hover:border-black/20'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {Icon && <Icon className="w-6 h-6" />}
                                <div>
                                    <h4 className="font-medium">{type.name}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
}