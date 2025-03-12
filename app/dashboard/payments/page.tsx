'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/lib/types';
import { fetchAllProjects } from '@/lib/services/projectService';
import { getProjectServices } from '@/lib/services/serviceManagementService';
import { toast } from 'sonner';
import PaymentsTable from './components/PaymentsTable';

export default function PaymentsPage() {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      const projectsData = await fetchAllProjects();
      const projectsWithServices = await Promise.all(
        projectsData.map(async (project) => {
          const services = await getProjectServices(project.id);
          return { ...project, services };
        })
      );
      setProjects(projectsWithServices);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handlePayment = async (
    projectId: string,
    amount: number,
    isService: boolean = false,
    serviceId?: string
  ) => {
    setProcessingPayment(serviceId || projectId);
    try {
      // TODO: Integrate with your payment gateway here
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Payment processed successfully');
      loadProjects();
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessingPayment(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium tracking-tight">Payments</h1>
      </div>
      <PaymentsTable
        projects={projects}
        onPayment={handlePayment}
        processingPayment={processingPayment}
      />
    </div>
  );
}
