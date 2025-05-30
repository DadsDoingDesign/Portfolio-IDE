"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium';
    
    const variantStyles = {
      default: 'bg-ide-bg-elevated text-ide-text-secondary',
      success: 'bg-[rgba(74,222,128,0.2)] text-ide-accent-success',
      warning: 'bg-[rgba(251,191,36,0.2)] text-ide-accent-warning',
      error: 'bg-[rgba(239,68,68,0.2)] text-ide-accent-error',
    };
    
    return (
      <span
        className={cn(baseStyles, variantStyles[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export { Tag };
