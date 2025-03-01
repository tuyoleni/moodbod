'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { User } from "@/lib/types/user";

interface UserRoleDialogProps {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (role: 'client' | 'admin') => Promise<void>;
}



export function UserRoleDialog({ user, open, onOpenChange, onSave }: UserRoleDialogProps) {
    const [role, setRole] = useState<'client' | 'admin'>(user?.role || 'client');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        try {
            setIsSubmitting(true);
            await onSave(role);
            onOpenChange(false);
        } catch (error) {
            console.error('Error saving role:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change User Role</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Select value={role} onValueChange={(value) => setRole(value as 'client' | 'admin')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="client">Client</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button 
                        className="w-full" 
                        onClick={handleSave}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}