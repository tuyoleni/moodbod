'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ProgressBar from './ProgressBar';
import { useProjectWizard } from '@/lib/hooks/useProjectWizard';
import { PricingPackage, ProjectPackage } from '@/lib/types/database';

export default function ProjectWizard() {
    const { step, setStep, steps, projectData, setProjectData, isSubmitting, handleCreateProject } = useProjectWizard();
    const router = useRouter();
    const CurrentStepComponent = steps[step - 1].component;

    return (
        <div className="relative min-h-screen bg-gray-50">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-200 bg-white fixed top-0 w-full z-10 shadow-sm">
                <div className="flex justify-between items-center mb-4 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900">Create New Project</h2>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="text-gray-600 hover:text-black transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
                <ProgressBar steps={steps} currentStep={step} />
            </div>

            {/* Content */}
            <div className="pt-40 pb-24 px-4">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8 max-w-6xl mx-auto"
                >
                    <CurrentStepComponent
                        formData={{
                            ...projectData,
                            selectedPackage: projectData.selectedPackage as (PricingPackage & { basePrice: number } & ProjectPackage)
                        }}
                        setFormData={setProjectData}
                        onNext={() => step < steps.length ? setStep(step + 1) : handleCreateProject()}
                        onBack={() => step > 1 && setStep(step - 1)}
                    />

                </motion.div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <button
                        onClick={() => step > 1 && setStep(step - 1)}
                        className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${step > 1
                            ? 'text-gray-600 hover:text-black hover:bg-gray-50'
                            : 'text-gray-400 cursor-not-allowed'
                            }`}
                        disabled={step === 1}
                    >
                        Back
                    </button>
                    <button
                        onClick={() => step === steps.length ? handleCreateProject() : setStep(step + 1)}
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Creating...' : step === steps.length ? 'Create Project' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
}