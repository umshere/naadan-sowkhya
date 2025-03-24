'use client';

import Link from 'next/link';
import { MenuItem } from '@/data/menuItems';

type DesktopMenuProps = {
  menuItems: MenuItem[];
};

export const DesktopMenu = ({ menuItems }: DesktopMenuProps) => {  
  return (
    <ul className="hidden lg:flex items-center space-x-12">
      {menuItems.map((item) => (
        <li 
          key={item.name} 
          className="relative"
        >
          <Link
            href={item.href}
            className="inline-block font-medium text-white hover:text-white transition-colors duration-300 py-3 text-lg relative group"
          >
            <span className="border-b-2 border-transparent group-hover:border-white transition-all duration-300">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
