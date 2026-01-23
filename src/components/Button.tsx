import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center px-lg py-md rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-accent text-bg-page hover:bg-accent-hover focus:ring-accent',
    secondary: 'bg-neutral-800 text-text-heading hover:bg-neutral-700 focus:ring-neutral-600 border border-neutral-700',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
