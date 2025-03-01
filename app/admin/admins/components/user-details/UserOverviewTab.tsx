import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { User } from "@/lib/types/user";

interface UserOverviewTabProps {
    user: User;
}

export function UserOverviewTab({ user }: UserOverviewTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium">Name</p>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Email</p>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Role</p>
                        <Badge>{user.role}</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}