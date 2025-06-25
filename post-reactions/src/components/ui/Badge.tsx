import React from 'react';
import { getTagColor } from '../../constants/tagColors';

interface BadgeProps {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  className = ''
}) => {
  // ✅ ARREGLADO: Usar la función helper para obtener el color REAL
  const colorClasses = variant ? getTagColor(variant) : getTagColor('default');

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${colorClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;