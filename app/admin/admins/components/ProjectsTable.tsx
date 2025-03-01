import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project, ProjectStatus } from '@/lib/types';
import { format } from 'date-fns';

interface ProjectsTableProps {
    projects: Project[];
    onStatusUpdate: (projectId: string, status: ProjectStatus) => void;
}

export function ProjectsTable({ projects, onStatusUpdate }: ProjectsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {projects.map((project) => (
                    <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.user?.name}</TableCell>
                        <TableCell>{project.type}</TableCell>
                        <TableCell>
                            <Badge variant={
                                project.status === ProjectStatus.ACTIVE ? 'default' :
                                project.status === ProjectStatus.REQUESTED ? 'secondary' :
                                project.status === ProjectStatus.COMPLETED ? 'outline' :
                                'destructive'
                            }>
                                {project.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {format(project.createdAt.toDate(), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                            <div className="space-x-2">
                                {project.status === ProjectStatus.REQUESTED && (
                                    <>
                                        <Button
                                            size="sm"
                                            onClick={() => onStatusUpdate(project.id, ProjectStatus.ACTIVE)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => onStatusUpdate(project.id, ProjectStatus.REJECTED)}
                                        >
                                            Reject
                                        </Button>
                                    </>
                                )}
                                {project.status === ProjectStatus.ACTIVE && (
                                    <Button
                                        size="sm"
                                        onClick={() => onStatusUpdate(project.id, ProjectStatus.COMPLETED)}
                                    >
                                        Mark Complete
                                    </Button>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                {projects.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                            No projects found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}