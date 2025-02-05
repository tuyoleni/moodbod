'use client';

import { motion } from 'framer-motion';
import { ProjectDetailsStepProps } from '@/props/ProjectDetailsStepProps';

export default function ProjectDetailsStep({ formData, setFormData }: ProjectDetailsStepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="space-y-6">
                {/* Basic Info */}
                <div>
                    <label className="block text-sm font-medium mb-2">Project Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                        placeholder="e.g., Company Website Redesign"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Project Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black min-h-[100px]"
                        placeholder="Brief overview of your project"
                    />
                </div>

                {/* Project Goals */}
                <div>
                    <label className="block text-sm font-medium mb-2">Project Goals</label>
                    <div className="space-y-3">
                        {formData.projectGoals.map((goal, index) => (
                            <input
                                key={index}
                                type="text"
                                value={goal}
                                onChange={(e) => {
                                    const newGoals = [...formData.projectGoals];
                                    newGoals[index] = e.target.value;
                                    setFormData({ ...formData, projectGoals: newGoals });
                                }}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                                placeholder="e.g., Increase online sales by 30%"
                            />
                        ))}
                        <button
                            onClick={() => setFormData({
                                ...formData,
                                projectGoals: [...formData.projectGoals, '']
                            })}
                            className="text-sm text-gray-600 hover:text-black"
                        >
                            + Add another goal
                        </button>
                    </div>
                </div>

                {/* Target Audience */}
                <div>
                    <label className="block text-sm font-medium mb-2">Target Audience</label>
                    <textarea
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                        placeholder="Describe your ideal customers/users"
                    />
                </div>

                {/* Requirements */}
                <div>
                    <label className="block text-sm font-medium mb-2">Specific Requirements</label>
                    <textarea
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black min-h-[100px]"
                        placeholder="Any specific features or requirements for your project"
                    />
                </div>
            </div>
        </motion.div>
    );
}