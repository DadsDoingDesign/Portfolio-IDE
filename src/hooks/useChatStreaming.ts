"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UseChatOptions {
  initialMessages?: Message[];
  storageKey?: string | null;
}

export function useChatStreaming({
  initialMessages = [],
  storageKey = 'ide-portfolio-chat-history',
}: UseChatOptions = {}) {
  // Start with initialMessages, then load from localStorage in useEffect
  // This prevents hydration mismatch between server and client
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  
  // Load messages from localStorage on client-side only
  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      const storedMessages = localStorage.getItem(storageKey);
      if (storedMessages) {
        try {
          setMessages(JSON.parse(storedMessages));
        } catch (e) {
          console.error('Failed to parse stored messages:', e);
        }
      }
    }
  }, [storageKey]);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Save messages to localStorage when they change
  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);
  
  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  }, []);
  
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to the chat
    const userMessage: Message = {
      id: uuidv4(),
      text: message.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setError(null);
    setIsStreaming(true);
    
    // Create placeholder for assistant response
    const assistantMessageId = uuidv4();
    const assistantMessage: Message = {
      id: assistantMessageId,
      text: '',
      isUser: false,
      timestamp: new Date(),
    };
    
    // Add empty assistant message to the chat
    setMessages(prevMessages => [...prevMessages, assistantMessage]);
    
    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    
    try {
      // Call the streaming API
      const response = await fetch('/api/chat/streaming', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: messages,
        }),
        signal,
      });
      
      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = '';
      
      // Process the stream
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        
        if (done) break;
        
        // Decode the chunk and split by data: lines
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n').filter(line => line.trim().startsWith('data:'));
        
        for (const line of lines) {
          try {
            // Extract the JSON data from the SSE line
            const jsonStr = line.replace(/^data:\s*/, '').trim();
            if (!jsonStr) continue;
            
            const data = JSON.parse(jsonStr);
            
            if (data.error) {
              setError(data.error);
              break;
            }
            
            if (data.type === 'chunk' && data.content) {
              // Update the accumulated text
              accumulatedText += data.content;
              
              // Update the message in the state
              setMessages(prevMessages => 
                prevMessages.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, text: accumulatedText }
                    : msg
                )
              );
            }
          } catch (e) {
            console.error('Error processing SSE line:', e, line);
          }
        }
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Error in streaming chat:', e);
        setError(e instanceof Error ? e.message : 'Unknown error occurred');
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [messages]);
  
  const clearMessages = useCallback(() => {
    setMessages([]);
    if (storageKey && typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);
  
  return {
    messages,
    sendMessage,
    isStreaming,
    error,
    clearMessages,
    stopStreaming,
  };
}
