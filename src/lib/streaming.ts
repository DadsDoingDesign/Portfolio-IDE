/**
 * Streaming Utility Functions for Chat Interface
 * These utilities help handle streaming responses in the Terminal component
 */

import { Message } from '@/hooks/useChatStreaming';

// Event types for streaming responses
export type StreamEventType = 'start' | 'chunk' | 'end' | 'error';

export interface StreamEvent {
  id: string;
  type: StreamEventType;
  content?: string;
  error?: string;
}

/**
 * Parse a Server-Sent Event (SSE) line into a StreamEvent object
 */
export function parseEventLine(line: string): StreamEvent | null {
  // Ensure line starts with "data: "
  if (!line.trim().startsWith('data:')) return null;
  
  try {
    // Extract the JSON data from the SSE line
    const jsonStr = line.replace(/^data:\s*/, '').trim();
    if (!jsonStr) return null;
    
    return JSON.parse(jsonStr) as StreamEvent;
  } catch (e) {
    console.error('Error parsing SSE line:', e, line);
    return null;
  }
}

/**
 * Process SSE chunk into individual events
 */
export function processSSEChunk(chunk: string): StreamEvent[] {
  const lines = chunk.split('\n\n').filter(line => line.trim().startsWith('data:'));
  
  return lines
    .map(parseEventLine)
    .filter((event): event is StreamEvent => event !== null);
}

/**
 * Helper to format message history for API requests
 */
export function formatMessageHistory(messages: Message[]): any[] {
  return messages.map(msg => ({
    id: msg.id,
    text: msg.text,
    isUser: msg.isUser,
    timestamp: msg.timestamp
  }));
}

/**
 * Helper to convert a readable stream to text
 * Used for error handling when stream format is unexpected
 */
export async function streamToText(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = '';
  
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
    return result;
  } finally {
    reader.releaseLock();
  }
}
