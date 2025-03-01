import React from 'react';

import Sidebar from '@/components/common/sidebar/Sidebar';
import { adminNavigation } from '@/components/common/sidebar/config';

export default function AdminSidebar({ currentPath = '/admin' }) {
  return <Sidebar sections={adminNavigation} currentPath={currentPath} />;
}