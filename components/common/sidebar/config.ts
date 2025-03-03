import { 
  FileText, 
  CreditCard, 
  MessageSquare, 
  BarChart,
  Clock,
  Shield,
  Bell,
} from 'lucide-react';

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type NavItem = {
  href: string;
  icon: React.ComponentType;
  label: string;
};

export const clientNavigation: NavSection[] = [
  {
    title: 'Main',
    items: [
      { href: '/dashboard', icon: FileText, label: 'My Projects' },
      { href: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
      { href: '/dashboard/notification', icon: Bell, label: 'Notification' },
    ]
  }
];

export const adminNavigation: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { href: '/admin', icon: BarChart, label: 'Analytics' },
      { href: '/admin/admins', icon: Shield, label: 'Admins' },
    ]
  },
  {
    title: 'Project Management',
    items: [
      { href: '/admin/projects', icon: FileText, label: 'Projects' },
      { href: '/admin/payments', icon: CreditCard, label: 'Payments' },
      { href: '/admin/notification', icon: Bell, label: 'Notification' },
    ]
  }
];