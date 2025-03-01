import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import Logo from '../Logo';
import { useScreenSize } from '@/lib/hooks/useScreenSize';

const NavItem = ({ href, icon: Icon, label, isActive, isDesktop }) => {
  const handleClick = (e) => {
    if (href === '/logout') {
      e.preventDefault();
      signOut({ callbackUrl: '/' });
    }
  };

  return (
    <Link href={href} onClick={handleClick} className="w-fit">
      <div className={`flex items-center space-x-3 px-3 py-2 rounded-md mb-1 ${
        isActive 
          ? 'bg-black text-white' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}>
        <Icon size={18} />
        <span className={`${isDesktop ? 'inline-block' : 'hidden'} text-sm font-medium whitespace-nowrap`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default function Sidebar({ sections, currentPath }) {
  const { isDesktop } = useScreenSize();

  return (
    <div className="h-full flex flex-col w-full">
      <div className="p-4 w-full">
        <Logo collapsed={!isDesktop} />
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-4 w-full">
        {sections.map((section, index) => (
          <div key={index} className="w-full">
            {isDesktop ? (
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                {section.title}
              </h3>
            ) : (
              <div className="h-px bg-gray-200 my-2" />
            )}
            <aside>
              {section.items.map((item, itemIndex) => (
                <NavItem 
                  key={itemIndex}
                  {...item}
                  isDesktop={isDesktop}
                  isActive={
                    item.href === currentPath || 
                    (item.href !== currentPath && currentPath.startsWith(item.href))
                  }
                />
              ))}
            </aside>
          </div>
        ))}
      </div>
      
      <div className="mt-auto px-4 py-3 bg-black">
        <NavItem 
          href="/logout"
          icon={LogOut}
          label="Logout"
          isActive={true}
          isDesktop={isDesktop}
        />
      </div>
    </div>
  );
}