'use client';

import AdminSidebar from './components/AdminSidebar';
import { usePathname } from 'next/navigation';

import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 h-screen w-48 border-r">
      <AdminSidebar currentPath={pathname || undefined} />
      </div>
      <main className="flex-1 pl-48">
        {children}
      </main>
    </div>
  );
}