import React from 'react';
import Sidebar from '@/components/common/sidebar/Sidebar';
import { clientNavigation } from '@/components/common/sidebar/config';

export default function ClientSidebar({ currentPath = '/dashboard' }) {
  return <Sidebar sections={clientNavigation} currentPath={currentPath} />;
}