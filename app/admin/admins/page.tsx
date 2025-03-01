'use client';

import UsersTable from './components/UsersTable';

export default function AdminsPage() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Management</h1>
            <UsersTable />
        </div>
    );
}