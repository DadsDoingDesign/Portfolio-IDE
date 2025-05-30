/**
 * LangChain integration for IDE Portfolio
 * Provides context management and advanced conversational capabilities
 */

import { searchSimilarContent } from './embedding';

/**
 * Conversation message type
 */
export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Context window management configuration
 */
export interface ContextConfig {
  maxTokens?: number;
  maxMessages?: number;
  includeSystemPrompt?: boolean;
  includeSimilarContent?: boolean;
}

/**
 * System prompt templates for different conversation scenarios
 */
const SYSTEM_PROMPTS = {
  default: `You are an AI assistant for a developer's portfolio website styled as an IDE.
You should respond as if you're the portfolio owner discussing your projects, skills, and experience.
The portfolio showcases projects in web development, UI/UX, and AI integration using Next.js, React, TypeScript and modern web technologies.`,

  technical: `You are an AI assistant for a developer's portfolio website styled as an IDE.
You have deep technical knowledge about web development, React, Next.js, TypeScript, and modern frontend architecture.
When answering technical questions, provide specific code examples and best practices.`,

  projectDetails: `You are an AI assistant for a developer's portfolio website styled as an IDE.
You have detailed knowledge about the portfolio owner's projects, including implementation details, technologies used, and challenges overcome.
Focus on providing specific information about project architecture, technical decisions, and outcomes.`
};

/**
 * Get the appropriate system prompt based on context
 */
export function getSystemPrompt(type: keyof typeof SYSTEM_PROMPTS = 'default'): string {
  return SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.default;
}

/**
 * Format conversation history for the LLM prompt
 */
export function formatConversationHistory(messages: ConversationMessage[]): string {
  return messages.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n\n');
}

/**
 * Manage context window by selecting relevant messages
 * and keeping within token limits
 */
export async function manageContext(
  messages: ConversationMessage[],
  config: ContextConfig = {}
): Promise<ConversationMessage[]> {
  const {
    maxMessages = 10,
    includeSystemPrompt = true,
    includeSimilarContent = true
  } = config;
  
  // Start with system prompt if configured
  const contextualMessages: ConversationMessage[] = [];
  if (includeSystemPrompt) {
    contextualMessages.push({
      role: 'system',
      content: getSystemPrompt()
    });
  }
  
  // Add the most recent messages, respecting maxMessages limit
  const recentMessages = messages.slice(-maxMessages);
  
  // If enabled, add relevant content from vector storage
  if (includeSimilarContent && recentMessages.length > 0) {
    try {
      // Get the last user message
      const lastUserMessage = [...recentMessages].reverse().find(m => m.role === 'user');
      
      if (lastUserMessage) {
        // Search for similar content
        const similarContent = await searchSimilarContent(lastUserMessage.content, 2, 0.7);
        
        if (similarContent.length > 0) {
          // Add relevant context from embeddings
          const relevantContext = similarContent.map(item => 
            `Relevant information: ${item.content}`
          ).join('\n\n');
          
          contextualMessages.push({
            role: 'system',
            content: `Here is some relevant information about the portfolio that may help with your response:\n\n${relevantContext}`
          });
        }
      }
    } catch (error) {
      console.error('Error fetching similar content:', error);
      // Continue without similar content if there's an error
    }
  }
  
  // Add the conversation history
  contextualMessages.push(...recentMessages);
  
  return contextualMessages;
}

/**
 * Generate a formatted prompt for the LLM
 */
export async function generatePrompt(
  messages: ConversationMessage[],
  config: ContextConfig = {}
): Promise<string> {
  // Get contextually relevant messages
  const contextualMessages = await manageContext(messages, config);
  
  // Format the prompt with system instructions and conversation history
  let prompt = '';
  
  // Add system messages at the beginning
  const systemMessages = contextualMessages.filter(m => m.role === 'system');
  if (systemMessages.length > 0) {
    prompt += systemMessages.map(m => m.content).join('\n\n') + '\n\n';
  }
  
  // Add conversation history
  const conversationMessages = contextualMessages.filter(m => m.role !== 'system');
  prompt += formatConversationHistory(conversationMessages);
  
  // Add the final prompt marker
  prompt += '\n\nAssistant:';
  
  return prompt;
}
