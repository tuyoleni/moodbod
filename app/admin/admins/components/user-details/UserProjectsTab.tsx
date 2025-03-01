import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Project, ProjectStatus } from "@/lib/types";

interface UserProjectsTabProps {
    projects: Project[];
}

export function UserProjectsTab({ projects }: UserProjectsTabProps) {
    return (
        <div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects?.map(project => (
                            <TableRow key={project.id}>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.type}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        project.status === ProjectStatus.IN_REVIEW ? 'default' :
                                        project.status === ProjectStatus.REQUESTED ? 'secondary' :
                                        project.status === ProjectStatus.COMPLETED ? 'outline' :
                                        'destructive'
                                    }>
                                        {project.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {format(project.createdAt.toDate(), 'PP')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}