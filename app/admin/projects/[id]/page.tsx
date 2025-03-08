'use client';

import { useState, useEffect, use } from 'react'; // Import use from React
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { MilestoneManagement } from '../components/MilestoneManagement';
import { ServiceManagement } from '../components/ServiceManagement';
import { Project, ServiceStatus } from '@/lib/types';
import { getProjectById, updateProjectStatus } from '@/lib/services/projectService';
import { createMilestone } from '@/lib/services/milestoneService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { serverTimestamp } from 'firebase/firestore';

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProject();
        const statusChanged = searchParams?.get('statusChanged');
        const activeTab = searchParams?.get('tab');
        
        if (statusChanged === 'true' && activeTab === 'milestones') {
            toast.info('Project status has been updated. Please update the milestones accordingly.');
        }
    }, [resolvedParams.id, searchParams]);

    const fetchProject = async () => {
        try {
            const projectData = await getProjectById(resolvedParams.id); // Use resolvedParams.id
            setProject(projectData);
        } catch (error) {
            console.error('Error fetching project:', error);
            toast.error('Failed to load project details');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus: ServiceStatus) => {
        if (!project) return;
    
        try {
            await updateProjectStatus(project.id, newStatus);
            
            // Create milestone based on the new status
            const milestone = {
                projectId: project.id,
                title: `${newStatus} Phase`,
                description: getStatusDescription(newStatus),
                paymentRequired: calculatePaymentForStatus(newStatus, project.totalCost),
                status: newStatus,
                updatedAt: serverTimestamp(),
                updatedBy: 'system',
                revisionsAllowed: 2,
                revisionsUsed: 0,
                feedback: []
            };
    
            await createMilestone({
                ...milestone,
                createdAt: serverTimestamp()
            });
            setProject({ ...project, status: newStatus });
            toast.success('Project status and milestone updated successfully');
            
            router.push(`/admin/projects/${project.id}?statusChanged=true&tab=milestones`);
        } catch (error) {
            console.error('Error updating project:', error);
            toast.error('Failed to update project status');
        }
    };
    
    const getStatusDescription = (status: ServiceStatus) => {
        const clientName = project?.user?.name || project?.userId || 'Client';
        switch (status) {
            case ServiceStatus.REQUEST:
                return `Dear ${clientName}, Thank you for submitting your project "${project?.name}". We will review your request shortly.`;
            case ServiceStatus.ANALYZING:
                return `Dear ${clientName}, We are currently analyzing your project "${project?.name}" requirements and will provide feedback soon.`;
            case ServiceStatus.PAYMENT_PENDING:
                return `Dear ${clientName}, We have reviewed your project "${project?.name}", and we require a 30% deposit to begin working on the project. Please check your dashboard for payment details.`;
            case ServiceStatus.PLANNING:
                return `Dear ${clientName}, We are now planning the development approach for "${project?.name}". We will keep you updated on our progress.`;
            case ServiceStatus.DEVELOPMENT:
                return `Project "${project?.name}" has entered the development phase. Our team is now working on implementing the requested features.`;
            case ServiceStatus.REVIEW:
                return `Dear ${clientName}, We have completed a development milestone for "${project?.name}" and are currently reviewing it. We will update you on the progress through your dashboard.`;
            case ServiceStatus.TESTING:
                return `Project "${project?.name}" is now in the testing phase. We are conducting thorough testing to ensure quality.`;
            case ServiceStatus.COMPLETED:
                return `Congratulations! Project "${project?.name}" has been completed. Please review the final deliverables in your dashboard.`;
            default:
                return `Project "${project?.name}" has entered the ${status.toLowerCase()} phase.`;
        }
    };
    
    const calculatePaymentForStatus = (status: ServiceStatus, totalCost: number) => {
        switch (status) {
            case ServiceStatus.PAYMENT_PENDING:
                return totalCost * 0.3; // 30% deposit
            default:
                return 0;
        }
    };

    if (loading) {
        return <div className="p-4">Loading project details...</div>;
    }

    if (!project) {
        return <div className="p-4">Project not found</div>;
    }

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Project Management</h1>
                <Button variant="outline" onClick={() => router.back()}>
                    Back to Projects
                </Button>
            </div>

            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="project-management">Project Management</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Project Name</h3>
                                <p>{project.name}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Description</h3>
                                <p>{project.description}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Type</h3>
                                <p>{project.type}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Client ID</h3>
                                <p>{project.userId}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Package Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Selected Package</h3>
                                <p>{project.package?.name}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Package Price</h3>
                                <p>${project.package?.price}</p>
                            </div>
                            {project.package?.features && (
                                <div>
                                    <h3 className="font-semibold">Features</h3>
                                    <ul className="list-disc list-inside">
                                        {Object.entries(project.package.features).map(([key, value]) => (
                                            <li key={key}>{`${key}: ${value}`}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="project-management" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold">Current Status</h3>
                                <Select
                                    value={project.status}
                                    onValueChange={(value) => handleStatusChange(value as ServiceStatus)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(ServiceStatus).map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                    <MilestoneManagement projectId={resolvedParams.id} />
                </TabsContent>

                <TabsContent value="services" className="space-y-4">
                    <ServiceManagement 
                        key={resolvedParams.id}
                        {...{
                            projectId: resolvedParams.id,
                            projectType: project.type
                        }}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}