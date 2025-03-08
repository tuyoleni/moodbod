'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { User } from "@/lib/types/user";
import { ServiceStatus } from "@/lib/types";

interface UserProjectsDialogProps {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserProjectsDialog({ user, open, onOpenChange }: UserProjectsDialogProps) {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{user.name}&apos;s Projects</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {user.projects?.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.type}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            project.status === ServiceStatus.DEVELOPMENT ? 'default' :
                                            project.status === ServiceStatus.REQUEST ? 'secondary' :
                                            project.status === ServiceStatus.COMPLETED ? 'outline' :
                                            'destructive'
                                        }>
                                            {project.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {format(project.createdAt.toDate(), 'MMM d, yyyy')}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!user.projects?.length && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                                        No projects found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
}