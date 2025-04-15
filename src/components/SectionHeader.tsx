import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  underline?: boolean;
  underlineColor?: string;
  className?: string;
  children?: React.ReactNode;
}

const alignmentMap = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'center',
  underline = true,
  underlineColor,
  className = '',
  children,
}) => {
  const underlineStyle = underlineColor
    ? { backgroundColor: underlineColor }
    : {};

  return (
    <div className={`flex flex-col ${alignmentMap[align]} my-8 ${className}`}>
      <h2 className="text-2xl font-bold text-green-900">{title}</h2>
      {underline && (
        <div
          className="mt-2 mb-2 h-1 w-16 rounded mx-auto"
          style={underlineColor ? underlineStyle : { backgroundColor: '#166534' }}
        />
      )}
      {subtitle && (
        <div className="mt-1 text-base text-gray-700 max-w-xl mx-auto">{subtitle}</div>
      )}
      {children}
    </div>
  );
};

export default SectionHeader;
