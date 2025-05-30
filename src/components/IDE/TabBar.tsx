"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useUIStore, Tab } from '@/lib/store';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface TabBarProps {
  className?: string;
}

export const TabBar: React.FC<TabBarProps> = ({ className }) => {
  const { tabs, activeTabId, setActiveTab, removeTab } = useUIStore();
  
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    removeTab(tabId);
  };
  
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Scroll active tab into view when it changes
  useEffect(() => {
    if (activeTabId && tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector(`[data-testid="tab-${activeTabId}"]`);
      if (activeTabElement) {
        activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTabId]);
  
  return (
    <div className={cn(
      'flex h-10 bg-ide-bg-primary border-b border-ide-border-primary overflow-x-auto scrollbar-hide',
      className
    )} ref={tabsRef}>
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          isActive={tab.id === activeTabId}
          onClick={() => handleTabClick(tab.id)}
          onClose={(e) => handleCloseTab(e, tab.id)}
          canClose={tab.id !== 'overview'} // Cannot close the overview tab
        />
      ))}
    </div>
  );
};

interface TabItemProps {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
  onClose: (e: React.MouseEvent) => void;
  canClose: boolean;
}

const TabItem: React.FC<TabItemProps> = ({
  tab,
  isActive,
  onClick,
  onClose,
  canClose
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className={cn(
        'flex items-center h-full px-4 cursor-pointer border-r border-ide-border-primary',
        isActive 
          ? 'bg-ide-bg-secondary text-ide-text-primary' 
          : 'bg-transparent text-ide-text-secondary hover:bg-ide-bg-tertiary'
      )}
      onClick={onClick}
      data-testid={`tab-${tab.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      layout
    >
      <span className="font-medium text-sm">{tab.label}</span>
      
      {canClose && (
        <motion.button
          className="ml-2 p-0.5 rounded-full hover:bg-ide-bg-hover"
          onClick={onClose}
          aria-label={`Close ${tab.label} tab`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered || isActive ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
        >
          <X size={14} />
        </motion.button>
      )}
      
      {/* Active tab indicator */}
      {isActive && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-ide-accent-primary"
          layoutId="activeTabIndicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default TabBar;
