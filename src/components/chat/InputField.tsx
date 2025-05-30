"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMobileKeyboard } from '@/hooks/useMobileKeyboard';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  error?: Error | null;
  onKeyboardShow?: () => void;
  onKeyboardHide?: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Type your message...",
  autoFocus = false,
  className,
  disabled = false,
  error = null,
  onKeyboardShow,
  onKeyboardHide
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorShown, setErrorShown] = useState(false);
  
  // Handle mobile keyboard events
  const { focusInput, blurInput } = useMobileKeyboard({
    onFocus: () => {
      if (onKeyboardShow) onKeyboardShow();
    },
    onBlur: () => {
      if (onKeyboardHide) onKeyboardHide();
    }
  });

  // Focus input when autoFocus changes - simplified approach
  useEffect(() => {
    if (autoFocus && !disabled && inputRef.current) {
      // Direct focus approach without using the custom hook
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [autoFocus, disabled]);
  
  // Show and then hide error message
  useEffect(() => {
    if (error && !errorShown) {
      setErrorShown(true);
      // Clear error shown flag after 5 seconds
      const timer = setTimeout(() => setErrorShown(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, errorShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSubmit();
    }
  };
  
  // Handle special keys and input interactions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Clear input on Escape
    if (e.key === 'Escape') {
      onChange('');
      inputRef.current?.blur();
    }
  };
  
  // Handle click events explicitly to ensure focus
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Ensure focus is applied when clicked
    e.currentTarget.focus();
    // Prevent event propagation to avoid any parent handlers interfering
    e.stopPropagation();
  };

  return (
    <div className="relative">
      {error && errorShown && (
        <div className="absolute -top-10 left-0 right-0 bg-ide-error-bg text-ide-error-text text-xs p-2 rounded border border-ide-error-border">
          {error.message}
        </div>
      )}
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "h-12 border-t border-ide-border-subtle flex items-center px-4",
          error && errorShown ? "border-ide-error-border" : "",
          className
        )}
      >
        <span className="text-ide-accent-primary font-mono">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={handleInputClick}
          onFocus={(e) => e.currentTarget.select()} /* Select all text on focus */
          className="flex-1 bg-transparent border-none outline-none px-2 text-ide-text-primary font-mono text-sm placeholder-ide-text-tertiary cursor-text"
          placeholder={disabled ? "Processing..." : placeholder}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-errormessage={error ? error.message : undefined}
          aria-label="Chat message input"
          data-lpignore="true" /* Prevents LastPass from interfering */
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          tabIndex={0} /* Ensure it's in the tab order */
        />
        {disabled && (
          <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-ide-accent-primary animate-spin mr-2" />
        )}
      </form>
    </div>
  );
};

export default InputField;
