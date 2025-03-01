import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Payment } from "@/lib/types/payment";
import { Project } from "@/lib/types/project";

interface UserPaymentsTabProps {
    projects: Project[];
    payments: Record<string, Payment[]>;
}

export function UserPaymentsTab({ payments }: UserPaymentsTabProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.values(payments).flat().map((payment) => (
                    <TableRow key={payment.id}>
                        <TableCell>{format(new Date(payment.createdAt), 'dd/MM/yyyy')}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}