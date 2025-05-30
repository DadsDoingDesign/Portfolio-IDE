## 🖼️ Development Chunk 5: Case Study Display System
**Duration:** 5-6 days

### Key Components
- Case study content structure (Mission, Problem, Team, Timeline, etc.)
- ContentCard gri# IDE Portfolio Development Guide

## 📋 Project Overview
This guide breaks down the IDE-themed portfolio site into manageable development chunks, with specific prompts for Windsurf AI IDE and key questions for project clarity.

---

## 🔧 Development Chunk 1: Project Foundation & Setup
**Duration:** 2-3 days

### Key Components
- Next.js 14 App Router setup
- TypeScript configuration
- Tailwind CSS + CSS Modules setup
- Project structure
- Environment configuration
- Git repository initialization

### Technical Considerations
- Choosing between `pnpm`, `npm`, or `yarn`
- Setting up absolute imports
- Configuring ESLint and Prettier
- Setting up Husky for pre-commit hooks

### Integration Points
- Foundation for all future development
- Establishes coding standards and patterns
- Sets up deployment pipeline early

### 🤔 Creator Questions
1. Do you have a preferred package manager?
2. What's your GitHub repository name?
3. Do you want to set up CI/CD from the start?
4. Any specific ESLint rules or coding standards you follow?

### 🤖 Windsurf AI IDE Prompts
```
"Create a Next.js 14 project with TypeScript, Tailwind CSS, and the App Router. Set up the following folder structure:
- src/components (for reusable components)
- src/app (for pages and routes)
- src/lib (for utilities and configurations)
- src/hooks (for custom React hooks)
- src/styles (for global styles)
- src/types (for TypeScript types)

Include configurations for:
- Absolute imports using @/ prefix
- Tailwind CSS with CSS Modules support
- TypeScript strict mode
- ESLint with Next.js recommended rules
- Prettier configuration
- Environment variables setup with type safety"
```

---

## 🎨 Development Chunk 2: Design System & Core Components
**Duration:** 3-4 days

### Key Components
- Color palette implementation (dark theme)
- Typography system (mono and sans fonts)
- ContentCard component (for case study sections)
- Tag component (Fintech, Mobile, etc.)
- Base UI components
- Animation utilities with Framer Motion

### Technical Considerations
- CSS custom properties for theme variables
- Monospace font for terminal elements
- Card-based layout patterns
- Subtle hover states
- Consistent spacing system

### Integration Points
- Used throughout entire application
- Establishes IDE visual language
- Foundation for all UI components

### 🤔 Creator Questions
1. Is the blue accent (#4a9eff) your final brand color?
2. Preferred monospace font (SF Mono, Monaco, Consolas)?
3. Should cards have hover effects?
4. Any specific animation preferences (I see you prefer subtle)?

### 🤖 Windsurf AI IDE Prompts
```
"Create a design system based on an IDE theme with these specifications:
1. Color palette using CSS custom properties:
   - --color-bg-primary: #1a1a1a (main background)
   - --color-bg-secondary: #242424 (card backgrounds)
   - --color-bg-tertiary: #2d2d2d (hover states)
   - --color-text-primary: #ffffff
   - --color-text-secondary: #a0a0a0
   - --color-border-primary: #333333
   - --color-accent-primary: #4a9eff

2. Create ContentCard component:
   - Dark background (#242424)
   - 1px solid border (#333333)
   - 24px padding
   - Title and content sections
   - Support for lists and paragraphs

3. Create Tag component:
   - Semi-transparent background
   - Small border radius
   - 12px font size
   - Support for 'Fintech', 'Mobile' etc.

4. Set up typography system:
   - Sans font for UI elements
   - Monospace font for terminal/code
   - Size scale from 12px to 24px

5. Configure animation utilities:
   - Subtle fade transitions (200-300ms)
   - Tab switching animations
   - Smooth hover states"
```

---

## 💻 Development Chunk 3: IDE Layout & Navigation
**Duration:** 4-5 days

### Key Components
- NavigationHeader (Projects, About, external links)
- TabBar component (Preview All, Apploi, Umba, Simi, Gastrograph)
- Two-panel layout system (content left, preview right)
- Terminal/Chat component at bottom
- StatusBar (optional)
- Tab state management with Zustand

### Technical Considerations
- Fixed header with navigation
- Tab persistence and active states
- Panel sizing (approximately 60/40 split)
- Terminal can be minimized/expanded
- Smooth transitions between views

### Integration Points
- Main application shell
- Routes all navigation
- Houses case studies and chat

### 🤔 Creator Questions
1. Should the terminal be resizable/minimizable?
2. Fixed panel widths or resizable divider?
3. What happens on mobile (stack panels)?
4. Should tab state persist on refresh?

### 🤖 Windsurf AI IDE Prompts
```
"Build an IDE-themed layout with these specific components:

1. NavigationHeader:
   - Left: Logo/brand, 'Projects', 'About' links
   - Right: 'Artwork', 'LinkedIn', email links with icons
   - Fixed 48px height
   - Dark background (#1a1a1a)

2. TabBar component:
   - Tabs: Preview All, Apploi, Umba, Simi, Gastrograph
   - Active tab with #242424 background
   - Inactive tabs transparent
   - Close buttons on hover (except Preview All)
   - 40px height

3. Two-panel layout:
   - Left panel: Scrollable content area
   - Right panel: Preview/mockup display
   - Approximately 60/40 split
   - Optional resizable divider

4. Terminal component:
   - Fixed bottom position
   - Dark background with transparency
   - 'Chat with my portfolio' placeholder
   - Monospace font
   - Can expand to show chat history

5. Zustand store for state:
   - Active tab tracking
   - Terminal expanded/collapsed
   - Panel visibility
   - Navigation history"
```

---

## 📝 Development Chunk 4: Content Management Integration
**Duration:** 3-4 days

### Key Components
- CMS selection and setup (Strapi/Directus)
- Content models for case studies
- API integration layer
- Content versioning strategy

### Technical Considerations
- Self-hosting vs managed CMS
- Content caching strategy
- Image optimization
- Preview functionality

### Integration Points
- Feeds all portfolio content
- Enables easy updates
- Provides data for LLM training

### 🤔 Creator Questions
1. Do you prefer Strapi or Directus?
2. How often will you update content?
3. Do you need preview/draft functionality?
4. Will you need multiple user access to CMS?

### 🤖 Windsurf AI IDE Prompts
```
"Set up content management system integration:

1. Create API service layer for CMS:
   - Fetch case studies
   - Fetch individual case study by slug
   - Handle errors gracefully
   - Implement caching with SWR or React Query

2. Define TypeScript interfaces for:
   - Case study structure
   - Frame content
   - Image metadata
   - Project metadata

3. Create content utilities:
   - Markdown parsing (if needed)
   - Image URL construction
   - Content validation

4. Set up environment variables for CMS connection"
```

---

## 🖼️ Development Chunk 5: Case Study Display System
**Duration:** 5-6 days

### Key Components
- Frame-by-frame viewer
- Contextual image preview
- Scroll-based navigation
- Content transitions
- "Preview All" aggregation view

### Technical Considerations
- Large image loading strategy
- Scroll performance
- Memory management with multiple images
- Smooth transitions between frames

### Integration Points
- Core portfolio showcase
- Main user interaction point
- Feeds chat context

### 🤔 Creator Questions
1. How many frames per case study typically?
2. What image formats/sizes will you use?
3. Should images be zoomable/expandable?
4. Any specific transition effects between frames?

### 🤖 Windsurf AI IDE Prompts
```
"Build the case study display system:

1. FrameViewer component:
   - Scrollable container for frames
   - Smooth scroll with snap points (optional)
   - Progress indicator
   - Frame navigation controls

2. PreviewImage component:
   - Lazy loading with blur placeholder
   - Fade in/out based on active frame
   - Responsive sizing
   - Error state handling

3. CaseStudyLayout:
   - Split panel layout
   - Synchronize scroll position with image preview
   - Handle missing images gracefully

4. Preview All view:
   - Grid or list layout of all projects
   - Thumbnail previews
   - Click to open in new tab

5. Implement intersection observer for:
   - Tracking active frame
   - Triggering image loads
   - Analytics events"
```

---

## 💬 Development Chunk 6: Chat Interface & Terminal UI
**Duration:** 4-5 days

### Key Components
- Terminal-styled chat window
- Message list with formatting
- Input field with command styling
- Typing indicators
- Chat history management

### Technical Considerations
- Message rendering performance
- Auto-scroll behavior
- Input validation
- Mobile keyboard handling

### Integration Points
- Primary user interaction method
- Connects to LLM backend
- Generates analytics data

### 🤔 Creator Questions
1. Should chat support markdown formatting?
2. Any specific terminal commands to support?
3. Should chat history persist between sessions?
4. Maximum message length?

### 🤖 Windsurf AI IDE Prompts
```
"Create a terminal-themed chat interface:

1. Terminal component:
   - Dark theme with monospace font
   - Green text on black background option
   - Blinking cursor
   - Terminal-style prompt (>)

2. MessageList component:
   - Render user and AI messages differently
   - Support code blocks with syntax highlighting
   - Auto-scroll to bottom on new messages
   - Smooth scroll animation

3. ChatInput component:
   - Terminal-style input field
   - Enter to send, Shift+Enter for new line
   - Character limit indicator
   - Loading state during API calls

4. TypingIndicator component:
   - Three dots animation
   - 'AI is thinking...' message
   - Smooth fade in/out

5. Implement chat state management:
   - Message history
   - Sending/loading states
   - Error handling
   - Clear chat functionality"
```

---

## 🤖 Development Chunk 7: LLM Integration & Training
**Duration:** 5-7 days

### Key Components
- Supabase vector storage setup
- Embedding pipeline
- Groq/Mixtral integration
- LangChain configuration
- Training data processing

### Technical Considerations
- API rate limiting
- Response streaming
- Context window management
- Error handling and fallbacks

### Integration Points
- Powers entire chat experience
- Uses content from CMS
- Generates personalized responses

### 🤔 Creator Questions
1. What topics should the AI focus on?
2. Any specific tone/personality for responses?
3. Should it refuse certain types of questions?
4. How technical should responses be?

### 🤖 Windsurf AI IDE Prompts
```
"Set up LLM integration with these components:

1. Supabase vector storage:
   - Create embeddings table
   - Set up vector search function
   - Implement embedding generation pipeline

2. Training data processor:
   - Parse case studies into chunks
   - Extract key information from resume
   - Process interview responses
   - Generate embeddings with OpenAI

3. LangChain setup:
   - Configure Groq client with Mixtral
   - Create retrieval chain
   - Implement conversation memory
   - Add context injection from vectors

4. API route for chat:
   - Handle message streaming
   - Implement rate limiting
   - Add error handling
   - Log conversations to Supabase

5. Create training data structure:
   - Case study summaries
   - Technical skills context
   - Work experience details
   - Personal brand voice"
```

---

## 📊 Development Chunk 8: Analytics & Monitoring
**Duration:** 3-4 days

### Key Components
- Vercel Analytics integration
- Custom event tracking
- Chat analytics dashboard
- Error monitoring
- Performance tracking

### Technical Considerations
- Privacy compliance
- Data retention policies
- Dashboard performance
- Real-time updates

### Integration Points
- Tracks all user interactions
- Monitors chat quality
- Identifies content gaps

### 🤔 Creator Questions
1. What metrics are most important to you?
2. How long should chat logs be retained?
3. Do you need real-time analytics?
4. Any privacy concerns with tracking?

### 🤖 Windsurf AI IDE Prompts
```
"Implement analytics and monitoring:

1. Set up Vercel Analytics:
   - Page view tracking
   - Web vitals monitoring
   - Custom events for tab switches

2. Custom analytics service:
   - Track case study views and duration
   - Log chat interactions
   - Monitor scroll depth
   - Record unanswered questions

3. Supabase analytics tables:
   - Create schema for events
   - Set up chat session logging
   - Implement data retention policies

4. Analytics dashboard:
   - Chat conversation viewer
   - Question frequency analysis
   - Popular content sections
   - Error logs viewer

5. Implement tracking hooks:
   - useAnalytics for event logging
   - usePageView for route tracking
   - useChatAnalytics for conversation metrics"
```

---

## ⚡ Development Chunk 9: Performance & Polish
**Duration:** 4-5 days

### Key Components
- Image optimization
- Code splitting
- Animation performance
- SEO optimization
- Accessibility improvements

### Technical Considerations
- Bundle size optimization
- Lighthouse score targets
- Animation frame rates
- Cache strategies

### Integration Points
- Affects entire application
- Improves user experience
- Ensures scalability

### 🤔 Creator Questions
1. Target devices/browsers?
2. Any specific performance KPIs?
3. SEO keywords to target?
4. Accessibility requirements?

### 🤖 Windsurf AI IDE Prompts
```
"Optimize performance and add polish:

1. Image optimization:
   - Implement next/image with blur placeholders
   - Set up image optimization API
   - Create responsive image sizes
   - Lazy load images outside viewport

2. Code splitting:
   - Dynamic imports for heavy components
   - Route-based code splitting
   - Optimize bundle sizes

3. Animation optimization:
   - Use CSS transforms over position
   - Implement will-change properly
   - Add reduced motion support
   - GPU acceleration for smooth animations

4. SEO optimization:
   - Meta tags for all pages
   - Structured data for portfolio
   - Sitemap generation
   - Open Graph tags

5. Accessibility:
   - ARIA labels for IDE components
   - Keyboard navigation support
   - Screen reader compatibility
   - Color contrast validation"
```

---

## 🚀 Development Chunk 10: Deployment & Launch
**Duration:** 2-3 days

### Key Components
- Environment configuration
- Deployment pipeline
- Domain setup
- Monitoring setup
- Launch checklist

### Technical Considerations
- Environment variables security
- CDN configuration
- Error tracking
- Backup strategies

### Integration Points
- Makes project live
- Enables continuous deployment
- Sets up monitoring

### 🤔 Creator Questions
1. Do you have a domain ready?
2. Any specific security requirements?
3. Backup frequency preferences?
4. Launch date target?

### 🤖 Windsurf AI IDE Prompts
```
"Prepare for deployment:

1. Vercel deployment setup:
   - Configure environment variables
   - Set up preview deployments
   - Configure custom domain
   - Enable analytics

2. GitHub Actions CI/CD:
   - Automated testing
   - Build verification
   - Deployment triggers
   - Environment protection rules

3. Production checklist:
   - Environment variables verified
   - API keys secured
   - Rate limiting configured
   - Error monitoring active
   - Analytics tracking verified

4. Security headers:
   - Content Security Policy
   - CORS configuration
   - Rate limiting rules
   - Input sanitization

5. Post-launch monitoring:
   - Set up alerts for errors
   - Monitor performance metrics
   - Track user engagement
   - Plan iteration cycles"
```

---

## 📅 Development Timeline Summary

| Chunk | Duration | Dependencies |
|-------|----------|--------------|
| 1. Foundation | 2-3 days | None |
| 2. Design System | 3-4 days | Chunk 1 |
| 3. IDE Layout | 4-5 days | Chunks 1, 2 |
| 4. CMS Integration | 3-4 days | Chunk 1 |
| 5. Case Studies | 5-6 days | Chunks 3, 4 |
| 6. Chat Interface | 4-5 days | Chunks 2, 3 |
| 7. LLM Integration | 5-7 days | Chunks 4, 6 |
| 8. Analytics | 3-4 days | All previous |
| 9. Performance | 4-5 days | All previous |
| 10. Deployment | 2-3 days | All previous |

**Total Timeline: 35-46 days**

---

## 🎯 Success Metrics

### Technical Metrics
- Lighthouse score > 90
- Initial load < 3s
- Chat response < 5s
- Zero critical errors in production

### User Engagement Metrics
- Average session duration > 3 minutes
- Chat engagement rate > 50%
- Case study completion rate > 60%
- Return visitor rate > 30%

### Development Metrics
- Code coverage > 80%
- Build time < 2 minutes
- Deployment frequency: Daily
- Bug resolution time < 24 hours

---

## 💡 Pro Tips for Windsurf AI IDE

1. **Use Contextual Prompts**: Always provide the full context of what you've already built when asking for the next component.

2. **Iterative Development**: Start with basic functionality, then add animations and polish in subsequent prompts.

3. **Type Safety First**: Always ask for TypeScript interfaces and types before implementing components.

4. **Test As You Go**: Include test creation in your prompts for critical functionality.

5. **Documentation**: Ask for inline documentation and README updates with each major component.

---

## 🔄 Iteration Cycles

After launch, plan for these iteration cycles:

1. **Week 1-2**: Bug fixes and performance optimization
2. **Week 3-4**: Analytics-driven improvements
3. **Month 2**: Feature additions based on user feedback
4. **Month 3**: Content expansion and LLM training refinement

Remember: This is a living document. Adjust timelines and priorities based on your progress and discoveries during development.