'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { MilestoneManagement } from '../components/MilestoneManagement';
import { ServiceManagement } from '../components/ServiceManagement';
import { Project, ProjectStatus } from '@/lib/types';
import { getProjectById, updateProject } from '@/lib/services/projectService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [adminNotes, setAdminNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProject();
        const statusChanged = searchParams.get('statusChanged');
        const activeTab = searchParams.get('tab');
        
        if (statusChanged === 'true' && activeTab === 'milestones') {
            toast.info('Project status has been updated. Please update the milestones accordingly.');
        }
    }, [resolvedParams.id, searchParams]);
    
    // Auto-save admin notes when changed
    useEffect(() => {
        const saveTimeout = setTimeout(async () => {
            if (!project || adminNotes === project.adminNotes) return;
            
            setIsSaving(true);
            try {
                const updatedProject = {
                    ...project,
                    adminNotes,
                    updatedAt: new Date()
                };
                await updateProject(project.id, updatedProject);
                setProject(updatedProject);
                toast.success('Admin notes saved');
            } catch (error) {
                console.error('Error saving admin notes:', error);
                toast.error('Failed to save admin notes');
                setError('Failed to save admin notes. Please try again.');
            } finally {
                setIsSaving(false);
            }
        }, 1000); // Debounce save for 1 second
    
        return () => clearTimeout(saveTimeout);
    }, [adminNotes, project]);
    const fetchProject = async () => {
        try {
            const projectData = await getProjectById(resolvedParams.id);
            setProject(projectData);
            setAdminNotes(projectData.adminNotes || '');
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
            const updatedProject = {
                ...project,
                status: newStatus,
                adminNotes,
                updatedAt: new Date()
            };
            await updateProject(project.id, updatedProject);
            setProject(updatedProject);
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
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="management">Management</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
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

                            <div className="space-y-2">
                                <h3 className="font-semibold">Admin Notes</h3>
                                <div className="relative">
                                    <Textarea
                                        value={adminNotes}
                                        onChange={(e) => {
                                            setAdminNotes(e.target.value);
                                            setError(null);
                                        }}
                                        placeholder="Add admin notes here..."
                                        rows={4}
                                        disabled={isSaving}
                                    />
                                    {isSaving && (
                                        <div className="absolute right-2 top-2 text-sm text-muted-foreground">
                                            Saving...
                                        </div>
                                    )}
                                    {error && (
                                        <div className="text-sm text-red-500 mt-1">
                                            {error}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="services" className="space-y-4">
                    <ServiceManagement projectId={resolvedParams.id} projectType={project.type} />
                </TabsContent>

                <TabsContent value="milestones" className="space-y-4">
                    <MilestoneManagement projectId={resolvedParams.id} />
                </TabsContent>

                <TabsContent value="payments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Add payment management components here */}
                            <p>Payment management coming soon...</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}