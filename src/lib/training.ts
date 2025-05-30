/**
 * Training Data Utilities for LLM Integration
 * Prepares and manages training data for the portfolio chat system
 */

import { v4 as uuidv4 } from 'uuid';
import { processEmbeddings, EmbeddingItem } from './embedding';

/**
 * Types for training data management
 */
export interface PortfolioContent {
  id?: string;
  title: string;
  content: string;
  category: 'project' | 'skill' | 'experience' | 'about' | 'education';
  tags?: string[];
  metadata?: Record<string, any>;
}

/**
 * Sample portfolio content data for training
 * This would typically come from a CMS or structured data source
 */
export const PORTFOLIO_CONTENT: PortfolioContent[] = [
  {
    title: 'IDE Portfolio Project',
    content: `An IDE-themed portfolio site built with Next.js 14, TypeScript, and Tailwind CSS. Features include tabbed navigation, a terminal-like chat interface with LLM integration, and a case study viewer. The project uses Supabase for vector storage and Mistral AI for chat interactions.`,
    category: 'project',
    tags: ['next.js', 'typescript', 'tailwind', 'llm', 'supabase']
  },
  {
    title: 'Frontend Development Skills',
    content: `Expertise in modern frontend technologies including React, Next.js, TypeScript, and Tailwind CSS. Experienced in building responsive, accessible web applications with clean, maintainable code. Knowledgeable in state management with Zustand, animations with Framer Motion, and styling with CSS-in-JS solutions.`,
    category: 'skill',
    tags: ['frontend', 'react', 'typescript', 'ui/ux']
  },
  {
    title: 'Backend & API Experience',
    content: `Experience building backend systems and APIs with Node.js, Express, and various database technologies. Familiar with RESTful API design, GraphQL, and serverless architectures. Have worked with SQL and NoSQL databases including PostgreSQL, MongoDB, and Supabase.`,
    category: 'skill',
    tags: ['backend', 'api', 'node.js', 'databases']
  },
  {
    title: 'About Me',
    content: `I'm a full-stack developer passionate about creating intuitive, high-performance web applications. With a background in computer science and several years of industry experience, I specialize in React/Next.js ecosystems and modern JavaScript development. I'm particularly interested in the intersection of design and code, creating accessible interfaces, and implementing AI features in web applications.`,
    category: 'about',
    tags: ['personal', 'background']
  }
];

/**
 * Prepare and chunk content for embedding
 */
export function prepareContentForEmbedding(content: PortfolioContent): EmbeddingItem[] {
  // For shorter content, use as is
  if (content.content.length < 1000) {
    return [{
      id: content.id || `${content.category}-${uuidv4()}`,
      content: `${content.title}: ${content.content}`,
      metadata: {
        title: content.title,
        category: content.category,
        tags: content.tags || [],
        ...content.metadata
      }
    }];
  }
  
  // For longer content, split into chunks with some overlap
  const chunks = chunkContent(content.content, 800, 100);
  return chunks.map((chunk, index) => ({
    id: `${content.id || content.category}-${uuidv4()}`,
    content: `${content.title} (Part ${index + 1}): ${chunk}`,
    metadata: {
      title: content.title,
      category: content.category,
      part: index + 1,
      totalParts: chunks.length,
      tags: content.tags || [],
      ...content.metadata
    }
  }));
}

/**
 * Split text into chunks of approximately chunkSize with overlap
 */
export function chunkContent(text: string, chunkSize: number = 800, overlap: number = 100): string[] {
  const chunks: string[] = [];
  let startPos = 0;
  
  while (startPos < text.length) {
    // Calculate end position, but try to end at a sentence or paragraph
    let endPos = Math.min(startPos + chunkSize, text.length);
    
    // If not at the end of text, try to find a good break point
    if (endPos < text.length) {
      const breakPoints = ['. ', '.\n', '\n\n', '. ', '! ', '? '];
      let bestBreakPoint = endPos;
      
      // Look for natural break points
      for (const breakPoint of breakPoints) {
        const pos = text.lastIndexOf(breakPoint, endPos);
        if (pos > startPos && pos < endPos && pos > bestBreakPoint - 100) {
          bestBreakPoint = pos + breakPoint.length;
          break;
        }
      }
      
      endPos = bestBreakPoint;
    }
    
    // Add chunk to the list
    chunks.push(text.substring(startPos, endPos).trim());
    
    // Move start position, accounting for overlap
    startPos = endPos - overlap;
    if (startPos < 0 || startPos >= text.length) break;
  }
  
  return chunks;
}

/**
 * Process all portfolio content for embedding
 */
export async function processPortfolioContent(content: PortfolioContent[] = PORTFOLIO_CONTENT): Promise<void> {
  try {
    console.log(`Processing ${content.length} portfolio content items for embedding...`);
    
    // Prepare all content for embedding
    const embeddingItems: EmbeddingItem[] = content.flatMap(prepareContentForEmbedding);
    
    // Process embeddings (generate and store in Supabase)
    await processEmbeddings(embeddingItems);
    
    console.log(`Successfully processed ${embeddingItems.length} embedding items from ${content.length} content sources.`);
  } catch (error) {
    console.error('Error processing portfolio content:', error);
    throw error;
  }
}
