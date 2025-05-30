# 🖥️ IDE-Themed Portfolio Site PRD

## 📋 Executive Summary
A designer portfolio website themed as an IDE with an integrated LLM chat system trained on case studies, resume, and interview responses. The site will feature a terminal-style chat interface, tabbed navigation for case studies, and contextual image previews.

## 🏗️ Recommended Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS Modules for complex animations
- **State Management**: Zustand (for chat history, active tabs)
- **Animation**: Framer Motion
- **Icons**: Lucide React

### **Backend & Database**
- **Database**: Supabase
  - Vector storage for embeddings
  - Chat history persistence
  - Analytics data storage
- **CMS**: Strapi (self-hosted on Railway free tier) or Directus
- **LLM Pipeline**: 
  - **Embeddings**: OpenAI text-embedding-ada-002 (via Supabase)
  - **LLM**: Mixtral-8x7B via Groq (free tier - 30rpm, no token limits)
  - **Orchestration**: LangChain
- **Analytics**: Vercel Analytics + Custom Supabase logging

### **Development & Deployment**
- **IDE**: Windsurf
- **Version Control**: GitHub
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions

## 🎨 Design System Components

### **IDE Elements**
```typescript
// Core UI Components
- TabBar (with close buttons, active states)
- Panel (left content, right preview)
- Terminal (chat interface)
- StatusBar (connection status, indicators)
- ScrollableContent (case study frames)

// Animations
- TabSlide: 200ms ease-out
- PanelReveal: 300ms ease-in-out
- TypingEffect: 30ms per character
- LoadingDots: 400ms loop
- CursorBlink: 500ms interval
- StatusPulse: 1s ease-in-out
```

### **Color Palette** (from Figma)
```css
--bg-primary: #1a1a1a
--bg-secondary: #242424
--text-primary: #ffffff
--text-secondary: #888888
--accent: #007acc (or your brand color)
--terminal-green: #0f0
```

## 🔧 Core Features

### **1. Navigation System**
- **Tabbed Interface**
  - "Preview All" tab (default selected)
  - Individual case study tabs (3-4 total)
  - Smooth tab switching animations
  - Close button on each tab

### **2. Case Study Viewer**
- **Left Panel**: Frame-by-frame content display
  - Scrollable content area
  - Consistent structure per Figma designs
- **Right Panel**: Contextual image previews
  - Only visible when frame has associated image
  - Smooth fade-in/out transitions

### **3. Terminal Chat System**
- **Features**:
  - Real-time typing indicators
  - Scrollable chat history
  - Clear chat option
  - Input field with terminal styling
  - Response formatting for readability

### **4. LLM Training Data Structure**
```yaml
training_data:
  - case_studies:
      - umba: [mission, problem, solution, impact]
      - project_2: [...]
  - resume: [experience, skills, education]
  - linkedin: [profile_data, posts, recommendations]
  - interview_responses:
      - work_experience: [company_specific_questions]
      - design_process: [methodology, tools, approach]
      - personal: [values, goals, interests]
```

## 📊 Analytics Requirements

### **Tracked Metrics**
1. **User Behavior**
   - Case study views and duration
   - Tab switching patterns
   - Scroll depth per section
   
2. **Chat Analytics**
   - Full conversation logs
   - Question categories
   - Unanswered questions
   - Blocked query attempts

### **Dashboard Features**
- Vercel Analytics integration
- Custom Supabase dashboard for:
  - Chat conversation viewer
  - Question frequency analysis
  - Knowledge gap identification

## 🚀 Development Phases

### **Phase 1: Foundation** (Week 1-2)
- Set up Next.js project with TypeScript
- Implement design system and core components
- Create IDE layout with tab system
- Set up Supabase and CMS

### **Phase 2: Content System** (Week 3)
- Integrate CMS with version control
- Build case study frame renderer
- Implement image preview system
- Create content management workflow

### **Phase 3: LLM Integration** (Week 4-5)
- Set up embedding pipeline
- Implement Groq/Mixtral integration
- Build chat interface
- Create training data structure

### **Phase 4: Polish & Analytics** (Week 6)
- Add animations and transitions
- Implement analytics tracking
- Build analytics dashboard
- Performance optimization

## 🔐 Security & Performance

### **Security**
- No user auth required
- Rate limiting on chat API
- Content filtering for inappropriate queries
- Secure vector storage in Supabase

### **Performance Targets**
- Initial load: < 3s
- Case study navigation: < 100ms
- Chat response: < 5s (acceptable for free tier)
- Lighthouse score: > 90

## 🗺️ Future Enhancements
- Dark/light theme toggle
- Mobile-optimized experience
- Command palette for power users
- Export chat conversations
- A/B testing for different responses

## 📝 Technical Architecture

### **Data Flow**
```
User Input → Chat Interface → LangChain
                ↓
        Groq API (Mixtral)
                ↓
        Vector Search (Supabase)
                ↓
        Formatted Response → Terminal Display
```

### **Component Structure**
```
src/
├── components/
│   ├── IDE/
│   │   ├── TabBar.tsx
│   │   ├── Panel.tsx
│   │   ├── Terminal.tsx
│   │   └── StatusBar.tsx
│   ├── CaseStudy/
│   │   ├── FrameViewer.tsx
│   │   └── PreviewImage.tsx
│   └── Chat/
│       ├── MessageList.tsx
│       ├── InputField.tsx
│       └── TypingIndicator.tsx
├── hooks/
│   ├── useChat.ts
│   ├── useAnalytics.ts
│   └── useCaseStudy.ts
├── lib/
│   ├── supabase.ts
│   ├── langchain.ts
│   └── cms.ts
└── styles/
    ├── globals.css
    └── animations.css
```

### **Database Schema**
```sql
-- Supabase Tables
-- Chat Sessions
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP,
  messages JSONB[],
  user_agent TEXT
);

-- Analytics Events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY,
  event_type TEXT,
  event_data JSONB,
  session_id UUID,
  created_at TIMESTAMP
);

-- Vector Embeddings (handled by Supabase Vector)
```

## 🔑 Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# LLM
GROQ_API_KEY=
OPENAI_API_KEY= # For embeddings only

# CMS
CMS_API_URL=
CMS_API_TOKEN=

# Analytics
VERCEL_ANALYTICS_ID=
```

## 🧪 Testing Strategy
- Unit tests for utility functions
- Integration tests for chat flow
- E2E tests for critical user paths
- Performance testing for animations
- Accessibility testing (WCAG 2.1 AA)

## 📦 Deployment Checklist
- [ ] Environment variables configured
- [ ] Supabase database migrations run
- [ ] CMS content populated
- [ ] LLM training data indexed
- [ ] Analytics tracking verified
- [ ] Performance benchmarks met
- [ ] Security headers configured
- [ ] Error monitoring set up