"use client";

import { create } from 'zustand';

export type TabType = 'overview' | 'project' | 'about' | 'case-study';

export interface Tab {
  id: string;
  label: string;
  title?: string; // For display in the tab (if different from label)
  icon?: string; // Icon identifier
  type: TabType;
  projectId?: string;
  content?: string; // Content type identifier
  data?: Record<string, any>; // Additional data for the tab
}

interface UIState {
  // Tab management
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Tab) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  
  // Terminal state
  isTerminalExpanded: boolean;
  toggleTerminal: () => void;
  setTerminalExpanded: (expanded: boolean) => void;
  
  // Panel state
  leftPanelWidth: number; // percentage (0-100)
  setLeftPanelWidth: (width: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Tab management
  tabs: [
    { id: 'overview', label: 'Preview All', type: 'overview' }
  ],
  activeTabId: 'overview',
  
  addTab: (tab: Tab) => set((state) => ({
    tabs: [...state.tabs.filter(t => t.id !== tab.id), tab],
    activeTabId: tab.id
  })),
  
  removeTab: (tabId: string) => set((state) => {
    const newTabs = state.tabs.filter(tab => tab.id !== tabId);
    let newActiveTabId = state.activeTabId;
    
    // If the active tab is being removed, select another tab
    if (tabId === state.activeTabId && newTabs.length > 0) {
      newActiveTabId = newTabs[0].id;
    }
    
    return {
      tabs: newTabs,
      activeTabId: newActiveTabId
    };
  }),
  
  setActiveTab: (tabId: string) => set({
    activeTabId: tabId
  }),
  
  // Terminal state
  isTerminalExpanded: false,
  toggleTerminal: () => set((state) => ({
    isTerminalExpanded: !state.isTerminalExpanded
  })),
  setTerminalExpanded: (expanded: boolean) => set({
    isTerminalExpanded: expanded
  }),
  
  // Panel state
  leftPanelWidth: 60, // 60% default left panel width
  setLeftPanelWidth: (width: number) => set({
    leftPanelWidth: Math.max(20, Math.min(80, width)) // Constrain between 20% and 80%
  })
}));
