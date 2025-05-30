"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, ChevronUp, X, Terminal as TerminalIcon, AlertCircle } from 'lucide-react';
import { useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import MessageList from '@/components/chat/MessageList';
import InputField from '@/components/chat/InputField';
import { useChat } from '@/hooks/useChat';
import { useMobileKeyboard } from '@/hooks/useMobileKeyboard';

interface TerminalProps {
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ className }) => {
  const { isTerminalExpanded, toggleTerminal, setTerminalExpanded } = useUIStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    error,
    sendMessage,
    clearMessages
  } = useChat();
  
  // Check if device is mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobileDevice(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);
  
  // Handle mobile keyboard
  const { isKeyboardOpen } = useMobileKeyboard({
    onFocus: () => {
      // Auto-expand terminal when keyboard opens on mobile
      if (isMobileDevice && !isTerminalExpanded) {
        setTerminalExpanded(true);
      }
    }
  });
  
  // Simplified focus management for terminal
  useEffect(() => {
    if (isTerminalExpanded) {
      // Give the browser a moment to render before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isTerminalExpanded]);
  
  // Function to explicitly focus the input field
  const focusInputField = useCallback(() => {
    if (isTerminalExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalExpanded]);
  
  return (
    <div 
      ref={terminalRef}
      className={cn(
        'relative w-full bg-ide-bg-overlay backdrop-blur-sm border-t border-ide-border-primary transition-all duration-300 ease-in-out',
        isTerminalExpanded ? (isMobileDevice && isKeyboardOpen ? 'h-[85vh]' : 'h-96') : 'h-12',
        className
      )}
    >
      {/* Terminal Header - Now clickable to focus input */}
      <div 
        className="flex items-center justify-between h-12 px-4 border-b border-ide-border-primary cursor-pointer" 
        onClick={isTerminalExpanded ? focusInputField : toggleTerminal}
      >
        <div className="flex items-center space-x-2">
          <TerminalIcon size={16} className="text-ide-text-secondary" />
          <span className="text-sm font-medium text-ide-text-secondary">Terminal</span>
          {error && (
            <div className="flex items-center text-ide-error-text">
              <AlertCircle size={14} className="mr-1" />
              <span className="text-xs truncate max-w-[150px]">Error</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            onClick={toggleTerminal}
            className="p-1.5 rounded hover:bg-ide-bg-hover text-ide-text-secondary"
            aria-label={isTerminalExpanded ? 'Minimize terminal' : 'Expand terminal'}
          >
            {isTerminalExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>
      
      {/* Messages Area (only visible when expanded) */}
      {isTerminalExpanded && (
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
          className="h-[calc(100%-6rem)]" 
        />
      )}
      
      {/* Input Area (only visible when expanded) */}
      {isTerminalExpanded && (
        <div onClick={focusInputField} className="cursor-text">
          <InputField
            value={inputValue}
            onChange={setInputValue}
            onSubmit={sendMessage}
            autoFocus={isTerminalExpanded}
            disabled={isTyping}
            error={error}
            onKeyboardShow={() => setTerminalExpanded(true)}
            onKeyboardHide={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default Terminal;
