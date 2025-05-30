"use client";

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CaseStudy } from '@/lib/cms/types';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/lib/store';

interface ContentCardProps {
  caseStudy: CaseStudy;
  className?: string;
  onClick?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  caseStudy,
  className,
  onClick
}) => {
  const { addTab, setActiveTab } = useUIStore();
  
  // Handle click to open case study in a new tab
  const handleOpenCaseStudy = () => {
    // Create a unique ID for the tab
    const tabId = `case-study-${caseStudy.slug}`;
    
    // Add the case study tab to the UI
    addTab({
      id: tabId,
      label: caseStudy.title, // Required by Tab interface
      title: caseStudy.title, // For display in the tab
      icon: 'casestudy',
      type: 'case-study', // Required by Tab interface
      content: 'case-study',
      data: { caseStudySlug: caseStudy.slug }
    });
    
    // Set the tab as active
    setActiveTab(tabId);
    
    // Call the onClick handler if provided
    if (onClick) onClick();
  };
  
  return (
    <div 
      className={cn(
        "group cursor-pointer bg-ide-bg-secondary hover:bg-ide-bg-tertiary rounded-md border border-ide-border-primary transition-all duration-200 overflow-hidden",
        className
      )}
      onClick={handleOpenCaseStudy}
      tabIndex={0}
      role="button"
      aria-label={`View case study: ${caseStudy.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOpenCaseStudy();
        }
      }}
    >
      {/* Card Header */}
      <div className="p-4 border-b border-ide-border-primary">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-ide-text-primary group-hover:text-ide-accent-primary transition-colors">
            {caseStudy.title}
          </h3>
          <ExternalLink 
            size={16} 
            className="text-ide-text-tertiary group-hover:text-ide-accent-primary transition-colors" 
          />
        </div>
        <div className="mt-1 text-sm text-ide-text-secondary">
          {caseStudy.company} • {caseStudy.timeline}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        <p className="text-sm text-ide-text-secondary line-clamp-3">
          {caseStudy.summary}
        </p>
        
        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {caseStudy.category.map((category) => (
            <span 
              key={category}
              className="px-2 py-1 text-xs font-medium rounded-md bg-ide-bg-elevated text-ide-text-secondary"
            >
              {category}
            </span>
          ))}
        </div>
        
        {/* Tech Stack */}
        <div className="mt-4 pt-4 border-t border-ide-border-primary">
          <div className="flex flex-wrap gap-1">
            {caseStudy.tools.slice(0, 3).map((tool, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 text-xs rounded-full bg-ide-bg-elevated text-ide-accent-primary"
              >
                {tool}
              </span>
            ))}
            {caseStudy.tools.length > 3 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-ide-bg-elevated text-ide-text-tertiary">
                +{caseStudy.tools.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
