# 🎮 Tetris Theme Documentation

## Overview

This blog features a sophisticated Tetris-inspired design that balances playful nostalgia with professional elegance. The theme evokes classic game aesthetics while maintaining excellent readability and modern web standards.

## Design Philosophy

**"What if a Tetris-obsessed developer built a blog in 2026"**

- Geometric precision meets organic content
- Retro game aesthetics with contemporary refinement
- Playful without being childish
- Fast, accessible, and readable above all

## Color Palette

### Primary Colors (Classic Tetris Pieces)
```css
--tetris-cyan:    #00f0f0  /* I-piece - Primary accent */
--tetris-blue:    #0000f0  /* J-piece */
--tetris-orange:  #f0a000  /* L-piece - Secondary accent */
--tetris-yellow:  #f0f000  /* O-piece */
--tetris-green:   #00f000  /* S-piece */
--tetris-purple:  #a000f0  /* T-piece - Tertiary accent */
--tetris-red:     #f00000  /* Z-piece */
```

### Neutrals
```css
--bg-dark:        #0a0a0f  /* Deep space background */
--bg-grid:        #141420  /* Code block background */
--text-primary:   #e0e0e8  /* Main text - high contrast */
--text-secondary: #a0a0b0  /* Metadata, dates */
--border-color:   #2a2a40  /* Subtle dividers */
```

### Usage
- **Cyan (#00f0f0):** Links, primary accents, "active" state
- **Purple (#a000f0):** Hover states, gradients
- **Orange (#f0a000):** Highlights, call-to-action elements
- **Others:** Decorative tetris pieces, tags

## Typography

### Fonts
- **Primary:** JetBrains Mono (300, 400, 500, 600, 700)
  - Used for: Body text, headings, code
  - Character: Clean, monospace, developer-friendly
  - Fallback: Space Mono, system monospace

### Hierarchy
```
H1: 3-5rem, bold, gradient (cyan → purple → orange)
H2: 2rem, bold, left border (cyan), in-article
H3: 1.25rem, bold
Body: 1.125rem, light (300), high line-height
Code: 0.9rem, cyan tint, bordered
Tags: 0.75rem, uppercase, tracked
```

## Visual Elements

### 1. Falling Tetrominos (Background)
- Animated unicode blocks (▓)
- Subtle opacity (0.03)
- 6-8 pieces falling at varied speeds
- Different colors per piece
- Pure CSS animation, no JavaScript
- **Performance:** GPU-accelerated transforms

### 2. Grid Background
- 40px × 40px grid pattern
- Extremely subtle (opacity: 0.05)
- Fixed position, always visible
- Evokes classic Tetris game board

### 3. Block Decorations
- Small colored squares (8-12px)
- Used for:
  - Header decoration (animated pulse)
  - Link prefixes
  - Dividers
  - List bullets (▓ symbol)

### 4. Post Cards
- Dark translucent background
- Border glow on hover
- Left accent bar (gradient: cyan → purple → orange)
- Subtle lift animation (2px)
- Block-based borders

### 5. Tetris Pieces (Icons)
- 12px colored squares with inset shadows
- 3D appearance
- Used as visual markers:
  - Twitter → Cyan
  - GitHub → Purple
  - Email → Orange
  - RSS → Green

### 6. Dividers
- Horizontal gradient lines
- Centered block decoration (2-4 squares)
- Low opacity (0.3)
- Used between sections

## Animations

### 1. Falling Tetrominos
```css
@keyframes fall {
  0%   { transform: translateY(-100px) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
}
```
- Duration: 15-25s (varied)
- Infinite loop
- Staggered delays
- Hardware-accelerated

### 2. Pulse (Header Blocks)
```css
@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.2); }
}
```
- Duration: 2s
- Staggered per block
- Gentle breathing effect

### 3. Hover States
- **Links:** Color shift + text shadow glow
- **Post cards:** Border glow + 2px lift
- **Social links:** 1px horizontal shift
- All transitions: 0.2-0.3s ease

## Layout Components

### Homepage
- **Header:**
  - Pulsing block decoration
  - Gradient title
  - Social links with tetris pieces
- **Post list:**
  - Card-based layout
  - Date with dot indicator
  - Tag pills
  - Hover effects

### Post Page
- **Header:**
  - Back link with animated arrow
  - Triple block decoration
  - Date + author metadata
- **Content:**
  - H2 with left cyan border (4px)
  - List bullets as tetris blocks (▓)
  - Code blocks with border + shadow
  - Generous spacing

### Footer
- Centered layout
- Divider with blocks
- Social links
- Tetris credit (▓ symbol)

## Responsive Design

- Mobile-first approach
- Breakpoints:
  - Small: < 640px (1 column, reduced font sizes)
  - Medium: 640-1024px
  - Large: > 1024px (max-width: 768px container)

- Adjustments:
  - Font scaling (4rem → 3rem on mobile)
  - Reduced tetromino count on small screens
  - Stack social links on mobile
  - Maintain readability at all sizes

## Performance Optimizations

### CSS
- No external dependencies (except fonts)
- GPU-accelerated animations (transform, opacity)
- Minimal repaints
- Efficient selectors

### Fonts
- Google Fonts with display=swap
- Subset: Latin only
- Weights: Only those needed

### Animations
- `will-change` where appropriate
- Opacity/transform only (no layout shifts)
- Reduced motion respected (can add)

### Build
- Static generation
- Minimal JavaScript
- Purged unused CSS (Tailwind)

## Accessibility

### Contrast
- WCAG AAA compliant
- Text: #e0e0e8 on #0a0a0f (16:1 ratio)
- Links: #00f0f0 with hover states

### Semantic HTML
- Proper heading hierarchy
- `<article>`, `<header>`, `<footer>`
- `<time>` elements for dates
- `aria-hidden` on decorative elements

### Keyboard Navigation
- All interactive elements focusable
- Visible focus states
- Logical tab order

### Screen Readers
- Descriptive link text
- Proper landmarks
- Alt text (when images used)

## Customization Guide

### Change Accent Color
Replace cyan (#00f0f0) references in:
- CSS variables (`:root`)
- Tailwind classes (`text-[#00f0f0]`)
- Gradients

### Adjust Tetromino Speed
In `page.tsx`, modify:
```tsx
animationDuration: `${15 + i * 3}s`  // Slower: increase values
```

### Disable Animations
Add to globals.css:
```css
@media (prefers-reduced-motion: reduce) {
  .tetromino { animation: none; }
  .block { animation: none; }
}
```

### Change Grid Size
In `globals.css`:
```css
background-size: 40px 40px;  /* Smaller: 20px; Larger: 60px */
```

### Toggle Dark/Light
Currently dark-only. For light mode:
1. Update CSS variables
2. Invert colors
3. Adjust tetromino opacity

## Code Blocks

### Styling
- Background: Dark grid (#141420)
- Border: Cyan left accent (4px)
- Font: JetBrains Mono
- Shadow: Subtle inset + drop
- Syntax highlighting: TBD (add Shiki/Prism)

### Future Enhancement
Add syntax highlighting with Shiki:
```bash
npm install shiki
```

Then update `lib/posts.ts` to process code blocks.

## Tag System

### Current Tags
- `parenting` - Family and fatherhood
- `ai` - AI and automation
- `ios` - iOS development
- `automation` - Tools and workflows
- `devtools` - Developer tools

### Styling
- Uppercase
- Letter-spaced
- Cyan border + background
- Glow on hover
- Small (0.75rem)

### Adding Custom Tag Colors
Update CSS:
```css
.tag[data-tag="urgent"] {
  border-color: var(--tetris-red);
  color: var(--tetris-red);
}
```

## Browser Support

- **Modern browsers:** Full support
- **Chrome/Edge:** 90+
- **Firefox:** 88+
- **Safari:** 14+

**Features requiring modern browsers:**
- CSS Grid
- CSS Custom Properties
- Backdrop filters
- CSS animations

**Graceful degradation:**
- Fallback fonts
- No animations on older browsers
- Accessible without CSS

## Known Issues

- None currently

## Future Enhancements

### Phase 2
- [ ] Actual playable Tetris easter egg (press 'T'?)
- [ ] Block-based loading spinner
- [ ] Animated page transitions
- [ ] Sound effects (mute toggle)
- [ ] High score counter (page views?)

### Phase 3
- [ ] Dark/light theme toggle
- [ ] Color scheme customizer
- [ ] Tetromino rain intensity slider
- [ ] Konami code easter egg

## Credits

**Inspired by:**
- Classic NES Tetris (1989)
- Modern terminal aesthetics
- Retro-futurism design movement

**Color palette:** Based on original Tetris piece colors
**Font:** JetBrains Mono by JetBrains
**Framework:** Next.js + Tailwind CSS

## Meta

This theme documentation was created for Karim Alweheshy's blog - a blog about building software through AI conversation, styled like Tetris, and built by an AI.

It's turtles all the way down. 🐢▓

---

**Last updated:** 2026-02-12  
**Version:** 1.0.0 (Tetris Edition)  
**Vibe:** Retro-modern, elegant-nerdy, fast-loading
