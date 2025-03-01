import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Payment } from "@/lib/types/payment";
import { Project } from "@/lib/types/project";

interface UserPaymentsTabProps {
    projects: Project[];
    payments: Record<string, Payment[]>;
}

export function UserPaymentsTab({ projects, payments }: UserPaymentsTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payments History</CardTitle>
            </CardHeader>
            <CardContent>
                {projects?.map(project => (
                    <div key={project.id} className="mb-6">
                        <h4 className="font-medium mb-2">{project.name}</h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments[project.id]?.map(payment => (
                                    <TableRow key={payment.id}>
                                        <TableCell>${payment.amount}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                payment.status === 'completed' ? 'default' :
                                                payment.status === 'pending' ? 'secondary' :
                                                'destructive'
                                            }>
                                                {payment.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {format(payment.createdAt, 'PP')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}