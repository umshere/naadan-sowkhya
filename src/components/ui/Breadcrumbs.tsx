import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          {items.map((item, index) => (
            <React.Fragment key={item.label}>
              <span className="mx-2">/</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-green-600">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
