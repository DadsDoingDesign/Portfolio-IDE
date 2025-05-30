"use client";

import { useEffect, useState, useCallback } from 'react';

interface UseMobileKeyboardOptions {
  onFocus?: () => void;
  onBlur?: () => void;
}

/**
 * Hook to handle mobile keyboard behavior
 * - Detects when virtual keyboard is opened/closed
 * - Handles viewport resizing on mobile devices
 * - Provides functions to manage input focus
 */
export function useMobileKeyboard({ onFocus, onBlur }: UseMobileKeyboardOptions = {}) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );

  // Track initial viewport height to detect keyboard
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial viewport height
    setViewportHeight(window.innerHeight);
    
    const handleResize = () => {
      // On mobile, when keyboard opens, the viewport height decreases
      const newHeight = window.innerHeight;
      const heightDiff = Math.abs(viewportHeight - newHeight);
      
      // Consider keyboard open if height decreases significantly (100px is a threshold)
      const keyboardOpen = newHeight < viewportHeight && heightDiff > 100;
      
      if (keyboardOpen !== isKeyboardOpen) {
        setIsKeyboardOpen(keyboardOpen);
        
        if (keyboardOpen && onFocus) {
          onFocus();
        } else if (!keyboardOpen && onBlur) {
          onBlur();
        }
      }
      
      // Update viewport height for future comparisons
      setViewportHeight(newHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewportHeight, isKeyboardOpen, onFocus, onBlur]);

  // Handle iOS safari specific scroll issues
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      // Prevent scroll on body when keyboard is open
      if (isKeyboardOpen) {
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isKeyboardOpen]);

  // Utility functions
  const focusInput = useCallback((inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  const blurInput = useCallback((inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

  return {
    isKeyboardOpen,
    focusInput,
    blurInput,
    viewportHeight
  };
}

export default useMobileKeyboard;
