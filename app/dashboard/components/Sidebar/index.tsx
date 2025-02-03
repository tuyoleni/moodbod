'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    LayoutDashboard,
    FolderKanban,
    Receipt,
    MessageSquare,
    Settings,
    LogOut,
    Plus,
    Bell
} from 'lucide-react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const links = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
        { href: '/dashboard/billing', label: 'Billing', icon: Receipt },
        { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
        { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* User Profile Section */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    {session?.user?.image ? (
                        <Image
                            src={session.user.image}
                            alt={session.user.name || 'User'}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-600">
                                {session?.user?.name?.[0] || 'U'}
                            </span>
                        </div>
                    )}
                    <div>
                        <h3 className="font-medium">{session?.user?.name}</h3>
                        <p className="text-sm text-gray-600">{session?.user?.email}</p>
                    </div>
                </div>

                {/* New Project Button */}
                <button
                    onClick={() => window.location.href = '/dashboard/new'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-6 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${pathname === link.href
                                    ? 'bg-black text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="p-6 border-t border-gray-200">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-900 w-full rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
} 