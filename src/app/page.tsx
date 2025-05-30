"use client";

import { useEffect, useState } from 'react';
import IDELayout from '@/components/IDE/IDELayout';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/lib/store';
import CaseStudyExplorer from '@/components/CaseStudy/CaseStudyExplorer';
import CaseStudyView from '@/components/CaseStudy/CaseStudyView';
import { cmsClient } from '@/lib/cms/api';

export default function Home() {
  const { tabs, activeTabId } = useUIStore();
  const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.id === activeTabId) || tabs[0]);
  
  // Update active tab when it changes in the store
  useEffect(() => {
    const tab = tabs.find(tab => tab.id === activeTabId);
    if (tab) {
      setActiveTab(tab);
    }
  }, [tabs, activeTabId]);
  
  // Render content based on active tab type
  const renderContent = () => {
    switch (activeTab.type) {
      case 'case-study':
        return {
          leftContent: activeTab.data?.caseStudySlug ? (
            <CaseStudyView slug={activeTab.data.caseStudySlug} />
          ) : (
            <div className="flex items-center justify-center h-full text-ide-text-secondary">
              No case study selected
            </div>
          ),
          rightContent: null // CaseStudyView already includes both panels
        };
      case 'overview':
      default:
        return {
          leftContent: (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-ide-text-primary">
                IDE Portfolio
              </h1>
              <p className="text-ide-text-secondary">
                An IDE-themed portfolio site with tabbed navigation, case study viewer, and terminal chat functionality.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => {
                  // Open case study explorer
                  const tabId = 'case-study-explorer';
                  const existingTab = tabs.find(tab => tab.id === tabId);
                  
                  if (!existingTab) {
                    useUIStore.getState().addTab({
                      id: tabId,
                      label: 'Case Studies',
                      title: 'Case Studies Explorer',
                      type: 'overview',
                      content: 'case-study-explorer'
                    });
                  }
                  
                  useUIStore.getState().setActiveTab(tabId);
                }}>View Projects</Button>
                <Tag>Next.js</Tag>
                <Tag>TypeScript</Tag>
                <Tag>Tailwind CSS</Tag>
              </div>
              
              <div className="mt-8 p-4 bg-ide-bg-secondary border border-ide-border-primary rounded-md">
                <h2 className="text-lg font-medium text-ide-text-primary mb-2">Getting Started</h2>
                <p className="text-ide-text-secondary mb-4">
                  Explore this IDE-themed portfolio by clicking on the tabs above or opening the terminal below.
                </p>
                <p className="text-ide-text-secondary">
                  Use the terminal to ask questions about my projects, experience, or skills.
                </p>
              </div>
            </div>
          ),
          rightContent: activeTab.content === 'case-study-explorer' ? (
            <CaseStudyExplorer />
          ) : (
            <div className="bg-ide-bg-secondary border border-ide-border-primary rounded-md p-4">
              <h2 className="text-lg font-medium text-ide-text-primary mb-2">Project Preview</h2>
              <div className="aspect-video bg-ide-bg-tertiary rounded-md flex items-center justify-center">
                <p className="text-ide-text-secondary">Select a project to view details</p>
              </div>
            </div>
          )
        };
    }
  };
  
  const { leftContent, rightContent } = renderContent();
  
  return (
    <IDELayout
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
}
