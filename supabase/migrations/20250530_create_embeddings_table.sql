-- Create embeddings table with vector support
-- Execute this in your Supabase SQL Editor

-- Enable the pgvector extension if not already enabled
create extension if not exists vector;

-- Create the embeddings table
create table if not exists embeddings (
  id text primary key,
  embedding vector(384), -- HuggingFace all-MiniLM-L6-v2 dimension
  content text not null,  -- The original text content
  metadata jsonb,         -- Optional metadata (source, type, etc.)
  created_at timestamptz default now()
);

-- Create a function to match embeddings using cosine similarity
create or replace function match_embeddings(
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id text,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    e.id,
    e.content,
    e.metadata,
    1 - (e.embedding <=> query_embedding) as similarity
  from embeddings e
  where 1 - (e.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;
