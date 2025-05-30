/**
 * Embedding Pipeline Utilities for IDE Portfolio
 * Responsible for generating and managing text embeddings
 */

import { supabase } from './llm';

// Types for embedding operations
export interface EmbeddingItem {
  id: string;
  content: string;
  metadata?: Record<string, any>;
}

export interface VectorSearchResult {
  id: string;
  content: string;
  metadata?: Record<string, any>;
  similarity: number;
}

/**
 * Generate embeddings using HuggingFace's free Inference API
 * This uses a free embedding model that doesn't require an API key
 * The 'all-MiniLM-L6-v2' model is a popular, lightweight sentence embedding model
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // Use the free HuggingFace Inference API with no authentication required
    // This model produces 384-dimensional embeddings, suitable for vector search
    const response = await fetch(
      'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: text,
          options: { wait_for_model: true }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status} ${response.statusText}`);
    }

    // The API returns a direct array of embeddings
    const embedding = await response.json();
    
    if (!Array.isArray(embedding)) {
      throw new Error('Invalid embedding response format');
    }

    return embedding;
  } catch (error) {
    console.error('Error in embedding generation:', error);
    // Return zero vector as fallback (not ideal for production)
    return Array(384).fill(0); // all-MiniLM-L6-v2 embedding dimension
  }
}

/**
 * Process and store a batch of content items as embeddings
 */
export async function processEmbeddings(items: EmbeddingItem[]): Promise<void> {
  try {
    console.log(`Processing ${items.length} items for embedding...`);
    
    // Process in batches of 5 to avoid rate limits
    for (let i = 0; i < items.length; i += 5) {
      const batch = items.slice(i, i + 5);
      const promises = batch.map(async (item) => {
        const embedding = await generateEmbedding(item.content);
        return storeEmbedding(item.id, embedding, item.content, item.metadata);
      });
      
      await Promise.all(promises);
      console.log(`Processed batch ${i / 5 + 1} of ${Math.ceil(items.length / 5)}`);
      
      // Small delay between batches to respect rate limits
      if (i + 5 < items.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log('All embeddings processed successfully!');
  } catch (error) {
    console.error('Error processing embeddings:', error);
    throw error;
  }
}

/**
 * Store an embedding in Supabase with its content and metadata
 */
export async function storeEmbedding(
  id: string, 
  embedding: number[], 
  content: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    const { error } = await supabase.from('embeddings').upsert({
      id,
      embedding,
      content,
      metadata,
      created_at: new Date().toISOString(),
    });
    
    if (error) {
      console.error('Error storing embedding in Supabase:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in storeEmbedding:', error);
    throw error;
  }
}

/**
 * Search for similar content using vector similarity
 */
export async function searchSimilarContent(
  query: string,
  limit: number = 5,
  threshold: number = 0.7
): Promise<VectorSearchResult[]> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);
    
    // Search Supabase using vector similarity
    const { data, error } = await supabase
      .rpc('match_embeddings', {
        query_embedding: queryEmbedding,
        match_threshold: threshold,
        match_count: limit
      });
    
    if (error) {
      console.error('Error searching embeddings:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in searchSimilarContent:', error);
    return [];
  }
}
