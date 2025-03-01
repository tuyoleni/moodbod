'use client';

import { useState, useEffect } from 'react';
import { fetchAllProjects, updateProjectStatus } from '@/lib/services/projectService';
import { Project, ProjectStatus, ProjectType } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectsTable } from './ProjectsTable';

export default function ProjectsOverview() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | ProjectStatus>('all');
    const [typeFilter, setTypeFilter] = useState<'all' | ProjectType>('all');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const data = await fetchAllProjects();
            setProjects(data);
        } catch (error) {
            console.error('Error loading projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (projectId: string, newStatus: ProjectStatus) => {
        try {
            await updateProjectStatus(projectId, newStatus);
            await loadProjects();
        } catch (error) {
            console.error('Error updating project status:', error);
        }
    };

    const filteredProjects = projects
        .filter(project => {
            if (searchTerm) {
                return project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       project.userId.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return true;
        })
        .filter(project => statusFilter === 'all' || project.status === statusFilter)
        .filter(project => typeFilter === 'all' || project.type === typeFilter);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onValueChange={(value) => setStatusFilter(value as ProjectStatus | 'all')}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            {Object.values(ProjectStatus).map(status => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={typeFilter}
                        onValueChange={(value) => setTypeFilter(value as ProjectType | 'all')}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {Object.values(ProjectType).map(type => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all">All Projects</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <ProjectsTable 
                        projects={filteredProjects}
                        onStatusUpdate={handleStatusUpdate}
                    />
                </TabsContent>

                <TabsContent value="active" className="space-y-4">
                    <ProjectsTable 
                        projects={filteredProjects.filter(p => p.status === ProjectStatus.IN_PROGRESS)}
                        onStatusUpdate={handleStatusUpdate}
                    />
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                    <ProjectsTable 
                        projects={filteredProjects.filter(p => p.status === ProjectStatus.REQUESTED)}
                        onStatusUpdate={handleStatusUpdate}
                    />
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                    <ProjectsTable 
                        projects={filteredProjects.filter(p => p.status === ProjectStatus.COMPLETED)}
                        onStatusUpdate={handleStatusUpdate}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}