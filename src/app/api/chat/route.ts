import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { queryLLM } from '@/lib/llm';
import { ConversationMessage, generatePrompt } from '@/lib/langchain';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  message: ChatMessage;
  conversationId?: string;
}

// Using Mistral LLM with LangChain context management
const generateResponse = async (
  userMessage: string, 
  history: ChatMessage[] = []
): Promise<string> => {
  try {
    // Convert chat history to LangChain format
    const conversationHistory: ConversationMessage[] = history.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));
    
    // Add the current user message
    conversationHistory.push({
      role: 'user',
      content: userMessage
    });
    
    // Generate optimized prompt with LangChain
    // This will include system prompts, relevant context from vector storage, and conversation history
    const prompt = await generatePrompt(conversationHistory, {
      maxMessages: 10,
      includeSystemPrompt: true,
      includeSimilarContent: true
    });
    
    // Call Mistral LLM API via our integration
    const response = await queryLLM(prompt);
    return response.trim();
  } catch (error) {
    console.error('Error calling LLM:', error);
    return "I'm having trouble connecting to my language model right now. Please try again in a moment.";
  }
};

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: message is required' },
        { status: 400 }
      );
    }
    
    // Store the user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: body.message.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    // Generate response (will be replaced with LLM call in Phase 5)
    const responseText = await generateResponse(userMessage.text, body.history);
    
    // Create assistant message
    const assistantMessage: ChatMessage = {
      id: uuidv4(),
      text: responseText,
      isUser: false,
      timestamp: new Date()
    };
    
    // In Phase 5, we'll add:
    // - Conversation ID tracking
    // - Session management
    // - Vector embeddings and retrieval
    // - Context window management
    
    return NextResponse.json<ChatResponse>({
      message: assistantMessage
    });
    
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// GET method for health check
export async function GET() {
  return NextResponse.json({ status: 'Chat API is operational' });
}
