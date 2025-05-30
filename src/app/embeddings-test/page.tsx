"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function EmbeddingsTest() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateEmbedding = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const res = await fetch('/api/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: input }),
      });
      
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Error generating embedding:', err);
      setError('Error generating embedding. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-ide-bg-primary text-ide-text-primary">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Embeddings Pipeline Test</h1>
        <p className="text-ide-text-secondary">
          Test the vector embedding pipeline for the IDE Portfolio project
        </p>
      </header>

      <div className="flex-1 bg-ide-bg-secondary p-4 rounded-md mb-4">
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Result:</h2>
          {loading ? (
            <div className="text-ide-text-secondary animate-pulse">
              Generating embedding...
            </div>
          ) : result ? (
            <div className="bg-ide-bg-overlay p-4 rounded overflow-auto max-h-96">
              <p><strong>ID:</strong> {result.id}</p>
              <p><strong>Dimensions:</strong> {result.dimensions}</p>
              <details>
                <summary className="cursor-pointer text-ide-accent">Show embedding vector</summary>
                <pre className="mt-2 p-2 bg-ide-bg-tertiary rounded text-xs overflow-auto">
                  {JSON.stringify(result.embedding.slice(0, 20))}... (truncated)
                </pre>
              </details>
            </div>
          ) : (
            <div className="text-ide-text-secondary">
              Submit text to generate an embedding vector
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
              {error}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleGenerateEmbedding} className="bg-ide-bg-secondary p-4 rounded-md">
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Text to embed:
          </label>
          <textarea
            id="content"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to generate an embedding vector..."
            className="w-full p-2 min-h-[100px] bg-ide-bg-overlay text-ide-text-primary border border-ide-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-ide-accent"
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading || !input.trim()}
        >
          Generate Embedding
        </Button>
      </form>
    </div>
  );
}
