"use client";

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { CaseStudy } from '@/lib/cms/types';
import { cn } from '@/lib/utils';

interface FrameViewerProps {
  caseStudy: CaseStudy;
  className?: string;
  onFrameChange?: (index: number) => void;
}

export const FrameViewer: React.FC<FrameViewerProps> = ({
  caseStudy,
  className,
  onFrameChange
}) => {
  const [activeFrame, setActiveFrame] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Define frames based on case study data
  const frames = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-ide-text-primary">{caseStudy.title}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-ide-text-secondary">{caseStudy.company}</span>
            <span className="text-ide-text-tertiary">•</span>
            <span className="text-ide-text-secondary">{caseStudy.timeline}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {caseStudy.category.map((category) => (
              <span 
                key={category}
                className="px-2 py-1 text-xs font-medium rounded-md bg-ide-bg-elevated text-ide-text-secondary"
              >
                {category}
              </span>
            ))}
          </div>
          <p className="text-ide-text-primary mt-4">{caseStudy.summary}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {caseStudy.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-md bg-ide-bg-elevated text-ide-accent-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'challenge',
      title: 'Challenge',
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-ide-text-primary">The Challenge</h2>
          <p className="text-ide-text-secondary">{caseStudy.challenge}</p>
        </div>
      )
    },
    {
      id: 'solution',
      title: 'Solution',
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-ide-text-primary">The Solution</h2>
          <p className="text-ide-text-secondary">{caseStudy.solution}</p>
          {caseStudy.features && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium text-ide-text-primary">Key Features</h3>
              <div className="space-y-3">
                {caseStudy.features.map((feature, index) => (
                  <div key={index} className="bg-ide-bg-secondary p-4 rounded-md border border-ide-border-primary">
                    <h4 className="text-base font-medium text-ide-text-primary">{feature.title}</h4>
                    <p className="text-sm text-ide-text-secondary mt-1">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'impact',
      title: 'Impact',
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-ide-text-primary">The Impact</h2>
          <p className="text-ide-text-secondary">{caseStudy.impact}</p>
          {caseStudy.testimonial && (
            <div className="mt-6 bg-ide-bg-secondary p-4 rounded-md border-l-4 border-ide-accent-primary">
              <p className="text-ide-text-secondary italic">"{caseStudy.testimonial.quote}"</p>
              <div className="mt-2 text-sm">
                <span className="text-ide-text-primary font-medium">{caseStudy.testimonial.author}</span>
                <span className="text-ide-text-tertiary">, {caseStudy.testimonial.role} at {caseStudy.testimonial.company}</span>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'tech',
      title: 'Tech Stack',
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-ide-text-primary">Technical Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-base font-medium text-ide-text-primary mb-2">Role</h3>
              <p className="text-ide-text-secondary">{caseStudy.role}</p>
            </div>
            {caseStudy.team && (
              <div>
                <h3 className="text-base font-medium text-ide-text-primary mb-2">Team</h3>
                <ul className="list-disc list-inside text-ide-text-secondary">
                  {caseStudy.team.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-base font-medium text-ide-text-primary mb-2">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tools.map((tool, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded-md bg-ide-bg-elevated text-ide-text-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];
  
  // Navigate to previous frame
  const prevFrame = () => {
    if (activeFrame > 0) {
      setActiveFrame(activeFrame - 1);
    }
  };
  
  // Navigate to next frame
  const nextFrame = () => {
    if (activeFrame < frames.length - 1) {
      setActiveFrame(activeFrame + 1);
    }
  };
  
  // Notify parent component when frame changes
  useEffect(() => {
    if (onFrameChange) {
      onFrameChange(activeFrame);
    }
  }, [activeFrame, onFrameChange]);
  
  // Handle scroll-based navigation
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isScrolling) return;
      
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 500);
      
      if (e.deltaY > 0) {
        nextFrame();
      } else {
        prevFrame();
      }
    };
    
    window.addEventListener('wheel', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [activeFrame, isScrolling]);
  
  return (
    <div className={cn("relative h-full", className)}>
      {/* Frame Navigation */}
      <div className="absolute top-4 right-4 flex flex-col items-center z-10 bg-ide-bg-secondary rounded-md border border-ide-border-primary">
        <button
          className="p-2 text-ide-text-secondary hover:text-ide-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={prevFrame}
          disabled={activeFrame === 0}
          aria-label="Previous frame"
        >
          <ChevronUp size={16} />
        </button>
        <div className="px-2 py-1 text-xs font-medium text-ide-text-secondary border-t border-b border-ide-border-primary">
          {activeFrame + 1}/{frames.length}
        </div>
        <button
          className="p-2 text-ide-text-secondary hover:text-ide-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={nextFrame}
          disabled={activeFrame === frames.length - 1}
          aria-label="Next frame"
        >
          <ChevronDown size={16} />
        </button>
      </div>
      
      {/* Frame Content with Animation */}
      <div className="h-full overflow-y-auto p-6">
        <div 
          className="transition-opacity duration-300 ease-in-out"
          key={frames[activeFrame].id}
        >
          {frames[activeFrame].content}
        </div>
      </div>
      
      {/* Frame Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {frames.map((frame, index) => (
          <button
            key={frame.id}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === activeFrame 
                ? "bg-ide-accent-primary w-4" 
                : "bg-ide-border-primary hover:bg-ide-border-secondary"
            )}
            onClick={() => setActiveFrame(index)}
            aria-label={`Go to ${frame.title} frame`}
          />
        ))}
      </div>
    </div>
  );
};

export default FrameViewer;
