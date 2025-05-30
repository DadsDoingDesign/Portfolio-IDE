"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PanelProps {
  className?: string;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  terminalComponent?: React.ReactNode; // Terminal component to render below left panel
}

export const Panel: React.FC<PanelProps> = ({
  className,
  leftPanel,
  rightPanel,
  terminalComponent
}) => {
  const { leftPanelWidth, setLeftPanelWidth } = useUIStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobilePanel, setActiveMobilePanel] = useState<'left' | 'right'>('left');
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDoubleClick = () => {
    // Reset to default width on double click
    setLeftPanelWidth(60);
  };
  
  useEffect(() => {
    const handleDrag = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;
      
      // Calculate new width as percentage
      const newWidth = (mouseX / containerWidth) * 100;
      setLeftPanelWidth(newWidth);
    };
    
    const handleDragEnd = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, setLeftPanelWidth]);
  
  // Toggle active panel on mobile
  const toggleMobilePanel = () => {
    setActiveMobilePanel(activeMobilePanel === 'left' ? 'right' : 'left');
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative w-full h-full overflow-hidden',
        !isMobile && 'flex',
        isDragging && 'select-none',
        className
      )}
    >
      {/* Mobile panel switcher - only visible on mobile */}
      {isMobile && (
        <div className="flex justify-center py-2 border-b border-ide-border-primary">
          <button 
            onClick={toggleMobilePanel}
            className="flex items-center space-x-2 px-3 py-1.5 rounded bg-ide-bg-secondary text-ide-text-secondary text-sm"
          >
            <span>Show {activeMobilePanel === 'left' ? 'Preview' : 'Content'}</span>
            {activeMobilePanel === 'left' ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      )}
      {/* Left Panel with Terminal */}
      <div 
        className={cn(
          'flex flex-col transition-all duration-300 ease-in-out',
          isMobile ? (
            activeMobilePanel === 'left' ? 'block' : 'hidden'
          ) : ''
        )}
        style={!isMobile ? { width: `${leftPanelWidth}%` } : undefined}
      >
        {/* Left Panel Content */}
        <div className="flex-1 overflow-auto">
          {leftPanel}
        </div>
        
        {/* Terminal Component - rendered below left panel content */}
        {terminalComponent && (
          <div className="flex-shrink-0">
            {terminalComponent}
          </div>
        )}
      </div>
      
      {/* Divider - hidden on mobile */}
      {!isMobile && (
        <div
          ref={dividerRef}
          className={cn(
            'w-1 h-full bg-ide-border-primary hover:bg-ide-bg-elevated hover:w-1.5 cursor-col-resize transition-all duration-150',
            isDragging && 'w-1.5 bg-ide-accent-primary'
          )}
          onMouseDown={handleDragStart}
          onDoubleClick={handleDoubleClick}
        />
      )}
      
      {/* Right Panel */}
      <div 
        className={cn(
          'h-full overflow-auto transition-all duration-300 ease-in-out',
          isMobile ? (
            activeMobilePanel === 'right' ? 'block' : 'hidden'
          ) : ''
        )}
        style={!isMobile ? { width: `${100 - leftPanelWidth}%` } : undefined}
      >
        {rightPanel}
      </div>
    </div>
  );
};

export default Panel;
