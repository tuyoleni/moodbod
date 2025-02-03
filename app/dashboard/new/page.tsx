'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import AddonsStep from '../components/NewProjectWizard/steps/AddonsStep';
import PackageSelectionStep from '../components/NewProjectWizard/steps/PackageSelectionStep';
import ProjectDetailsStep from '../components/NewProjectWizard/steps/ProjectDetailsStep';
import ProjectTypeStep from '../components/NewProjectWizard/steps/ProjectTypeStep';
import { ProjectType } from '@/lib/types/database';


export default function NewProjectPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        description: '',
        timeline: '',
        budget: '',
        selectedPackage: null,
        additionalServices: [],
        requirements: ''
    });

    const steps = [
        { id: 1, name: 'Project Type', component: ProjectTypeStep },
        { id: 2, name: 'Package Selection', component: PackageSelectionStep },
        { id: 3, name: 'Add-ons', component: AddonsStep },
        { id: 4, name: 'Project Details', component: ProjectDetailsStep }
    ];

    const CurrentStep = steps[step - 1].component;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
                <h1 className="text-2xl font-semibold">Create New Project</h1>
                <p className="text-gray-600 mt-1">Let's create something amazing together</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {steps.map((s, i) => (
                        <div key={s.id} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${step > s.id ? 'bg-green-500 text-white' :
                                    step === s.id ? 'bg-black text-white' :
                                        'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                {step > s.id ? '✓' : s.id}
                            </div>
                            <span className="ml-2 text-sm font-medium">{s.name}</span>
                            {i < steps.length - 1 && (
                                <div className={`w-24 h-1 mx-4 ${step > s.id + 1 ? 'bg-green-500' :
                                    'bg-gray-200'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-8"
            >
                <CurrentStep
                    formData={{
                        ...formData,
                        type: formData.type as ProjectType
                    }}
                    setFormData={setFormData}
                    onNext={() => step < steps.length && setStep(step + 1)}
                    onBack={() => step > 1 && setStep(step - 1)}
                />
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={() => step > 1 && setStep(step - 1)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg ${step === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:text-black'
                        }`}
                    disabled={step === 1}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </button>
                <button
                    onClick={() => step < steps.length ? setStep(step + 1) : null}
                    className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
                >
                    {step === steps.length ? 'Create Project' : 'Next'}
                    {step < steps.length && <ArrowRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
} 