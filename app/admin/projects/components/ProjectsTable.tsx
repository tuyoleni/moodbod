'use client';

import { useState } from 'react';
import { Project } from '@/lib/types/project';
import { ProjectType, ProjectStatus } from '@/lib/types';
import { updateProject } from '@/lib/services/projectService';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { convertToDate, formatDate } from '@/lib/utils/dateUtils';

interface ProjectsTableProps {
    projects: Project[];
}

export default function ProjectsTable({ projects: initialProjects }: ProjectsTableProps) {
    const router = useRouter();
    const [projects, setProjects] = useState(initialProjects);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (projectId: string, newStatus: ProjectStatus) => {
        setLoading(true);
        try {
            const projectToUpdate = projects.find(p => p.id === projectId);
            if (!projectToUpdate) return;

            await updateProject(projectId, {
                ...projectToUpdate,
                status: newStatus,
                updatedAt: new Date()
            });
            
            setProjects(projects.map(p => 
                p.id === projectId 
                    ? { ...p, status: newStatus }
                    : p
            ));
            
            toast.success('Project status updated successfully');
            router.push(`/admin/projects/${projectId}`);
        } catch (error) {
            console.error('Error updating project status:', error);
            toast.error('Failed to update project status');
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="relative w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProjects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                                    No projects found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProjects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell className="capitalize">{project.type}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {project.status.toLowerCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{project.userId}</TableCell>
                                    <TableCell>
                                        {formatDate(convertToDate(project.createdAt))}  // Ensure valid date
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            onClick={() => router.push(`/admin/projects/${project.id}`)}
                                            disabled={loading}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}