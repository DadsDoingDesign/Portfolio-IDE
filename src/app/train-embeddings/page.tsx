"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { processPortfolioContent, PORTFOLIO_CONTENT } from '@/lib/training';

export default function TrainEmbeddings() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [log, setLog] = useState<string[]>([]);

  const addLogMessage = (message: string) => {
    setLog(prev => [...prev, message]);
  };

  const handleTrainEmbeddings = async () => {
    setLoading(true);
    setSuccess(false);
    setError('');
    setLog(['Starting training process...']);
    
    try {
      addLogMessage(`Processing ${PORTFOLIO_CONTENT.length} portfolio content items`);
      
      // Process each item one by one to show progress
      for (let i = 0; i < PORTFOLIO_CONTENT.length; i++) {
        const item = PORTFOLIO_CONTENT[i];
        addLogMessage(`Processing "${item.title}" (${item.category})...`);
        
        await processPortfolioContent([item]);
        
        addLogMessage(`✅ Completed ${i + 1}/${PORTFOLIO_CONTENT.length}: "${item.title}"`);
      }
      
      setSuccess(true);
      addLogMessage('🎉 All portfolio content has been successfully embedded!');
    } catch (err: any) {
      console.error('Error training embeddings:', err);
      setError(err.message || 'Unknown error occurred');
      addLogMessage(`❌ Error: ${err.message || 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-ide-bg-primary text-ide-text-primary">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Train Portfolio Embeddings</h1>
        <p className="text-ide-text-secondary">
          Process portfolio content and store embeddings in Supabase vector storage
        </p>
      </header>

      <div className="flex-1 bg-ide-bg-secondary p-4 rounded-md mb-4 overflow-auto">
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Training Log:</h2>
          
          {log.length === 0 ? (
            <div className="text-ide-text-secondary">
              Click the button below to start training embeddings
            </div>
          ) : (
            <div className="bg-ide-bg-overlay p-4 rounded font-mono text-sm h-80 overflow-auto">
              {log.map((message, index) => (
                <div key={index} className="mb-1">
                  {message}
                </div>
              ))}
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              Training completed successfully! Portfolio content is now embedded and ready for semantic search.
            </div>
          )}
        </div>
      </div>

      <div className="bg-ide-bg-secondary p-4 rounded-md">
        <h2 className="text-lg font-medium mb-4">Training Controls</h2>
        <p className="mb-4 text-ide-text-secondary">
          This will process {PORTFOLIO_CONTENT.length} portfolio content items, generate embeddings, 
          and store them in Supabase for semantic search. Make sure your Supabase database 
          is set up with the vector extension and embeddings table.
        </p>
        
        <Button 
          onClick={handleTrainEmbeddings} 
          disabled={loading}
        >
          {loading ? 'Processing...' : success ? 'Train Again' : 'Train Embeddings'}
        </Button>
      </div>
    </div>
  );
}
