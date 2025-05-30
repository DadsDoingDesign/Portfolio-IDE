"use client";

import React, { useState, useEffect } from 'react';
import { Search, FolderOpen, Code, BarChart, Smartphone, Brain } from 'lucide-react';
import { CaseStudy } from '@/lib/cms/types';
import { cmsClient } from '@/lib/cms/api';
import ContentCard from './ContentCard';
import { cn } from '@/lib/utils';

interface CaseStudyExplorerProps {
  className?: string;
}

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  'fintech': <BarChart size={16} />,
  'mobile': <Smartphone size={16} />,
  'web': <Code size={16} />,
  'ai': <Brain size={16} />,
  'analytics': <BarChart size={16} />,
  'enterprise': <FolderOpen size={16} />
};

export const CaseStudyExplorer: React.FC<CaseStudyExplorerProps> = ({
  className
}) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Load all case studies
  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await cmsClient.getCaseStudies();
        setCaseStudies(response.data);
      } catch (err) {
        console.error('Error loading case studies:', err);
        setError('Failed to load case studies');
      } finally {
        setLoading(false);
      }
    };
    
    loadCaseStudies();
  }, []);
  
  // Filter case studies by search query and active category
  const filteredCaseStudies = caseStudies.filter(cs => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesQuery = 
        cs.title.toLowerCase().includes(query) ||
        cs.company.toLowerCase().includes(query) ||
        cs.summary.toLowerCase().includes(query) ||
        cs.tags.some(tag => tag.toLowerCase().includes(query));
      
      if (!matchesQuery) return false;
    }
    
    // Filter by active category
    if (activeCategory) {
      return cs.category.includes(activeCategory as any);
    }
    
    return true;
  });
  
  // Extract all unique categories from case studies
  const allCategories = Array.from(
    new Set(caseStudies.flatMap(cs => cs.category))
  );
  
  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Explorer Header */}
      <div className="p-4 border-b border-ide-border-primary">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search 
              size={16} 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-ide-text-tertiary" 
            />
            <input
              type="text"
              placeholder="Search case studies..."
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-ide-bg-secondary rounded-md border border-ide-border-primary focus:outline-none focus:border-ide-accent-primary text-ide-text-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            className={cn(
              "px-2.5 py-1 text-xs rounded-md flex items-center space-x-1.5 transition-colors",
              activeCategory === null
                ? "bg-ide-accent-primary text-white"
                : "bg-ide-bg-secondary text-ide-text-secondary hover:bg-ide-bg-tertiary"
            )}
            onClick={() => setActiveCategory(null)}
          >
            <span>All</span>
          </button>
          
          {allCategories.map((category) => (
            <button
              key={category}
              className={cn(
                "px-2.5 py-1 text-xs rounded-md flex items-center space-x-1.5 transition-colors",
                activeCategory === category
                  ? "bg-ide-accent-primary text-white"
                  : "bg-ide-bg-secondary text-ide-text-secondary hover:bg-ide-bg-tertiary"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {categoryIcons[category] && (
                <span>{categoryIcons[category]}</span>
              )}
              <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Case Study Grid */}
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ide-accent-primary"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-ide-text-error">{error}</p>
          </div>
        ) : filteredCaseStudies.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-ide-text-secondary">
            <FolderOpen size={48} className="mb-3 opacity-50" />
            <p>No case studies found</p>
            {searchQuery && (
              <button
                className="mt-2 text-ide-accent-primary hover:underline text-sm"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCaseStudies.map((caseStudy) => (
              <ContentCard
                key={caseStudy.id}
                caseStudy={caseStudy}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudyExplorer;
