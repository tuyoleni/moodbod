import { 
  FileText, 
  CreditCard, 
  MessageSquare, 
  BarChart,
  Clock,
  Users,
  Shield,
} from 'lucide-react';

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type NavItem = {
  href: string;
  icon: any;
  label: string;
};

export const clientNavigation: NavSection[] = [
  {
    title: 'Main',
    items: [
      { href: '/dashboard', icon: FileText, label: 'My Projects' },
      { href: '/dashboard/milestones', icon: Clock, label: 'Milestones' },
      { href: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
      { href: '/dashboard/messages', icon: MessageSquare, label: 'Messages' },
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
      { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    ]
  }
];