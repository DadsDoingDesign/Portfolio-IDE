"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import TabBar from './TabBar';
import Panel from './Panel';
import Terminal from './Terminal';
import StatusBar from './StatusBar';
import { useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

interface IDELayoutProps {
  className?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  showMobileMenu?: boolean;
}

export const IDELayout: React.FC<IDELayoutProps> = ({
  className,
  leftContent,
  rightContent,
  showMobileMenu = false
}) => {
  const { isTerminalExpanded, activeTabId, tabs } = useUIStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  
  return (
    <div className={cn(
      'flex flex-col h-screen bg-ide-bg-primary overflow-hidden',
      className
    )}>
      {/* Mobile Header (visible only on small screens) */}
      <div className="md:hidden flex items-center justify-between h-12 px-4 border-b border-ide-border-primary">
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleMobileMenu}
            className="p-1.5 rounded hover:bg-ide-bg-hover text-ide-text-secondary"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-sm font-medium text-ide-text-primary">
            {activeTab?.label || 'IDE Portfolio'}
          </span>
        </div>
      </div>
      
      {/* Tab Bar - Hidden on mobile unless menu is open */}
      <div className={cn(
        'transition-all duration-300 ease-in-out',
        isMobile ? (isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden') : ''
      )}>
        <TabBar />
      </div>
      
      {/* Main Content Area */}
      <div className={cn(
        'flex-1 overflow-hidden transition-all duration-300 ease-in-out',
        isMobile && 'flex flex-col'
      )}>
        <Panel
          leftPanel={
            <div className="p-4">
              {leftContent || <div className="text-ide-text-secondary">Left panel content</div>}
            </div>
          }
          rightPanel={
            <div className="p-4">
              {rightContent || <div className="text-ide-text-secondary">Right panel content</div>}
            </div>
          }
          terminalComponent={<Terminal />}
        />
      </div>
      
      {/* Status Bar - Hidden on very small screens */}
      <div className="border-t border-ide-border-primary hidden sm:block">
        <StatusBar />
      </div>
    </div>
  );
};

export default IDELayout;
