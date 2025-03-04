'use client';

import { useState, useEffect, use } from 'react'; // Import use from React
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { MilestoneManagement } from '../components/MilestoneManagement';
import { ServiceManagement } from '../components/ServiceManagement';
import { Project, ProjectStatus } from '@/lib/types';
import { getProjectById, updateProjectStatus } from '@/lib/services/projectService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Fix the params type to match Next.js 13+ App Router expectations
export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params); // Unwrap the params using use()
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
    }, [resolvedParams.id, searchParams]); // Use resolvedParams.id instead of params.id

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

    const handleStatusChange = async (newStatus: ProjectStatus) => {
        if (!project) return;

        try {
            await updateProjectStatus(project.id, newStatus);
            setProject({ ...project, status: newStatus });
            toast.success('Project status updated successfully');
        } catch (error) {
            console.error('Error updating project:', error);
            toast.error('Failed to update project status');
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
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="management">Management</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
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

                <TabsContent value="management" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold">Current Status</h3>
                                <Select
                                    value={project.status}
                                    onValueChange={(value) => handleStatusChange(value as ProjectStatus)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(ProjectStatus).map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
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

                <TabsContent value="milestones" className="space-y-4">
                    <MilestoneManagement projectId={resolvedParams.id} />
                </TabsContent>
            </Tabs>
        </div>
    );
}