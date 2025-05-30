"use client";

import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/components/chat/MessageList';

interface UseChatOptions {
  initialMessages?: Omit<Message, 'id' | 'timestamp'>[];
  onError?: (error: Error) => void;
  storageKey?: string;
  apiEndpoint?: string;
}

const STORAGE_KEY = 'ide-portfolio-chat-history';

export function useChat({ 
  initialMessages = [{ 
    text: 'Welcome to the IDE Portfolio Terminal. Ask a question about my work or experience.', 
    isUser: false 
  }],
  onError,
  storageKey = STORAGE_KEY,
  apiEndpoint = '/api/chat'
}: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Try to load from localStorage first
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Convert string dates back to Date objects
            return parsed.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }));
          }
        }
      } catch (e) {
        console.error('Failed to load chat history:', e);
        // Fall back to initial messages
      }
    }
    
    // Default to initial messages
    return initialMessages.map(msg => ({
      ...msg,
      id: uuidv4(),
      timestamp: new Date()
    }));
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Save messages to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } catch (e) {
        console.error('Failed to save chat history:', e);
      }
    }
  }, [messages, storageKey]);

  // Reset any error when input changes
  useEffect(() => {
    if (error) setError(null);
  }, [inputValue, error]);

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;
    
    try {
      // Add user message to chat
      const userMessage: Message = {
        id: uuidv4(),
        text: inputValue,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);
      
      // Make API call to chat endpoint
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Chat API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setIsTyping(false);
      
      // Process the response from API
      const assistantMessage: Message = {
        ...data.message,
        timestamp: new Date(data.message.timestamp)
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setIsTyping(false);
      
      // Show error message in chat
      const errorMessage: Message = {
        id: uuidv4(),
        text: `Sorry, there was an error: ${error.message}. Please try again.`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      if (onError) {
        onError(error);
      }
    }
  }, [inputValue, messages, apiEndpoint, onError]);

  const clearMessages = useCallback(() => {
    const welcomeMessage = {
      id: uuidv4(),
      text: 'Terminal cleared. How can I help you?',
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    setError(null);
    
    // Also clear localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify([welcomeMessage]));
      } catch (e) {
        console.error('Failed to clear chat history in storage:', e);
      }
    }
  }, [storageKey]);

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    error,
    sendMessage,
    clearMessages,
    // Additional methods for advanced usage
    setMessages
  };
}

export default useChat;
