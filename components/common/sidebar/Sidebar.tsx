'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from '../Logo';
import CurrencySelector from '../CurrencySelector';
import type { NavSection } from './config';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { getUserById } from '@/lib/services/userService';
import { useEffect, useState } from 'react';
import type { User as UserType } from '@/lib/types/user';
import { Badge } from '@/components/ui/badge';

interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ href, icon: Icon, label, isActive }: NavItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (href === '/logout') {
      e.preventDefault();
      signOut({ callbackUrl: '/' });
    }
  };

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        'w-full justify-start',
        isActive && 'bg-accent text-accent-foreground'
      )}
    >
      <Link href={href} onClick={handleClick}>
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
};

interface SidebarProps {
  sections: NavSection[];
  currentPath: string;
}


export default function Sidebar({ sections = [], currentPath = '/' }: SidebarProps) {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.email) {
        const userData = await getUserById(session.user.email);
        setUser(userData);
      }
    };
    fetchUser();
  }, [session]);

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="px-4 py-3 pt-9">
        <Logo />
      </div>

      {user && (
        <div className="px-4">
          <div className="flex items-center gap-3">
            <Avatar>
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 px-2">
        {sections.map((section, index) => (
          <div key={index} className="space-y-4 mb-12">
            <h2 className="px-2 text-xs font-semibold tracking-tight text-muted-foreground">
              {section.title}
            </h2>
            <nav className="flex flex-col gap-1">
              {section.items.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  isActive={currentPath === item.href}
                />
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <CurrencySelector />
        
        <div className="px-2 py-2 border-t">
          <NavItem
            href="/logout"
            icon={LogOut}
            label="Logout"
          />
        </div>
      </div>
    </div>
  );
}
