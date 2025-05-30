"use client";

import React, { useState } from 'react';
import { CaseStudyImage } from '@/lib/cms/types';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface PreviewImageProps {
  images: CaseStudyImage[];
  activeImageIndex?: number;
  className?: string;
  onIndexChange?: (index: number) => void;
}

export const PreviewImage: React.FC<PreviewImageProps> = ({
  images,
  activeImageIndex = 0,
  className,
  onIndexChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(activeImageIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Update current index when activeImageIndex prop changes
  React.useEffect(() => {
    setCurrentIndex(activeImageIndex);
  }, [activeImageIndex]);
  
  // No images to display
  if (!images || images.length === 0) {
    return (
      <div className={cn(
        "flex items-center justify-center h-full bg-ide-bg-secondary rounded-md border border-ide-border-primary",
        className
      )}>
        <p className="text-ide-text-secondary">No images available</p>
      </div>
    );
  }
  
  const currentImage = images[currentIndex];
  
  // Navigate to previous image
  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };
  
  // Navigate to next image
  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };
  
  // Zoom in
  const zoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.25, 2));
  };
  
  // Zoom out
  const zoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.25, 0.5));
  };
  
  return (
    <div className={cn(
      "flex flex-col h-full bg-ide-bg-secondary rounded-md border border-ide-border-primary overflow-hidden",
      className
    )}>
      {/* Image Header */}
      <div className="p-3 border-b border-ide-border-primary flex justify-between items-center">
        <h3 className="text-sm font-medium text-ide-text-primary truncate">
          {currentImage.alt}
        </h3>
        <div className="flex space-x-1">
          <button
            className="p-1 rounded hover:bg-ide-bg-tertiary text-ide-text-secondary"
            onClick={zoomOut}
            disabled={zoomLevel <= 0.5}
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            className="p-1 rounded hover:bg-ide-bg-tertiary text-ide-text-secondary"
            onClick={zoomIn}
            disabled={zoomLevel >= 2}
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>
      
      {/* Image Container */}
      <div className="flex-1 overflow-auto relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* For a real implementation, we would use next/image here */}
          <div 
            className="relative transition-transform duration-300 ease-in-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div className="bg-gray-200 h-64 w-96 flex items-center justify-center">
              <p className="text-gray-500">Image: {currentImage.url}</p>
            </div>
            {currentImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
                <p className="text-white text-sm">{currentImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Image Navigation */}
      <div className="p-3 border-t border-ide-border-primary flex justify-between items-center">
        <button
          className="p-1 rounded hover:bg-ide-bg-tertiary text-ide-text-secondary disabled:opacity-30"
          onClick={prevImage}
          disabled={images.length <= 1}
          aria-label="Previous image"
        >
          <ChevronLeft size={16} />
        </button>
        
        <span className="text-xs text-ide-text-secondary">
          {currentIndex + 1} / {images.length}
        </span>
        
        <button
          className="p-1 rounded hover:bg-ide-bg-tertiary text-ide-text-secondary disabled:opacity-30"
          onClick={nextImage}
          disabled={images.length <= 1}
          aria-label="Next image"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PreviewImage;
