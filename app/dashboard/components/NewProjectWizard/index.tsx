'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { createProject } from '@/lib/firebase/services/projects';
import ProjectTypeStep from './steps/ProjectTypeStep';
import PackageSelectionStep from './steps/PackageSelectionStep';
import AddonsStep from './steps/AddonsStep';
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import ProgressBar from './ProgressBar';
import { Service, PricingPackage, ProjectType } from '@/lib/types/database';

interface NewProjectWizardProps { }

export default function NewProjectWizard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [projectData, setProjectData] = useState({
        type: '' as ProjectType,
        name: '',
        description: '',
        timeline: '',
        budget: '',
        selectedPackage: null as PricingPackage | null,
        additionalServices: [] as Service[],
        requirements: '',
    });

    const steps = [
        { id: 1, name: 'Project Type', component: ProjectTypeStep },
        { id: 2, name: 'Choose Package', component: PackageSelectionStep },
        { id: 3, name: 'Add-ons', component: AddonsStep },
        { id: 4, name: 'Project Details', component: ProjectDetailsStep }
    ];

    const currentStep = steps.find(s => s.id === step);

    const handleCreateProject = async () => {
        if (!session?.user?.email || !projectData.selectedPackage) {
            toast.error('Missing required information');
            return;
        }

        try {
            setIsSubmitting(true);
            await createProject({
                userId: session.user.email,
                ...projectData,
                selectedPackage: projectData.selectedPackage
            });
            toast.success('Project created successfully');
            router.push('/dashboard');
        } catch (error) {
            console.error('Error creating project:', error);
            toast.error('Failed to create project');
        } finally {
            setIsSubmitting(false);
        }
    };

    return <div className="fixed inset-y-0 right-0 w-[800px] bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New Project</h2>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="text-gray-600 hover:text-black"
                >
                    Cancel
                </button>
            </div>
            <ProgressBar steps={steps} currentStep={step} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
            {currentStep && (
                <currentStep.component
                    formData={projectData}
                    setFormData={setProjectData}
                    onNext={() => setStep(step + 1)}
                    onBack={() => step > 1 && setStep(step - 1)}
                />
            )}
        </div>
    </div>

    {/* Footer */ }
    <div className="px-8 py-6 border-t border-gray-200 bg-white">
        <div className="flex justify-between">
            <button
                onClick={() => step > 1 && setStep(step - 1)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${step > 1
                    ? 'text-gray-600 hover:text-black'
                    : 'text-gray-400 cursor-not-allowed'
                    }`}
                disabled={step === 1}
            >
                Back
            </button>
            <button
                onClick={() => {
                    if (step === steps.length) {
                        handleCreateProject();
                    } else {
                        setStep(step + 1);
                    }
                }}
                disabled={isSubmitting}
                className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50"
            >
                {isSubmitting ? 'Creating...' : step === steps.length ? 'Create Project' : 'Next'}
            </button>
        </div>
    </div>
} 