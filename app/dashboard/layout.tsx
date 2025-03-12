'use client';

import ClientSidebar from './components/ClientSidebar';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const pathname = usePathname() || '';

  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 h-screen w-48 border-r">
        <ClientSidebar currentPath={pathname} />
      </div>
      <main className="flex-1 pl-48">
        {props.children}
      </main>
    </div>
  );
}