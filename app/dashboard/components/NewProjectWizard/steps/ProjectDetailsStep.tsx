'use client';

import { motion } from 'framer-motion';
import { ProjectType } from '@/lib/types/database';
import { projectTypes } from '@/lib/data/projectTypes';

interface ProjectDetailsStepProps {
    formData: {
        type: ProjectType;
        name: string;
        description: string;
        timeline: string;
        budget: string;
        requirements: string;
        selectedPackage: any;
        additionalServices: any[];
    };
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

const timelineOptions = [
    { value: '1-2 weeks', label: '1-2 weeks' },
    { value: '2-4 weeks', label: '2-4 weeks' },
    { value: '1-2 months', label: '1-2 months' },
    { value: '2-3 months', label: '2-3 months' },
    { value: '3+ months', label: '3+ months' }
];

const budgetOptions = [
    { value: '1000-5000', label: 'N$1,000 - N$5,000' },
    { value: '5000-10000', label: 'N$5,000 - N$10,000' },
    { value: '10000-20000', label: 'N$10,000 - N$20,000' },
    { value: '20000+', label: 'N$20,000+' }
];

export default function ProjectDetailsStep({ formData, setFormData, onNext, onBack }: ProjectDetailsStepProps) {
    const projectType = projectTypes.find(type => type.id === formData.type);
    const totalCost = formData.selectedPackage?.basePrice +
        formData.additionalServices.reduce((sum, service) => sum + service.basePrice, 0);

    return (
        <div className="flex h-full">
            {/* Form Section */}
            <div className="flex-1 px-8 py-6 border-r border-gray-200">
                <div className="max-w-xl">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Project Details</h3>
                        <p className="text-gray-600">Tell us more about your project.</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Project Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                                placeholder="Enter project name"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 h-32"
                                placeholder="Describe your project goals and objectives"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                                    Timeline
                                </label>
                                <select
                                    id="timeline"
                                    required
                                    value={formData.timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                                >
                                    <option value="">Select timeline</option>
                                    {timelineOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                                    Budget Range
                                </label>
                                <select
                                    id="budget"
                                    required
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                                >
                                    <option value="">Select budget</option>
                                    {budgetOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                                Additional Requirements
                            </label>
                            <textarea
                                id="requirements"
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 h-32"
                                placeholder="Any specific requirements or preferences?"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div className="w-80 bg-gray-50 p-8">
                <h4 className="font-medium mb-4">Project Summary</h4>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600">Project Type</p>
                        <p className="font-medium">{projectType?.name}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600">Selected Package</p>
                        <p className="font-medium">{formData.selectedPackage?.name}</p>
                        <p className="text-sm text-gray-600">N${formData.selectedPackage?.basePrice.toLocaleString()}</p>
                    </div>

                    {formData.additionalServices.length > 0 && (
                        <div>
                            <p className="text-sm text-gray-600">Additional Services</p>
                            <ul className="mt-1 space-y-1">
                                {formData.additionalServices.map(service => (
                                    <li key={service.id} className="text-sm">
                                        {service.name} - N${service.basePrice.toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">Total Cost</p>
                        <p className="text-lg font-semibold">N${totalCost?.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 