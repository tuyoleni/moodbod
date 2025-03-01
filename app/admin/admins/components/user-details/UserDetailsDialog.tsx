'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { getProjectMessages } from "@/lib/services/communicationService";
import { getPaymentsByProject } from "@/lib/services/paymentService";
import { getProjectServices } from "@/lib/services/serviceManagementService";
import { UserProjectsTab } from "./UserProjectsTab";
import { UserPaymentsTab } from "./UserPaymentsTab";
import { UserServicesTab } from "./UserServicesTab";
import { Payment } from "@/lib/types/payment";
import { Service } from "@/lib/types/service";
import { User } from "@/lib/types/user";

interface UserDetailsDialogProps {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
    const [projectPayments, setProjectPayments] = useState<Record<string, Payment[]>>({});
    const [projectServices, setProjectServices] = useState<Record<string, Service[]>>({});
    const [loading, setLoading] = useState(false);

    const fetchProjectDetails = async () => {
        if (!user?.projects) return;
        
        setLoading(true);
        try {
            const [, payments, services] = await Promise.all([
                Promise.all(user.projects.map(p => getProjectMessages(p.id))),
                Promise.all(user.projects.map(p => getPaymentsByProject(p.id))),
                Promise.all(user.projects.map(p => getProjectServices(p.id)))
            ]);

            const paymentsByProject: Record<string, Payment[]> = {};
            const servicesByProject: Record<string, Service[]> = {};

            user.projects.forEach((project, index) => {
                paymentsByProject[project.id] = payments[index] || [];
                servicesByProject[project.id] = services[index] || [];
            });

            setProjectPayments(paymentsByProject);
            setProjectServices(servicesByProject);
        } catch (error) {
            console.error('Error fetching project details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open && user && user.role === 'client' && (user.projects?.length ?? 0) > 0) {
            fetchProjectDetails();
        }
    }, [open, user, fetchProjectDetails]);

    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>User Details - {user.name}</DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="projects" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                    </TabsList>

                    <div className="mt-4">
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