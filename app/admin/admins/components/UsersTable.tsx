'use client';

import { useState, useEffect } from 'react';
import { fetchUsers, fetchUsersByRole, searchUsers, deleteUser, updateUser } from '@/lib/services/userService';
import { fetchUserProjects } from '@/lib/services/projectService';
import { User } from '@/lib/types/user';
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow 
} from '@/components/ui/table';

type UserWithProjects = User & { projects: any[] };

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { MoreVertical, Search } from 'lucide-react';
import { format } from 'date-fns';
import { UserDetailsDialog } from './user-details/UserDetailsDialog';
import { UserEditDialog } from './UserEditDialog';
import { UserRoleDialog } from './UserRoleDialog';
import { UserProjectsDialog } from './UserProjectsDialog';

export default function UsersTable() {
    const [users, setUsers] = useState<UserWithProjects[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserWithProjects | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
    const [isProjectsDialogOpen, setIsProjectsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | User['role']>('all');

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const data = await fetchUsers();
            const usersWithProjects = await Promise.all(
                data.map(async (user) => {
                    if (user.role === 'client') {
                        const projects = await fetchUserProjects(user.id);
                        return { ...user, projects };
                    }
                    return { ...user, projects: [] };
                })
            );
            setUsers(usersWithProjects);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleFilterChange = async (role: typeof roleFilter) => {
        setRoleFilter(role);
        setLoading(true);
        try {
            if (role === 'all') {
                await fetchAllUsers();
            } else {
                const filteredUsers = await fetchUsersByRole(role);
                const usersWithProjects = filteredUsers.map(user => ({ ...user, projects: user.projects || [] }));
                setUsers(usersWithProjects);
            }
        } catch (error) {
            console.error('Error filtering users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (newRole: User['role']) => {
        try {
            if (selectedUser) {
                await updateUser(selectedUser.id, { role: newRole });
                await fetchAllUsers();
                setIsRoleDialogOpen(false);
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (term.length === 0) {
            fetchAllUsers();
            return;
        }
        try {
            const results = await searchUsers(term);
            const usersWithProjects = results.map(user => ({ ...user, projects: user.projects || [] }));
            setUsers(usersWithProjects);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(userId);
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleUpdateUser = async (userData: User) => {
        try {
            await updateUser(userData.id, userData);
            await fetchAllUsers();
            setIsEditOpen(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Select
                        value={roleFilter}
                        onValueChange={(value) =>
                            handleRoleFilterChange(value as 'client' | 'admin' | 'all')
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="client">Clients</SelectItem>
                            <SelectItem value="admin">Admins</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Projects</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-4">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-4">
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="capitalize">{user.role}</TableCell>
                                    <TableCell>
                                        {user.role !== 'admin' ? user.projects?.length || 0 : '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        if (user.role === 'client') {
                                                            setSelectedUser(user);
                                                            setIsViewOpen(true);
                                                        }
                                                    }}
                                                >
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsRoleDialogOpen(true);
                                                    }}
                                                >
                                                    Change Role
                                                </DropdownMenuItem>
                                                {user.role === 'client' && (
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setIsProjectsDialogOpen(true);
                                                        }}
                                                    >
                                                        View Projects
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    Delete User
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <UserRoleDialog 
                user={selectedUser}
                open={isRoleDialogOpen}
                onOpenChange={setIsRoleDialogOpen}
                onSave={handleRoleChange}
            />
            <UserProjectsDialog
                user={selectedUser}
                open={isProjectsDialogOpen}
                onOpenChange={setIsProjectsDialogOpen}
            />
            {selectedUser && (
                <UserDetailsDialog 
                    user={selectedUser}
                    open={isViewOpen}
                    onOpenChange={setIsViewOpen}
                />
            )}
            <UserEditDialog
                user={selectedUser}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onSave={handleUpdateUser}
            />
        </div>
    );
}