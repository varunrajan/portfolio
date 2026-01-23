import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const hoverClasses = hover 
    ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1' 
    : '';
  
  return (
    <div 
      className={`bg-bg-card rounded-lg border border-neutral-800 shadow-md p-lg ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
