'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { getProjectMessages } from "@/lib/services/communicationService";
import { getPaymentsByProject } from "@/lib/services/paymentService";
import { getProjectServices } from "@/lib/services/serviceManagementService";
import { UserOverviewTab } from "./UserOverviewTab";
import { UserProjectsTab } from "./UserProjectsTab";
import { UserPaymentsTab } from "./UserPaymentsTab";
import { UserServicesTab } from "./UserServicesTab";
import { UserMessagesTab } from "./UserMessagesTab";
import { Message } from "@/lib/types/communication";
import { Payment } from "@/lib/types/payment";
import { Service } from "@/lib/types/service";
import { User } from "@/lib/types/user";

interface UserDetailsDialogProps {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
    const [activeTab, setActiveTab] = useState("overview");
    const [projectMessages, setProjectMessages] = useState<Record<string, Message[]>>({});
    const [projectPayments, setProjectPayments] = useState<Record<string, Payment[]>>({});
    const [projectServices, setProjectServices] = useState<Record<string, Service[]>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && user && user.role === 'client' && (user.projects?.length ?? 0) > 0) {
            fetchProjectDetails();
        }
    }, [open, user]);

    const fetchProjectDetails = async () => {
        if (!user?.projects) return;
        
        setLoading(true);
        try {
            const [messages, payments, services] = await Promise.all([
                Promise.all(user.projects.map(p => getProjectMessages(p.id))),
                Promise.all(user.projects.map(p => getPaymentsByProject(p.id))),
                Promise.all(user.projects.map(p => getProjectServices(p.id)))
            ]);

            const messagesByProject: Record<string, Message[]> = {};
            const paymentsByProject: Record<string, Payment[]> = {};
            const servicesByProject: Record<string, Service[]> = {};

            user.projects.forEach((project, index) => {
                messagesByProject[project.id] = messages[index] || [];
                paymentsByProject[project.id] = payments[index] || [];
                servicesByProject[project.id] = services[index] || [];
            });

            setProjectMessages(messagesByProject);
            setProjectPayments(paymentsByProject);
            setProjectServices(servicesByProject);
        } catch (error) {
            console.error('Error fetching project details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>User Details - {user.name}</DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                        <TabsTrigger value="messages">Messages</TabsTrigger>
                    </TabsList>

                    <div className="mt-4">
                        <TabsContent value="overview">
                            <UserOverviewTab user={user} />
                        </TabsContent>

                        <TabsContent value="projects">
                            <UserProjectsTab projects={user.projects || []} />
                        </TabsContent>

                        <TabsContent value="services">
                            <UserServicesTab 
                                projects={user.projects || []} 
                                services={projectServices}
                            />
                        </TabsContent>

                        <TabsContent value="payments">
                            <UserPaymentsTab 
                                projects={user.projects || []} 
                                payments={projectPayments}
                            />
                        </TabsContent>

                        <TabsContent value="messages">
                            <UserMessagesTab 
                                projects={user.projects || []} 
                                messages={projectMessages}
                            />
                        </TabsContent>
                    </div>
                </Tabs>

                {loading && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <div className="text-muted-foreground">Loading...</div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}