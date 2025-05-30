import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding, processEmbeddings } from '@/lib/embedding';
import { v4 as uuidv4 } from 'uuid';

export interface EmbeddingRequest {
  content: string;
  id?: string;
  metadata?: Record<string, any>;
}

export interface BatchEmbeddingRequest {
  items: EmbeddingRequest[];
}

export async function POST(request: NextRequest) {
  try {
    const body: EmbeddingRequest | BatchEmbeddingRequest = await request.json();
    
    // Single item embedding
    if ('content' in body) {
      const { content, id = uuidv4(), metadata = {} } = body;
      
      if (!content || typeof content !== 'string') {
        return NextResponse.json(
          { error: 'Invalid request: content is required and must be a string' },
          { status: 400 }
        );
      }
      
      // Generate embedding
      const embedding = await generateEmbedding(content);
      
      return NextResponse.json({
        id,
        embedding,
        metadata,
        dimensions: embedding.length
      });
    } 
    // Batch embedding processing
    else if ('items' in body && Array.isArray(body.items)) {
      const { items } = body;
      
      if (items.length === 0) {
        return NextResponse.json(
          { error: 'Invalid request: items array cannot be empty' },
          { status: 400 }
        );
      }
      
      // Process and store all embeddings
      const processableItems = items.map(item => ({
        id: item.id || uuidv4(),
        content: item.content,
        metadata: item.metadata || {}
      }));
      
      await processEmbeddings(processableItems);
      
      return NextResponse.json({
        success: true,
        processed: items.length,
        message: `Successfully processed ${items.length} embeddings`
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error processing embedding request:', error);
    return NextResponse.json(
      { error: 'Failed to process embedding request' },
      { status: 500 }
    );
  }
}

// GET method for health check
export async function GET() {
  return NextResponse.json({ status: 'Embeddings API is operational' });
}
