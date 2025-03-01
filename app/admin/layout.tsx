'use client';

import AdminSidebar from './components/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <div className="w-auto border-r">
        <AdminSidebar currentPath={pathname} />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}