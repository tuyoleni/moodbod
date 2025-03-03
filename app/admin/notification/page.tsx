'use client';
import { NotificationCenter } from "../components/NotificationCenter";


export default function AdminDashboard() {
    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">Notification</h1>
            <NotificationCenter />
        </div>
    );
}