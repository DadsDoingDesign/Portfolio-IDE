"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function TestLLM() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      
      const data = await res.json();
      setResponse(data.message.text);
    } catch (err) {
      console.error('Error testing LLM:', err);
      setError('Error connecting to the LLM. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-ide-bg-primary text-ide-text-primary">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">LLM Integration Test</h1>
        <p className="text-ide-text-secondary">
          Test the Mistral AI integration for the IDE Portfolio project
        </p>
      </header>

      <div className="flex-1 bg-ide-bg-secondary p-4 rounded-md mb-4">
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Response:</h2>
          {loading ? (
            <div className="text-ide-text-secondary animate-pulse">
              LLM is thinking...
            </div>
          ) : response ? (
            <div className="bg-ide-bg-overlay p-4 rounded">
              {response}
            </div>
          ) : (
            <div className="text-ide-text-secondary">
              Send a message to see the LLM response
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
              {error}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-ide-bg-secondary p-4 rounded-md">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about the portfolio..."
            className="flex-1 p-2 bg-ide-bg-overlay text-ide-text-primary border border-ide-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-ide-accent"
            disabled={loading}
          />
          <Button 
            type="submit" 
            disabled={loading || !input.trim()}
            className="ml-2"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
