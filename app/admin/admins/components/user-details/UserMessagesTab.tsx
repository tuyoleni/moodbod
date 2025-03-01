import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Message, Project } from "@/lib/types";
import { format } from "date-fns";

interface UserMessagesTabProps {
    projects: Project[];
    messages: Record<string, Message[]>;
}



export function UserMessagesTab({ projects, messages }: UserMessagesTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Communication History</CardTitle>
            </CardHeader>
            <CardContent>
                {projects?.map(project => (
                    <div key={project.id} className="mb-6">
                        <h4 className="font-medium mb-2">{project.name}</h4>
                        <div className="space-y-4">
                            {messages[project.id]?.map(message => (
                                <div key={message.id} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-medium">{message.userId}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {format(message.createdAt, 'MMM d, yyyy')}
                                        </span>
                                    </div>
                                    <p className="text-sm">{message.content}</p>
                                </div>
                            ))}
                            {!messages[project.id]?.length && (
                                <div className="text-center py-4 text-muted-foreground">
                                    No messages found for this project
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}