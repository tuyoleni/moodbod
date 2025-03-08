'use client';

import AdminSidebar from './components/AdminSidebar';
import { usePathname } from 'next/navigation';

import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <div className="w-auto border-r">
        <AdminSidebar currentPath={pathname || undefined} />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}