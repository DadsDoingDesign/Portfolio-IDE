# IDE Portfolio Bug Log

## Overview
This document tracks bugs encountered during development of the IDE-themed portfolio site, along with their resolutions. Maintaining this log helps:
- Document common issues for future reference
- Track patterns in recurring problems
- Share knowledge on troubleshooting approaches

## Bug Log Entry Format
Each entry should include:
- 🪲 **Bug ID**: Sequential identifier (BUG-001, BUG-002, etc.)
- 📅 **Date**: When the bug was discovered
- 🏷️ **Category**: UI/UX, Performance, API, etc.
- 🔍 **Description**: Clear description of the issue
- 🛠️ **Resolution**: How it was fixed
- 🧠 **Lesson Learned**: Knowledge gained from the resolution

---

## Bug Log Entries

### BUG-001
- **Date**: 2025-05-30
- **Category**: Next.js/React
- **Description**: React Server Components error in Next.js 14 App Router. Components using React hooks (useState, useEffect) were failing with error: "You're importing a component that needs useState/useEffect. It only works in a Client Component but none of its parents are marked with 'use client'."
- **Environment**: Development environment using Next.js 14 with App Router
- **Reproducibility**: Occurs whenever client-side React features are used in components without the "use client" directive
- **Resolution**: Added "use client" directive at the top of all component files that use client-side features (IDELayout, TabBar, Panel, Terminal, StatusBar, Button, Tag components and the Zustand store)
- **Lesson Learned**: In Next.js 14 App Router, all components are React Server Components by default and cannot use client-side features like hooks or browser APIs. Always add the "use client" directive to components that need these features.

### BUG-002
- **Date**: 2025-05-30
- **Category**: CSS/Tailwind
- **Description**: Tailwind CSS error with @layer directive: `@layer base` is used but no matching `@tailwind base` directive is present. This caused styles not to be properly applied and console errors during development.
- **Environment**: Development environment using Next.js 14 with Tailwind CSS
- **Reproducibility**: Occurs when using Tailwind's @layer directives but the required @tailwind directives are commented out or missing in the CSS file.
- **Resolution**: Uncommented the required Tailwind directives in globals.css:
- 📅 **Date**: 2025-05-30
- 🏷️ **Category**: CSS/Tailwind
- 🔍 **Description**: Tailwind CSS error with @layer directive: `@layer base` is used but no matching `@tailwind base` directive is present. This caused styles not to be properly applied and console errors during development.
- ⚙️ **Environment**: Development environment using Next.js 14 with Tailwind CSS
- 🔄 **Reproducibility**: Occurs when using Tailwind's @layer directives but the required @tailwind directives are commented out or missing in the CSS file.
- 🛠️ **Resolution**: Uncommented the required Tailwind directives in globals.css:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- 🧠 **Lesson Learned**: When using Tailwind CSS features like @layer, the corresponding @tailwind directives must be present in the CSS file, even if they generate linting warnings in some editors. These directives are processed by the Tailwind compiler and are necessary for proper functionality.

### BUG-003
- 📅 **Date**: 2025-05-30
- 🏷️ **Category**: UI/Layout
- 🔍 **Description**: Terminal component had positioning and interaction issues: 1) It was floating over content using fixed positioning, breaking document flow; 2) The input field wasn't properly selectable/interactive; 3) Layout didn't match Figma designs with Terminal positioned incorrectly.
- ⚙️ **Environment**: Development environment in various browsers and device sizes
- 🔄 **Reproducibility**: Consistently reproducible in all environments - input field was difficult to select and terminal position didn't match designs.
- 🛠️ **Resolution**: 
  1. Changed Terminal positioning from `fixed` to `relative` within proper document flow
  2. Moved Terminal to be under the left panel content in a column layout
  3. Simplified focus management with direct DOM methods
  4. Added explicit click handlers to ensure input focus
  5. Removed redundant X button from Terminal header
  ```jsx
  // Terminal positioning fix
  <div className="relative w-full bg-ide-bg-overlay" /> // Instead of fixed positioning
  
  // Focus handling fix
  <input onClick={(e) => e.currentTarget.focus()} />
  ```
- 🧠 **Lesson Learned**: Using fixed positioning can break document flow and cause interaction issues. Always integrate UI components properly within the document structure, and ensure interactive elements have explicit focus handling.

---

## Common Issue Categories & Preventative Measures

### Next.js App Router
- ✅ Always use client/server components correctly
- ✅ Handle data fetching in the right component
- ✅ Be careful with nested layouts and loading states

### Tailwind CSS
- ✅ Verify purge configuration is correct
- ✅ Check for class naming conflicts
- ✅ Ensure responsive classes are properly ordered
- ✅ Include required @tailwind directives when using @layer

### TypeScript
- ✅ Define proper interfaces for all props
- ✅ Use strict type checking
- ✅ Avoid 'any' type when possible

### LLM Integration
- ✅ Handle API rate limits gracefully
- ✅ Implement proper error states for failed requests
- ✅ Test with varying context window sizes

### Performance
- ✅ Use React DevTools to identify unnecessary re-renders
- ✅ Implement proper code splitting
- ✅ Monitor and optimize bundle size

### BUG-004
- 📅 **Date**: 2025-05-30
- 🏷️ **Category**: LLM Integration/API
- 🔍 **Description**: OpenAI embedding API dependency created an unnecessary requirement for an additional paid API key when we only needed to use Mistral for LLM functionality. This could have created unnecessary costs and complexity for the project.
- ⚙️ **Environment**: Development environment using Next.js 14 with Mistral API
- 🔄 **Reproducibility**: Occurred during implementation of the embedding pipeline where we initially designed it to use OpenAI's embedding API.
- 🛠️ **Resolution**: 
  1. Replaced OpenAI embedding implementation with HuggingFace's free Inference API
  2. Modified vector dimensions from 1536 to 384 to match the HuggingFace model
  3. Updated Supabase schema to use the correct vector dimensions
  4. Verified the embedding function works without requiring additional API keys
  ```typescript
  // Changed from OpenAI to HuggingFace's free API
  export async function generateEmbedding(text: string): Promise<number[]> {
    // Use the free HuggingFace Inference API with no authentication required
    const response = await fetch(
      'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2',
      { /* ... */ }
    );
    // ...
  }
  ```
- 🧠 **Lesson Learned**: Always prioritize free and open-source options for core functionality before introducing dependencies on additional paid services. When a feature requires external APIs, evaluate whether there are cost-free alternatives that provide similar functionality, especially during development and testing phases.

---

## Recurring Issues Tracker
| Issue Pattern | Occurrences | Mitigation Strategy |
|---------------|-------------|---------------------|
| Tailwind directive issues | 1 | Ensure all required @tailwind directives are present when using @layer and other Tailwind features |
| UI positioning issues | 1 | Avoid fixed positioning when components need to be integrated into document flow |
| API dependencies | 1 | Evaluate free alternatives before introducing dependencies on paid services |

### BUG-005
- 📅 **Date**: 2025-05-30
- 🏷️ **Category**: Next.js/React
- 🔍 **Description**: Hydration error in streaming chat component due to server/client rendering mismatch. The error occurred because localStorage access and timestamp formatting were different between server and client rendering phases.
- ⚙️ **Environment**: Development environment using Next.js 14 with App Router
- 🔄 **Reproducibility**: Occurs when accessing browser-only APIs like localStorage during initial render or when displaying dynamic content like timestamps that might differ between server and client.
- 🛠️ **Resolution**: 
  1. Modified `useChatStreaming` hook to load localStorage data in a `useEffect` rather than during state initialization
  2. Added client-side conditional rendering for timestamp display to prevent hydration mismatch
  ```tsx
  // Before: Direct timestamp rendering
  {new Date(message.timestamp).toLocaleTimeString()}

  // After: Client-side only rendering for timestamps
  {typeof window !== 'undefined' ? new Date(message.timestamp).toLocaleTimeString() : ''}
  ```
  3. Created utility functions in `streaming.ts` for better SSE event handling
- 🧠 **Lesson Learned**: When using Next.js, be careful with browser-only APIs and dynamic content during initial render. Move browser-specific code to `useEffect` hooks and use conditional rendering for values that might differ between server and client to prevent hydration errors.

### BUG-006
- 📅 **Date**: 2025-05-30
- 🏷️ **Category**: Next.js/Node.js
- 🔍 **Description**: Node.js built-in module import error with `node:buffer` protocol when using `node-fetch` in the browser environment. Error message: "Module build failed: UnhandledSchemeError: Reading from 'node:buffer' is not handled by plugins (Unhandled scheme)."
- ⚙️ **Environment**: Development environment using Next.js 14 with App Router
- 🔄 **Reproducibility**: Occurs when importing Node-specific libraries (like `node-fetch`) that use Node.js built-in modules with the `node:` protocol prefix.
- 🛠️ **Resolution**: 
  1. Identified that the issue was caused by importing `node-fetch` in `src/lib/llm.ts`
  2. Removed the `node-fetch` import and relied on the native `fetch` API instead
  3. Created webpack polyfills for Node.js built-in modules for future compatibility
  ```typescript
  // Before: Using node-fetch which relies on Node.js built-ins
  import fetch from 'node-fetch';
  
  // After: Using native fetch available in both environments
  // No need to import external fetch library
  ```
  
  Additional webpack configuration:
  ```javascript
  const webpack = require('webpack');

  const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Polyfill Node.js built-in modules for the browser
        config.resolve.fallback = {
          buffer: require.resolve('buffer/'),
          // Other Node.js modules to polyfill
        };
      }
      return config;
    },
  };
  ```
- 🧠 **Lesson Learned**: When building isomorphic (universal) applications with Next.js, avoid using Node.js-specific libraries on the client side. Instead:
  1. Use browser-compatible alternatives or isomorphic libraries
  2. Use native APIs available in both environments when possible (like `fetch` instead of `node-fetch`)
  3. For APIs that must be used in both environments but have different implementations, use dynamic imports with the `import()` syntax

*Last Updated: 2025-05-30T12:45:00-04:00*
