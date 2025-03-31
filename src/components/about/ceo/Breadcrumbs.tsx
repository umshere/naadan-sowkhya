"use client";

import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="mb-8 text-sm flex flex-wrap" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="mx-2 text-gray-400">/</span>}
          
          {item.isCurrentPage || !item.href ? (
            <span className="text-primary" aria-current="page">{item.label}</span>
          ) : (
            <Link href={item.href} className="text-gray-500 hover:text-primary">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
