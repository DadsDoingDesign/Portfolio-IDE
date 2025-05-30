"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useChatStreaming } from '@/hooks/useChatStreaming';

export default function StreamingTest() {
  const { messages, sendMessage, isStreaming, error, clearMessages } = useChatStreaming();
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    
    await sendMessage(input);
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-ide-bg-primary text-ide-text-primary">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Streaming Chat Test</h1>
        <p className="text-ide-text-secondary">
          Test the streaming chat API with the Mistral LLM integration
        </p>
      </header>

      <div className="flex-1 bg-ide-bg-secondary p-4 rounded-md mb-4 overflow-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-medium">Conversation:</h2>
          <Button 
            onClick={clearMessages} 
            variant="secondary" 
            size="sm"
          >
            Clear Chat
          </Button>
        </div>
        
        <div className="bg-ide-bg-overlay p-4 rounded h-[calc(100vh-280px)] overflow-auto">
          {messages.length === 0 ? (
            <div className="text-ide-text-secondary text-center p-4">
              Send a message to start a conversation
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser 
                        ? 'bg-ide-accent text-white'
                        : 'bg-ide-bg-secondary border border-ide-border-primary'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {message.text || (isStreaming && !message.isUser && message === messages[messages.length - 1] ? (
                        <span className="text-ide-text-secondary animate-pulse">▌</span>
                      ) : '')}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {/* Use client-side only rendering for timestamps to prevent hydration mismatch */}
                      {typeof window !== 'undefined' ? new Date(message.timestamp).toLocaleTimeString() : ''}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-ide-bg-secondary p-4 rounded-md">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-ide-bg-overlay text-ide-text-primary border border-ide-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-ide-accent"
            disabled={isStreaming}
          />
          <Button 
            type="submit" 
            disabled={isStreaming || !input.trim()}
            className="ml-2"
          >
            {isStreaming ? 'Streaming...' : 'Send'}
          </Button>
        </div>
      </form>
    </div>
  );
}
