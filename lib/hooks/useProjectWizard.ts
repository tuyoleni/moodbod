import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Timestamp } from 'firebase/firestore';
import { Service, PricingPackage, ProjectType, ProjectStatus, Project } from '@/lib/types/database';
import { createProject } from '@/lib/firebase/services/services';
import AddonsStep from '@/app/dashboard/project/steps/AddonsStep';
import PackageSelectionStep from '@/app/dashboard/project/steps/PackageSelectionStep';
import ProjectDetailsStep from '@/app/dashboard/project/steps/ProjectDetailsStep';
import ProjectTypeStep from '@/app/dashboard/project/steps/ProjectTypeStep';
import ProjectReviewStep from '@/app/dashboard/project/steps/ProjectReviewStep';

export function useProjectWizard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    const [projectData, setProjectData] = useState({
        type: '' as ProjectType,
        name: '',
        description: '',
        requirements: '',
        timeline: '',
        budget: '',
        selectedPackage: null as PricingPackage | null,
        additionalServices: [] as Service[],
        projectGoals: [''],
        targetAudience: '',
    });

    const steps = [
        { id: 1, name: 'Project Type', component: ProjectTypeStep },
        { id: 2, name: 'Choose Package', component: PackageSelectionStep },
        { id: 3, name: 'Add-ons', component: AddonsStep },
        { id: 4, name: 'Project Details', component: ProjectDetailsStep },
        { id: 5, name: 'Project Review', component: ProjectReviewStep },
    ];

    const handleCreateProject = async (event?: React.FormEvent | React.MouseEvent) => {
        event?.preventDefault();
        if (!session?.user?.email) {
            toast.error('You must be logged in to create a project');
            return;
        }

        if (!projectData.selectedPackage) {
            toast.error('Please select a package before proceeding');
            return;
        }

        try {
            setIsSubmitting(true);

            const projectPayload: Omit<Project, "id"> = {
                userId: session.user.email,
                type: projectData.type,
                name: projectData.name.trim(),
                description: projectData.description.trim(),
                package: projectData.selectedPackage,
                additionalServices: projectData.additionalServices,
                requirements: projectData.requirements.trim(),
                projectGoals: projectData.projectGoals.map(goal => goal.trim()).filter(goal => goal !== ''),
                targetAudience: projectData.targetAudience.trim(),
                status: ProjectStatus.REQUESTED,
                totalCost: projectData.selectedPackage.basePrice,
                paidAmount: 0,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),

                // Adding missing properties
                feedback: [],
                comments: [],
                milestones: [],
                payments: [],
            };

            await createProject(projectPayload);
            toast.success('Project created successfully');
            router.push('/dashboard');
        } catch (error) {
            console.error('Project creation failed:', error);
            toast.error('An error occurred while creating the project. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return {
        step,
        setStep,
        steps,
        projectData,
        setProjectData,
        isSubmitting,
        handleCreateProject,
    };
}
