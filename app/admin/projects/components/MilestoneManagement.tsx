'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Milestone, ServiceStatus } from '@/lib/types';
import { createMilestone, getProjectMilestones, updateMilestoneStatus } from '@/lib/services/milestoneService';
import { toast } from 'sonner';

type MilestoneManagementProps = {
    projectId: string;
}

export function MilestoneManagement({ projectId }: MilestoneManagementProps) {
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        paymentRequired: ''
    });

    useEffect(() => {
        fetchMilestones();
    }, [projectId]);

    const fetchMilestones = async () => {
        try {
            const data = await getProjectMilestones(projectId);
            setMilestones(data);
        } catch (error) {
            console.error('Error fetching milestones:', error);
            toast.error('Failed to load milestones');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const milestone = {
                projectId,
                title: formData.title,
                description: formData.description,
                dueDate: new Date(formData.dueDate),
                paymentRequired: parseFloat(formData.paymentRequired) || 0,
                status: ServiceStatus.PENDING, // Add default status
                updatedAt: serverTimestamp(), // Use serverTimestamp for Firestore compatibility
                updatedBy: 'system' // Or use the current user's ID if available
            };

            await createMilestone(milestone);
            toast.success('Milestone created successfully');
            setShowForm(false);
            setFormData({ title: '', description: '', dueDate: '', paymentRequired: '' });
            fetchMilestones();
        } catch (error) {
            console.error('Error creating milestone:', error);
            toast.error('Failed to create milestone');
        }
    };

    const handleStatusChange = async (milestoneId: string, status: ServiceStatus) => {
        try {
            await updateMilestoneStatus(milestoneId, status);
            toast.success('Milestone status updated');
            fetchMilestones();
        } catch (error) {
            console.error('Error updating milestone status:', error);
            toast.error('Failed to update milestone status');
        }
    };

    if (loading) {
        return <div>Loading milestones...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Project Milestones</h2>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add Milestone'}
                </Button>
            </div>

            {showForm && (
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Milestone Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="number"
                                    placeholder="Payment Amount (if required)"
                                    value={formData.paymentRequired}
                                    onChange={(e) => setFormData({ ...formData, paymentRequired: e.target.value })}
                                />
                            </div>
                            <Button type="submit">Create Milestone</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-4">
                {milestones.length === 0 ? (
                    <p className="text-center text-muted-foreground">No milestones created yet</p>
                ) : (
                    milestones.map((milestone) => (
                        <Card key={milestone.id} className="p-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold">{milestone.title}</h3>
                                    <Select
                                        value={milestone.status}
                                        onValueChange={(value: ServiceStatus) => handleStatusChange(milestone.id, value)}
                                    >
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(ServiceStatus).map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                <div className="flex justify-between text-sm">
                                    <span>Due: {milestone.dueDate.toDate().toLocaleDateString()}</span>
                                    {milestone.paymentRequired && (
                                        <span>Payment: ${milestone.paymentRequired}</span>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}