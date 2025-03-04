'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createProject } from '@/lib/services/projectService';
import { toast } from "sonner";
import { Timestamp } from 'firebase/firestore';
import { useProjectForm } from '@/lib/hooks/useProjectForm';
import { BasicInformation, PackageSelection, ServiceSelection } from './form';
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Project, ProjectStatus, ProjectType } from '@/lib/types';

const steps = [
  { id: 'basic', title: 'Basic Information' },
  { id: 'package', title: 'Package Selection' },
  { id: 'services', title: 'Additional Services' },
];

interface ProjectWizardProps {
  onComplete: () => void;
}

export function ProjectWizard({ onComplete }: ProjectWizardProps) {
  const { session } = useAuth('');
  const [currentStep, setCurrentStep] = useState(0);
  const {
    formData,
    loading,
    setLoading,
    calculateTotalPrice,
    handleFormChange,
    handlePackageSelect,
    handleServiceToggle,
    validateStep
  } = useProjectForm();

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (!session?.user?.id || !formData.name || !formData.package?.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const projectData: Omit<Project, 'id'> = {
        userId: session.user.id,
        name: formData.name,
        description: formData.description || '',
        type: formData.type || ProjectType.WEBSITE,
        totalCost: calculateTotalPrice(),
        status: ProjectStatus.REQUESTED,
        startDate: Timestamp.fromDate(new Date()),
        endDate: Timestamp.fromDate(new Date()),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        requirements: formData.requirements || '',
        projectGoals: formData.projectGoals || [],
        targetAudience: formData.targetAudience || '',
        paidAmount: 0,
        comments: [],
        feedback: [],
        milestones: [],
        payments: [],
        package: {
          id: formData.package.id,
          name: formData.package.name,
          description: formData.package.description || '',
          price: formData.package.price,
          features: formData.package.features || {}
        },
        additionalServices: formData.additionalServices || []
      };

      await createProject(projectData);
      toast.success('Project request submitted successfully');
      onComplete();
    } catch (error) {
      console.error('Project creation error:', error);
      toast.error('Failed to submit project request');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInformation formData={formData} onFormChange={handleFormChange} />;
      case 1:
        return <PackageSelection formData={formData} onPackageSelect={handlePackageSelect} />;
      case 2:
        return <ServiceSelection formData={formData} onServiceToggle={handleServiceToggle} />;
      default:
        return null;
    }
  };

  return (
    <div className="py-4">
      <CardHeader className="px-0">
        <div className="space-y-2">
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>{steps[currentStep].title}</CardDescription>
        </div>
        <Separator className="my-4" />
        <div className="flex gap-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1">
              <div className={`h-2 rounded-full transition-all ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`} />
              <span className={`text-sm mt-2 ${
                index === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </CardHeader>

      <div className="mt-6 space-y-8">
        <div className="min-h-[400px]">
          {renderStep()}
        </div>
        
        {currentStep === steps.length - 1 && (
          <div className="rounded-lg bg-muted p-4">
            <div className="text-xl font-bold">
              Total Price: ${calculateTotalPrice()}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0 || loading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button
            type="button"
            onClick={() => {
              if (currentStep === steps.length - 1) {
                handleSubmit();
              } else {
                handleNext();
              }
            }}
            disabled={loading}
          >
            {currentStep === steps.length - 1 
              ? (loading ? 'Submitting...' : 'Submit Request')
              : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
          </Button>
        </div>
      </div>
    </div>
  );
}