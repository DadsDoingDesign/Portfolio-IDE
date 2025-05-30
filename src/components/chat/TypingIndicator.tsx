"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className }) => {
  return (
    <div 
      className={cn("text-ide-text-secondary pl-4", className)} 
      aria-live="polite" 
      aria-label="Assistant is typing"
    >
      <span className="inline-block w-1.5 h-3 bg-ide-text-secondary animate-pulse rounded-sm mr-1"></span>
      <span 
        className="inline-block w-1.5 h-3 bg-ide-text-secondary animate-pulse rounded-sm mr-1" 
        style={{ animationDelay: '0.2s' }}
      ></span>
      <span 
        className="inline-block w-1.5 h-3 bg-ide-text-secondary animate-pulse rounded-sm" 
        style={{ animationDelay: '0.4s' }}
      ></span>
    </div>
  );
};

export default TypingIndicator;
