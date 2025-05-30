# IDE Portfolio Design System

## 🎨 Design Tokens & Variables

### Color Palette

#### Root Colors (Base Palette)
```css
:root {
  /* Neutral Colors */
  --root-black: #000000;
  --root-gray-900: #1a1a1a;
  --root-gray-800: #242424;
  --root-gray-700: #2d2d2d;
  --root-gray-600: #333333;
  --root-gray-500: #404040;
  --root-gray-400: #808080;
  --root-gray-300: #a0a0a0;
  --root-gray-200: #cccccc;
  --root-gray-100: #e5e5e5;
  --root-white: #ffffff;
  
  /* Brand Colors */
  --root-blue-500: #4a9eff;
  --root-blue-600: #3a8eef;
  --root-blue-400: #5aafff;
  
  /* Semantic Colors */
  --root-green-500: #4ade80;
  --root-yellow-500: #fbbf24;
  --root-red-500: #ef4444;
}
```

#### Semantic Color Tokens
```css
:root {
  /* Background Colors */
  --color-bg-primary: var(--root-gray-900);      /* Main background */
  --color-bg-secondary: var(--root-gray-800);    /* Card/panel background */
  --color-bg-tertiary: var(--root-gray-700);     /* Hover states */
  --color-bg-elevated: var(--root-gray-600);     /* Elevated elements */
  
  /* Text Colors */
  --color-text-primary: var(--root-white);       /* Primary text */
  --color-text-secondary: var(--root-gray-300);  /* Secondary text */
  --color-text-tertiary: var(--root-gray-400);   /* Muted text */
  --color-text-accent: var(--root-blue-500);     /* Links/highlights */
  
  /* Accent Colors */
  --color-accent-primary: var(--root-blue-500);  /* Primary accent */
  --color-accent-success: var(--root-green-500); /* Success states */
  --color-accent-warning: var(--root-yellow-500);/* Warning states */
  --color-accent-error: var(--root-red-500);     /* Error states */
  
  /* Border Colors */
  --color-border-primary: var(--root-gray-600);  /* Primary borders */
  --color-border-secondary: var(--root-gray-500);/* Secondary borders */
  --color-border-active: var(--root-blue-500);   /* Active/focus borders */
  
  /* Component Specific */
  --color-tab-bg: transparent;                    /* Inactive tab */
  --color-tab-bg-active: var(--root-gray-800);   /* Active tab */
  --color-tab-border: var(--root-gray-600);      /* Tab border */
  
  /* Transparency Variants */
  --color-bg-overlay: rgba(26, 26, 26, 0.95);    /* Modal/overlay backgrounds */
  --color-bg-hover: rgba(255, 255, 255, 0.05);   /* Subtle hover states */
  --color-border-subtle: rgba(255, 255, 255, 0.1);/* Subtle borders */
}
```

#### Dark Theme Color Mapping
```css
/* This structure allows for easy theme switching in the future */
[data-theme="dark"] {
  /* All semantic tokens reference the root colors */
  /* Currently set to dark theme by default */
}

/* Example usage in components */
.component {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}

.component:hover {
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-border-secondary);
}

.component.active {
  border-color: var(--color-border-active);
  color: var(--color-accent-primary);
}
```

### Typography

```css
/* Font Families */
--font-mono: 'SF Mono', 'Monaco', 'Consolas', monospace;
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Spacing

```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Layout

```css
/* Container Widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;

/* Panel Heights */
--header-height: 48px;
--tab-height: 40px;
--status-bar-height: 32px;
--terminal-height: 320px;

/* Border Radius */
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
```

### Animations

```css
/* Durations */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;

/* Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Master Color System Setup Prompt

**Windsurf AI Prompt for Initial Setup**:
```
Set up a comprehensive color system for an IDE-themed portfolio:

1. Create a globals.css file with root color variables:
   - Root colors (--root-gray-900 through --root-white)
   - Brand colors (--root-blue-500, etc.)
   - Semantic color tokens that reference root colors
   - All backgrounds, text, borders, and accents

2. Configure Tailwind to use CSS variables:
   - Extend theme with custom color mappings
   - Create 'ide' color namespace
   - Map all semantic tokens to Tailwind classes

3. Create a ThemeProvider component:
   - Applies root colors to document
   - Supports future theme switching
   - Handles system preference detection

4. Create color utility functions:
   - getRootColor(name): Get computed color value
   - setRootColor(name, value): Update color dynamically
   - generateColorScale(baseColor): Create color variations

5. Document all colors in a Colors.stories.tsx file:
   - Visual swatches for all colors
   - Copy-to-clipboard functionality
   - Usage examples for each semantic token

Use this exact root color palette:
- Gray scale: #000000, #1a1a1a, #242424, #2d2d2d, #333333, #404040, #808080, #a0a0a0, #cccccc, #e5e5e5, #ffffff
- Blue: #4a9eff (primary), #3a8eef (darker), #5aafff (lighter)
- Green: #4ade80 (success)
- Yellow: #fbbf24 (warning)
- Red: #ef4444 (error)
```

---

## 🎨 Color System Architecture

### Benefits of Root Color System

1. **Single Source of Truth**: All colors are defined once in root variables
2. **Easy Theme Switching**: Can implement light/dark themes by changing semantic mappings
3. **Consistent Updates**: Change a root color and it updates everywhere
4. **Better Maintainability**: Clear separation between raw colors and their usage
5. **Design System Scalability**: Easy to add new semantic tokens without adding colors

### Color Usage Guidelines

```css
/* ✅ DO: Use semantic tokens in components */
.button {
  background: var(--color-accent-primary);
  color: var(--color-text-primary);
}

/* ❌ DON'T: Use root colors directly in components */
.button {
  background: var(--root-blue-500);
  color: var(--root-white);
}

/* ✅ DO: Create new semantic tokens when needed */
:root {
  --color-button-primary: var(--root-blue-500);
  --color-button-primary-hover: var(--root-blue-600);
}

/* ✅ DO: Use transparency variants for overlays */
.modal-backdrop {
  background: var(--color-bg-overlay);
}
```

### Implementing in Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind
        'ide': {
          'bg-primary': 'var(--color-bg-primary)',
          'bg-secondary': 'var(--color-bg-secondary)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          'accent': 'var(--color-accent-primary)',
        }
      }
    }
  }
}

// Usage in components
<div className="bg-ide-bg-primary text-ide-text-primary">
  Content
</div>
```

---

## 🧩 Component Library

### 1. TabBar Component

**Description**: Horizontal tab navigation with active states and close buttons

**Visual Specs**:
- Height: 40px
- Background: Transparent (inactive), `--color-bg-secondary` (active)
- Border-bottom: 1px solid `--color-border-primary`
- Tab padding: 0 16px
- Font: `--font-sans`, `--text-sm`

**States**:
- Default: Transparent background, `--color-text-secondary`
- Hover: `--color-bg-tertiary` background
- Active: `--color-bg-secondary` background, `--color-text-primary`
- Focus: `--color-border-active` outline

**Windsurf AI Prompt**:
```
Create a TabBar component with these specifications:
- Use a horizontal flexbox layout with overflow-x auto
- Each tab should have:
  - Icon support (optional)
  - Text label
  - Close button (X) that appears on hover
  - Active state styling with background color var(--color-tab-bg-active)
- Implement smooth transitions (200ms) for all state changes
- Add keyboard navigation (arrow keys to move between tabs)
- Close button should emit onClose event
- Support for "Preview All" tab that cannot be closed
- Use CSS custom properties for all colors:
  - Inactive text: var(--color-text-secondary)
  - Active text: var(--color-text-primary)
  - Hover background: var(--color-bg-tertiary)
  - Active background: var(--color-tab-bg-active)
  - Border: var(--color-tab-border)
```

### 2. ContentCard Component

**Description**: Container for case study sections with title and content

**Visual Specs**:
- Background: `--color-bg-secondary` (#242424)
- Border: 1px solid `--color-border-primary`
- Border-radius: `--radius-md` (6px)
- Padding: 24px
- Title: `--text-base`, `--font-semibold`
- Content: `--text-sm`, `--color-text-secondary`

**Windsurf AI Prompt**:
```
Build a ContentCard component:
- Dark card with var(--color-bg-secondary) background
- 1px solid var(--color-border-primary) border
- 6px border radius (var(--radius-md))
- 24px padding (var(--space-6))
- Title section with:
  - Text color: var(--color-text-primary)
  - Font size: var(--text-base)
  - Font weight: var(--font-semibold)
  - Bottom margin: var(--space-2)
- Content section with:
  - Text color: var(--color-text-secondary)
  - Font size: var(--text-sm)
  - Support for lists and paragraphs
- Optional icon next to title
- Hover state with border color change to var(--color-border-secondary)
- Use CSS custom properties for all values
```

### 3. Terminal Component

**Description**: Chat interface styled as a terminal/console

**Visual Specs**:
- Background: `--color-bg-primary` with subtle transparency
- Font: `--font-mono`
- Text color: `--color-text-primary`
- Cursor: Blinking animation
- Input prefix: ">"

**Windsurf AI Prompt**:
```
Create a Terminal component that mimics a command-line interface:
- Use monospace font (var(--font-mono))
- Dark background with var(--color-bg-overlay) for subtle transparency
- Message history with:
  - User messages prefixed with "> "
  - AI responses without prefix
  - Font size: var(--text-sm)
  - Line height: var(--leading-normal)
  - Text color: var(--color-text-primary)
- Input field at bottom:
  - Transparent background
  - No border, use var(--color-border-subtle) for bottom border only
  - Blinking cursor (var(--duration-slower) interval)
  - Text color: var(--color-text-primary)
- Auto-scroll to bottom on new messages
- Support for code blocks with syntax highlighting
- Clear command functionality
- Use CSS custom properties throughout
```

### 4. MobilePreview Component

**Description**: Container for displaying mobile mockups/previews

**Visual Specs**:
- Centered in panel
- Responsive scaling
- Fade in/out transitions
- Optional device frame

**Windsurf AI Prompt**:
```
Build a MobilePreview component:
- Centered container with max-width constraints
- Smooth fade in animation (300ms) when image loads
- Responsive scaling to fit container while maintaining aspect ratio
- Optional device frame overlay
- Loading state with skeleton screen
- Error state for failed image loads
- Support for both images and interactive iframes
- Zoom on click functionality (optional)
```

### 5. StatusBar Component

**Description**: Bottom status bar showing connection status and metadata

**Visual Specs**:
- Height: 32px
- Background: `--color-bg-secondary`
- Border-top: 1px solid `--color-border-primary`
- Font: `--text-xs`, `--color-text-secondary`

**Windsurf AI Prompt**:
```
Create a StatusBar component:
- Fixed height of 32px
- Background color #242424
- 1px solid #333333 top border
- Horizontal flex layout with:
  - Left section: Current page/section indicator
  - Center section: Optional message area
  - Right section: Status indicators (connection, etc.)
- 12px font size
- Secondary text color (#a0a0a0)
- Subtle pulse animation for connection indicator
- Items separated by vertical dividers
```

### 6. Tag Component

**Description**: Small labels for categories/technologies

**Visual Specs**:
- Background: `--color-bg-elevated` with 50% opacity
- Border: 1px solid `--color-border-primary`
- Border-radius: `--radius-sm`
- Padding: 4px 12px
- Font: `--text-xs`

**Windsurf AI Prompt**:
```
Build a Tag component:
- Inline-flex display
- Background: rgba(51, 51, 51, 0.5)
- 1px solid #333333 border
- 4px border radius
- Padding: 4px horizontal, 12px vertical
- 12px font size
- Text color: #a0a0a0
- Optional icon support
- Hover state with full opacity background
- Click handler for filtering (optional)
```

### 7. PanelDivider Component

**Description**: Resizable divider between left and right panels

**Visual Specs**:
- Width: 1px (4px on hover)
- Background: `--color-border-primary`
- Cursor: col-resize
- Drag handle on hover

**Windsurf AI Prompt**:
```
Create a PanelDivider component:
- Vertical divider with 1px width
- Background color #333333
- On hover:
  - Width increases to 4px
  - Cursor changes to col-resize
  - Background color #404040
- Draggable functionality to resize panels
- Minimum panel widths: 300px
- Maximum panel widths: 70% of container
- Smooth transition for width changes (150ms)
- Optional double-click to reset to default position
```

### 8. NavigationHeader Component

**Description**: Top navigation with logo and external links

**Visual Specs**:
- Height: 48px
- Background: `--color-bg-primary`
- Logo on left, links on right
- Hover states for links

**Windsurf AI Prompt**:
```
Build a NavigationHeader component:
- Fixed height of 48px
- Horizontal flex layout with space-between
- Left section:
  - Logo/brand text
  - Navigation items (Projects, About)
- Right section:
  - External links (Artwork, LinkedIn, Email)
  - Icons for each link
- Link styling:
  - Default: #a0a0a0 text
  - Hover: #ffffff text with 200ms transition
  - 14px font size
- Responsive behavior:
  - Hide text labels on mobile, show only icons
  - Hamburger menu for mobile (optional)
```

---

## 📐 Layout Patterns

### IDE Layout Structure

```
┌─────────────────────────────────────────┐
│          Navigation Header              │
├─────────────────────────────────────────┤
│              Tab Bar                    │
├─────────────┬───────────────────────────┤
│             │                           │
│   Content   │      Preview Panel        │
│    Panel    │                           │
│             │                           │
├─────────────┴───────────────────────────┤
│            Terminal/Chat                │
├─────────────────────────────────────────┤
│            Status Bar                   │
└─────────────────────────────────────────┘
```

### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) {
  /* Stack panels vertically */
  /* Hide preview panel */
  /* Minimize terminal */
}

/* Tablet */
@media (max-width: 1024px) {
  /* Reduce panel widths */
  /* Simplify navigation */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Full IDE layout */
  /* All panels visible */
}
```

---

## 🎯 Implementation Guidelines

### CSS Architecture

1. **Use CSS Modules** for component-specific styles
2. **Global variables** in `:root` for design tokens
3. **Utility classes** via Tailwind for common patterns
4. **CSS-in-JS** for dynamic styles only

### Component Structure

```typescript
// Example component structure
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Component: React.FC<ComponentProps> = ({
  className,
  children,
  variant = 'primary',
  size = 'md',
}) => {
  return (
    <div className={cn(
      'base-styles',
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </div>
  );
};
```

### Accessibility Requirements

- **ARIA labels** for all interactive elements
- **Keyboard navigation** for all components
- **Focus indicators** visible and clear
- **Color contrast** minimum 4.5:1 for text
- **Screen reader** announcements for state changes

---

## 🎯 Component Composition Examples

### Example: Complete TabBar Implementation
```tsx
// TabBar.module.css
.tabBar {
  display: flex;
  height: 40px;
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-primary);
  overflow-x: auto;
  scrollbar-width: none;
}

.tab {
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
  background: transparent;
  color: var(--color-text-secondary);
  border-right: 1px solid var(--color-border-primary);
  transition: all var(--duration-base) var(--ease-out);
  cursor: pointer;
  white-space: nowrap;
}

.tab:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.tab.active {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.closeButton {
  margin-left: var(--space-2);
  opacity: 0;
  transition: opacity var(--duration-fast);
}

.tab:hover .closeButton {
  opacity: 1;
}
```

### Example: Case Study Card Grid
```tsx
// CaseStudyGrid.module.css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  padding: var(--space-6);
}

.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  transition: border-color var(--duration-base) var(--ease-out);
}

.card:hover {
  border-color: var(--color-border-secondary);
}

.cardTitle {
  color: var(--color-text-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-2);
}

.cardContent {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

### Example: Terminal Chat Styling
```tsx
// Terminal.module.css
.terminal {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-bg-overlay);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--color-border-primary);
  transition: height var(--duration-slow) var(--ease-in-out);
}

.terminal.collapsed {
  height: 60px;
}

.terminal.expanded {
  height: 400px;
}

.input {
  width: 100%;
  height: 60px;
  padding: 0 var(--space-6);
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  outline: none;
}

.input::placeholder {
  color: var(--color-text-tertiary);
}

.messages {
  height: calc(100% - 60px);
  overflow-y: auto;
  padding: var(--space-4) var(--space-6);
}

.message {
  margin-bottom: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.userMessage {
  color: var(--color-text-primary);
}

.userMessage::before {
  content: '> ';
  color: var(--color-accent-primary);
}

.aiMessage {
  color: var(--color-text-secondary);
  padding-left: var(--space-4);
}
```

---

## 🚀 Quick Start Guide

1. **Copy the root colors and semantic tokens** to your `globals.css`
2. **Import the globals.css** in your `_app.tsx` or `layout.tsx`
3. **Configure Tailwind** to use the CSS variables
4. **Start building components** using the semantic tokens
5. **Test in browser** to ensure variables are loading correctly
6. **Use browser DevTools** to inspect and debug color values

### Debugging Tips
```javascript
// Check if CSS variables are loaded
getComputedStyle(document.documentElement)
  .getPropertyValue('--color-bg-primary'); // Should return '#1a1a1a'

// Update a color dynamically for testing
document.documentElement.style
  .setProperty('--color-accent-primary', '#00ff00');
```