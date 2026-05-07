# JAProjects Technical Documentation

## Architecture Overview

### Framework & Stack
- **Framework**: Next.js 16.2.4 (React 19)
- **Styling**: Tailwind CSS 4.2 + PostCSS
- **Theme**: next-themes with localStorage persistence
- **State Management**: Zustand
- **UI Components**: Custom + Radix UI (accessible primitives)
- **Icons**: Lucide React
- **Language**: TypeScript

## Theme System

### Colors (OKLch Color Space)
```
Light Mode:
- Background: oklch(0.99 0.001 250) - Nearly white
- Foreground: oklch(0.10 0.01 250) - Dark for contrast
- Primary: oklch(0.55 0.22 240) - Blue accent

Dark Mode:
- Background: oklch(0.09 0.01 250) - Very dark
- Foreground: oklch(0.95 0 0) - Near white
- Primary: oklch(0.65 0.22 240) - Brighter blue
```

### Implementation
- Smooth 300ms transitions between themes
- CSS custom properties for theme variables
- `@theme inline` for Tailwind integration
- Browser color-scheme optimization

## Translation System

### Structure
- Location: `hooks/use-language.ts`
- Storage: Zustand + localStorage
- Languages: Spanish (es), English (en)
- Persistence: Automatic via zustand middleware

### Usage
```typescript
const { t, language, setLanguage } = useLanguage()
// Usage: t('experience.dotnet')
```

### Adding Translations
1. Add entry to `translations` object in `use-language.ts`
2. Use in component: `{t('key.name')}`
3. Automatically persists and syncs across pages

## Performance Optimization

### Animation Timings
- **fade-in-up**: 0.6s (entrance animations)
- **float**: 5s (continuous movement)
- **pulse-glow**: 2.5s (background glow)
- **slide-up**: 0.5s (scrollable elements)
- **transitions**: 300ms (color/border changes)

### GPU Acceleration
- `will-change: transform, box-shadow` on animated elements
- `will-change: opacity` on pulsing elements
- Reduced motion detection for accessibility

## Responsive Breakpoints

```
Mobile:  < 640px
Tablet:  640px - 1024px
Desktop: > 1024px

Using Tailwind:
- sm: 640px
- lg: 1024px
```

## Component Structure

### Page Layout (`app/page.tsx`)
```
<main>
  ├── Navbar
  ├── HeroSection
  ├── AboutSection
  ├── ProjectsSection
  ├── StackSection
  ├── ExperienceSection
  ├── ContactSection
  └── Footer
</main>
```

### Key Components

#### Navbar
- Fixed positioning with scroll detection
- Active section highlighting
- Mobile menu with smooth transitions
- Theme toggle + language switcher

#### HeroSection
- Particle canvas (theme-aware)
- Animated gradient text
- Code card showcase
- CTA buttons

#### ProjectsSection
- Filter by technology
- Featured + regular cards
- Image with gradient overlay
- External links with icons

#### ContactSection
- Contact information grid
- Form with validation
- Success state display
- Auto-reset after 4 seconds

## Styling Patterns

### Utilities
```css
/* Theme-aware text gradient */
.text-gradient { }

/* Smooth color transitions */
.color-transition { }

/* Card hover with glow */
.glow-border { }
.card-hover { }

/* Focus ring for accessibility */
.focus-ring { }

/* Responsive patterns */
.bg-grid { }
.bg-dots { }
```

### Responsive Pattern
```html
<!-- Example responsive class -->
<section class="py-24 sm:py-32">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <!-- Content -->
  </div>
</section>
```

## Accessibility Features

### Keyboard Navigation
- All buttons and links keyboard accessible
- Tab order preserved
- Focus indicators visible
- `aria-label` on all icon buttons

### Color Contrast
- Light mode: WCAG AA+ (7:1 ratio)
- Dark mode: WCAG AA+ (4.5:1 minimum)
- Text on buttons always sufficient contrast

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

## Form Handling

### Contact Form States
1. **idle**: Ready to accept input
2. **sending**: Loading state with spinner
3. **sent**: Success message displayed
4. **error**: (Configurable in component)

### Auto-Reset Logic
```typescript
// After successful submission
setStatus('sent')
setForm({ name: '', email: '', message: '' })
setTimeout(() => setStatus('idle'), 4000)
```

## Build & Deployment

### Commands
```bash
# Install dependencies
pnpm install

# Development
pnpm dev          # Runs on http://localhost:3000

# Production
pnpm build        # Creates optimized build
pnpm start        # Runs production build
```

### Output
- Static site generation
- Zero JavaScript in CSS
- Optimized images
- Tree-shaken unused code

## SEO Optimization

### Metadata
- Dynamic title formatting
- Comprehensive description
- Keywords for developer portfolio
- Open Graph tags for sharing
- Twitter card configuration
- Structured metadata

### Location: `app/layout.tsx`

## Development Guidelines

### Adding New Sections
1. Create component in `components/`
2. Use consistent padding: `px-4 sm:px-6`
3. Use section spacing: `py-24 sm:py-32`
4. Add translations to `use-language.ts`
5. Include proper ARIA labels
6. Test on mobile/tablet/desktop

### Animation Best Practices
1. Keep under 600ms for most animations
2. Use ease-out or ease-in-out
3. Add `will-change` for performance
4. Respect `prefers-reduced-motion`
5. Test on slower devices

### Component Templates

```typescript
// New component template
'use client'

import { useLanguage } from '@/hooks/use-language'

export function ComponentName() {
  const { t } = useLanguage()
  
  return (
    <section id="component" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Content */}
      </div>
    </section>
  )
}
```

## Files Reference

| File | Purpose | Type |
|------|---------|------|
| `app/layout.tsx` | Root layout, theme provider | Layout |
| `app/page.tsx` | Home page | Page |
| `app/globals.css` | Global styles, animations | Styles |
| `hooks/use-language.ts` | Translation system | Hook |
| `components/navbar.tsx` | Navigation bar | Component |
| `components/*-section.tsx` | Page sections | Components |

## Future Enhancement Ideas

1. **Backend Integration**
   - Contact form email sending
   - Project data from database
   - Blog/article system

2. **Advanced Features**
   - Dark mode system preference detection
   - More language support
   - Analytics integration
   - Performance monitoring

3. **Content Enhancements**
   - Project images/screenshots
   - Case studies
   - Client testimonials
   - Blog posts

## Maintenance Notes

- Check Next.js updates monthly
- Monitor lighthouse scores
- Test theme switching regularly
- Verify translations accuracy
- Update content as needed
- Monitor performance metrics

---

**Last Updated**: April 30, 2026  
**Version**: 1.0.0  
**Status**: Production
