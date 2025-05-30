# IDE-Themed Portfolio

An IDE-themed portfolio website with tabbed navigation, case study viewer, and terminal chat functionality.

## Features

- **IDE Layout**: Tabbed navigation, panels, and terminal interface
- **Case Study Display**: Frame-by-frame content viewer with image previews
- **Terminal Chat**: LLM-powered chat interface with context from portfolio content
- **Modern Design**: Dark theme with IDE-inspired UI components

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Vector Storage**: Supabase (planned)
- **LLM Integration**: Groq/Mixtral via LangChain (planned)

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/           # React components
│   ├── ui/               # Core UI components
│   ├── IDE/              # IDE-specific components
│   ├── CaseStudy/        # Case study viewer and explorer components
│   └── Chat/             # Chat interface components (planned)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
│   ├── cms/              # Content management system API and types
│   └── store.ts          # Zustand store for state management
├── styles/               # Global styles and design tokens
└── types/                # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Design System

The project uses a comprehensive design system with CSS variables for:

- Color tokens
- Typography
- Spacing
- Animations
- Border radius

All components are built with accessibility and performance in mind.

## Development Phases

1. **Foundation & Design System** ✅ (Completed - 6/7 tasks)
2. **IDE Layout & Navigation** ✅ (Completed - 7/7 tasks)
3. **Content Management & Case Studies** ✅ (Completed - 9/9 tasks)
4. **Terminal Chat System**
5. **LLM Integration & Training**
6. **Analytics & Monitoring**
7. **Performance & Polish**
8. **Deployment & Launch**

## License

[MIT](LICENSE)
