import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { queryLLM } from '@/lib/llm';
import { ConversationMessage, generatePrompt } from '@/lib/langchain';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface StreamingChatRequest {
  message: string;
  history?: ChatMessage[];
}

// Handling chat streaming with Server-Sent Events (SSE)
export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  
  try {
    // Parse the request body
    const body: StreamingChatRequest = await request.json();
    
    if (!body.message || typeof body.message !== 'string') {
      return new Response(
        encoder.encode('data: {"error":"Invalid request: message is required"}\n\n'),
        {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        }
      );
    }
    
    // Create stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send initial response
          controller.enqueue(
            encoder.encode(`data: {"id":"${uuidv4()}","type":"start"}\n\n`)
          );
          
          // Process chat history for context
          const conversationHistory: ConversationMessage[] = (body.history || []).map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text
          }));
          
          // Add the current user message
          conversationHistory.push({
            role: 'user',
            content: body.message
          });
          
          // Generate optimized prompt with LangChain
          const prompt = await generatePrompt(conversationHistory, {
            maxMessages: 10,
            includeSystemPrompt: true,
            includeSimilarContent: true
          });
          
          // Simulate streaming response for now
          // For Mistral, we can't do true streaming without a direct connection
          // So we'll break up the response into chunks to simulate streaming
          
          // Call Mistral LLM API
          const response = await queryLLM(prompt);
          const messageId = uuidv4();
          
          // Split response into tokens/words for simulated streaming
          const tokens = response.split(/(\s+)/).filter(token => token.trim().length > 0);
          
          // Stream tokens with small delays
          for (let i = 0; i < tokens.length; i++) {
            const chunk = tokens[i] + (i < tokens.length - 1 ? ' ' : '');
            
            controller.enqueue(
              encoder.encode(`data: {"id":"${messageId}","type":"chunk","content":${JSON.stringify(chunk)}}\n\n`)
            );
            
            // Add small delay between chunks to simulate typing
            await new Promise(resolve => setTimeout(resolve, 30));
          }
          
          // Signal completion
          controller.enqueue(
            encoder.encode(`data: {"id":"${messageId}","type":"end"}\n\n`)
          );
          
        } catch (error) {
          console.error('Error in streaming chat:', error);
          controller.enqueue(
            encoder.encode(`data: {"error":"${error instanceof Error ? error.message : 'Unknown error'}"}\n\n`)
          );
        } finally {
          controller.close();
        }
      }
    });
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error('Error processing streaming chat request:', error);
    return new Response(
      encoder.encode(`data: {"error":"Failed to process request: ${error instanceof Error ? error.message : 'Unknown error'}"}\n\n`),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
        status: 500
      }
    );
  }
}
