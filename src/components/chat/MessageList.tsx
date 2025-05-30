"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  className?: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isTyping,
  className
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={cn("h-full overflow-y-auto p-4 font-mono text-sm", className)}>
      {messages.map((message) => (
        <div 
          key={message.id}
          className={cn(
            'mb-3',
            message.isUser ? 'text-ide-text-primary' : 'text-ide-text-secondary pl-4'
          )}
        >
          {message.isUser && <span className="text-ide-accent-primary">&gt; </span>}
          {message.text}
        </div>
      ))}
      
      {isTyping && (
        <div className="text-ide-text-secondary pl-4 mb-3" aria-live="polite" aria-label="Assistant is typing">
          <span className="inline-block w-1.5 h-3 bg-ide-text-secondary animate-pulse rounded-sm mr-1"></span>
          <span className="inline-block w-1.5 h-3 bg-ide-text-secondary animate-pulse rounded-sm mr-1" style={{ animationDelay: '0.2s' }}></span>
          <span className="inline-block w-1.5 h-3 bg-ide-text-secondary animate-pulse rounded-sm" style={{ animationDelay: '0.4s' }}></span>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
