# IDE Portfolio: LLM Integration Guide

This guide will walk you through integrating Large Language Model (LLM) capabilities into your IDE Portfolio project, including vector storage, embedding, and API connections. All steps are mapped to your project plan (Phase 5) and include direct links to official documentation and tools.

---

## Prerequisites
- Node.js and npm installed ([Download Node.js](https://nodejs.org/))
- Next.js project already set up
- Supabase account ([Sign up](https://app.supabase.com/))
- API access to your chosen LLM provider (Groq, Mixtral, OpenAI, etc.)

---

## 1. Supabase Vector Storage Setup

1. **Create a Supabase project:**
   - [Supabase Dashboard](https://app.supabase.com/)
2. **Get your API keys:**
   - Go to Project Settings > API in Supabase Dashboard
   - Copy `Project URL` and `Anon Key`
3. **Add credentials to your Next.js environment:**
   - Create or update `.env.local`:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```
4. **Create an `embeddings` table:**
   - Use the SQL Editor in Supabase ([Docs](https://supabase.com/docs/guides/database))
   - Example SQL:
     ```sql
     create table embeddings (
       id text primary key,
       embedding vector(384) -- adjust dimension as needed
     );
     ```

---

## 2. Embedding Pipeline

1. **Install required packages:**
   ```bash
   npm install @supabase/supabase-js
   # Add any embedding model packages as needed
   ```
2. **Implement embedding logic:**
   - See `src/lib/llm.ts` in your repo for the `generateEmbedding` function scaffold.
   - Replace the dummy implementation with your embedding model (e.g., OpenAI, HuggingFace, Groq).
   - [OpenAI Embeddings API](https://platform.openai.com/docs/guides/embeddings)
   - [HuggingFace Embeddings](https://huggingface.co/docs/transformers/index)

---

## 3. LLM API Integration (Groq/Mixtral/OpenAI)

1. **Choose your LLM provider:**
   - [Groq API](https://console.groq.com/)
   - [Mixtral (Mistral AI)](https://docs.mistral.ai/)
   - [OpenAI API](https://platform.openai.com/docs/api-reference/introduction)
2. **Get your API key from your provider.**
3. **Update `queryLLM` in `src/lib/llm.ts`:**
   - Implement the API call to your provider using their SDK or REST API.
   - Example (OpenAI):
     ```ts
     import { OpenAI } from 'openai';
     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
     // ...
     ```

---

## 4. LangChain Context Management (Optional)

- [LangChain.js Documentation](https://js.langchain.com/docs/)
- Use LangChain for advanced prompt/context window management.
- Update `manageContext` in `src/lib/llm.ts` as you integrate.

---

## 5. Storing and Retrieving Embeddings

- Use `storeEmbedding` and `getEmbedding` in `src/lib/llm.ts` to upsert and fetch vectors from Supabase.
- [Supabase JavaScript Client Docs](https://supabase.com/docs/reference/javascript/select)

---

## 6. Next.js API Route (Optional for Server-side LLM Calls)

- [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- Create a file in `src/pages/api/llm.ts` or `src/app/api/llm/route.ts` for server-side LLM requests.

---

## 7. Testing and Debugging

- Test embedding generation and storage using your UI or a script.
- Log errors and update your `bug-log.md` with any issues.
- Use [Supabase Table Editor](https://app.supabase.com/) to verify data.

---

## 8. Documentation & Workflow

- Update `project-plan.md` as you complete each step.
- Log bugs in `bug-log.md`.
- Document training data and LLM topics as needed.
- Follow your [Documentation Workflow](./memory-bank/documentation-workflow.md).

---

## Useful Links
- [Supabase Documentation](https://supabase.com/docs/)
- [OpenAI API Docs](https://platform.openai.com/docs/)
- [Groq API Docs](https://console.groq.com/docs)
- [Mistral AI Docs](https://docs.mistral.ai/)
- [LangChain.js Docs](https://js.langchain.com/docs/)
- [Next.js Documentation](https://nextjs.org/docs)

---

*Last updated: 2025-05-30*

---

If you need more examples or run into issues, ask Cascade for code samples or troubleshooting tips!
