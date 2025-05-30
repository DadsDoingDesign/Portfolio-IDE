"use client";

import React, { useState, useEffect } from 'react';
import { cmsClient } from '@/lib/cms/api';
import { CaseStudy } from '@/lib/cms/types';
import { FrameViewer } from './FrameViewer';
import { PreviewImage } from './PreviewImage';
import { cn } from '@/lib/utils';
import { Panel } from '@/components/IDE/Panel';
import { Loader2 } from 'lucide-react';

interface CaseStudyViewProps {
  slug: string;
  className?: string;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  slug,
  className
}) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Load case study data
  useEffect(() => {
    const loadCaseStudy = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await cmsClient.getCaseStudy(slug);
        setCaseStudy(response.data);
      } catch (err) {
        console.error('Error loading case study:', err);
        setError('Failed to load case study data');
      } finally {
        setLoading(false);
      }
    };
    
    loadCaseStudy();
  }, [slug]);
  
  // Show loading state
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center h-full", className)}>
        <Loader2 className="w-8 h-8 text-ide-accent-primary animate-spin" />
      </div>
    );
  }
  
  // Show error state
  if (error || !caseStudy) {
    return (
      <div className={cn("flex flex-col items-center justify-center h-full", className)}>
        <p className="text-ide-text-error">{error || 'Case study not found'}</p>
      </div>
    );
  }
  
  // Render left panel with FrameViewer
  const leftPanelContent = (
    <FrameViewer 
      caseStudy={caseStudy} 
      onFrameChange={(frame) => {
        // Optionally, you can sync frame changes with images
        if (caseStudy.images && caseStudy.images.length > 0) {
          // This is a simple example - you might want to map frames to specific images
          setActiveImageIndex(Math.min(frame, caseStudy.images.length - 1));
        }
      }}
    />
  );
  
  // Render right panel with PreviewImage
  const rightPanelContent = (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-medium text-ide-text-primary p-4 border-b border-ide-border-primary">
        Project Assets
      </h3>
      <div className="flex-1 p-4">
        {caseStudy.images && caseStudy.images.length > 0 ? (
          <PreviewImage 
            images={caseStudy.images}
            activeImageIndex={activeImageIndex}
            onIndexChange={setActiveImageIndex}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-ide-bg-secondary rounded-md border border-ide-border-primary">
            <p className="text-ide-text-secondary">No images available</p>
          </div>
        )}
      </div>
    </div>
  );
  
  return (
    <div className={cn("h-full", className)}>
      <Panel 
        leftPanel={leftPanelContent}
        rightPanel={rightPanelContent}
      />
    </div>
  );
};

export default CaseStudyView;
