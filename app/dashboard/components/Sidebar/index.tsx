'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    FolderKanban,
    Receipt,
    MessageSquare,
    Settings,
    LogOut,
    Bell,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useDashboard } from '../DashboardProvider';
import { logo } from '@/public/assets';


export default function Sidebar() {
    const { navigate, loading } = useDashboard();
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-collapse on mobile
    useEffect(() => {
        const handleResize = () => {
            setIsExpanded(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const links = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
        { href: '/dashboard/billing', label: 'Billing', icon: Receipt },
        { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
        { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ];

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/register');
        router.refresh();
    };

    return (
        <aside className={cn(
            "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col justify-between",
            isExpanded ? "w-64" : "w-16",
        )}>
            {/* Navigation */}
            <nav className={cn(
                "flex-1 overflow-y-auto",
                isExpanded ? "p-4" : "p-2",
                "space-y-2"
            )}>
                <div className="">
                    <Link href="/dashboard">
                        <Image
                            src={logo}
                            alt="Moodbod"
                            width={100}
                            height={32}
                            className="w-auto h-6"
                        />
                    </Link>
                </div>

                {/* Profile Section */}
                <div className={
                    "border-b border-gray-200 py-4"}>
                    {isExpanded ? (
                        <div className="flex items-center gap-4">
                            <UserAvatar session={session} />
                            <div className="min-w-0 flex-1">
                                <h2 className="text-sm font-medium text-gray-900 truncate">
                                    {session?.user?.name}
                                </h2>
                                <p className="text-xs text-gray-500 truncate">
                                    {session?.user?.email}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <UserAvatar session={session} />
                    )}
                </div>

                {/* Navigation Links*/}
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            'flex items-center gap-3 rounded-md transition-colors',
                            isExpanded ? 'px-3 py-2' : 'p-2 justify-center',
                            pathname === link.href
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        )}
                        title={!isExpanded ? link.label : undefined}
                    >
                        <link.icon className="h-5 w-5 shrink-0" />
                        {isExpanded && <span className="truncate">{link.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* Actions */}
            <div className={cn(
                "border-t border-gray-200",
                isExpanded ? "p-4" : "p-2"
            )}>
                <button
                    onClick={handleSignOut}
                    className={cn(
                        'flex items-center gap-3 rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        isExpanded ? 'px-3 py-2 w-full' : 'p-2 justify-center w-full'
                    )}
                    title={!isExpanded ? "Sign out" : undefined}
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    {isExpanded && <span>Sign out</span>}
                </button>
            </div>
        </aside>
    );
}

// Helper component for user avatar
function UserAvatar({ session }: { session: any }) {
    return session?.user?.image ? (
        <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            width={40}
            height={40}
            className="rounded-full"
        />
    ) : (
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
                {session?.user?.name?.[0] || 'U'}
            </span>
        </div>
    );
} 