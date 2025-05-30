"use client";

import React from 'react';
import { Wifi, Clock, Circle } from 'lucide-react';
import { useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface StatusBarProps {
  className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ className }) => {
  const { activeTabId, tabs } = useUIStore();
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  
  // Get current time in format HH:MM
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  return (
    <div 
      className={cn(
        'h-8 bg-ide-bg-secondary border-t border-ide-border-primary flex items-center px-4 text-xs text-ide-text-secondary',
        className
      )}
    >
      {/* Left section - Current tab info */}
      <div className="flex-1 flex items-center">
        <Circle size={8} className="text-ide-accent-success mr-2" />
        <span>{activeTab?.label || 'No active tab'}</span>
        <span className="mx-2">|</span>
        <span>TypeScript</span>
      </div>
      
      {/* Center section - Status message */}
      <div className="flex-1 text-center">
        IDE Portfolio - Ready
      </div>
      
      {/* Right section - Indicators */}
      <div className="flex-1 flex items-center justify-end space-x-4">
        <div className="flex items-center">
          <Wifi size={12} className="mr-1" />
          <span>Connected</span>
        </div>
        
        <div className="flex items-center">
          <Clock size={12} className="mr-1" />
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
