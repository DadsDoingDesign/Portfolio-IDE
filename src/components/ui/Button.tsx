"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ide-border-active focus:ring-offset-2 focus:ring-offset-ide-bg-primary';
    
    const variantStyles = {
      primary: 'bg-ide-accent-primary text-ide-text-primary hover:bg-[var(--root-blue-600)]',
      secondary: 'bg-ide-bg-elevated text-ide-text-secondary hover:bg-ide-bg-tertiary',
      ghost: 'bg-transparent text-ide-text-secondary hover:bg-ide-bg-hover',
      danger: 'bg-ide-accent-error text-ide-text-primary hover:opacity-90',
    };
    
    const sizeStyles = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };
    
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
