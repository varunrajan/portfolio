# Portfolio Site

A clean, maintainable portfolio site built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14** (App Router) - React framework with file-based routing
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **MDX** - Markdown with JSX for case study content
- **gray-matter** - Front matter parsing for MDX files

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with global styles
│   ├── page.tsx           # Home page
│   ├── work-with-me/      # Work With Me page
│   ├── contact/           # Contact page
│   └── case-studies/      # Case studies pages
│       ├── page.tsx       # Case studies index
│       └── [slug]/        # Dynamic case study pages
├── components/            # Reusable React components
│   ├── Layout.tsx        # Header, nav, footer wrapper
│   ├── Section.tsx       # Consistent section spacing
│   ├── Button.tsx        # Primary/secondary buttons
│   ├── Card.tsx          # Card container component
│   ├── Timeline.tsx      # Timeline component with push/pull
│   └── CallToActionStrip.tsx
├── lib/                  # Utility functions
│   └── case-studies.ts   # MDX reading utilities
├── styles/               # Global styles
│   └── globals.css       # Tailwind + design tokens
└── content/              # Content files
    └── case-studies/     # MDX case study files
```

## Design System

The site uses CSS custom properties (design tokens) defined in `src/styles/globals.css`. All components reference these tokens instead of hard-coded values.

### Design Tokens

- **Colors**: Primary (blue) and neutral (gray) scales
- **Typography**: Font sizes and families
- **Spacing**: Consistent spacing scale
- **Border Radius**: Standardized corner rounding
- **Shadows**: Elevation system

All tokens are accessible via Tailwind classes (e.g., `bg-primary-600`, `text-neutral-900`).

## Adding a New Case Study

1. Create a new `.mdx` file in `src/content/case-studies/`
2. Use the following front matter structure:

```yaml
---
title: Your Case Study Title
role: Your Role
company: Company Name
dates: MM/YYYY - MM/YYYY
tldr: Brief summary (one sentence)
challenge: |
  Multi-line description of the challenge
actions:
  - Action item 1
  - Action item 2
outcomes:
  - Outcome 1
  - Outcome 2
artifacts:
  - Artifact 1
  - Artifact 2
tags:
  - Tag 1
  - Tag 2
push:
  - Push item 1
  - Push item 2
pull:
  - Pull item 1
  - Pull item 2
---

Your markdown content here...
```

3. The file name (without `.mdx`) becomes the URL slug (e.g., `my-case-study.mdx` → `/case-studies/my-case-study`)

## Moving/Renaming Routes

The file-based routing in Next.js App Router makes route changes straightforward:

1. **Move a page**: Move the folder in `src/app/` to the new location
   - Example: `src/app/about/page.tsx` → `src/app/company/about/page.tsx`
   - The route automatically changes from `/about` to `/company/about`

2. **Rename a route**: Rename the folder in `src/app/`
   - Example: `src/app/work-with-me/` → `src/app/services/`
   - Update any internal links in components (use `Link` components, not hard-coded paths)

3. **Update navigation**: Edit `src/components/Layout.tsx` to update the nav links

4. **Update case study links**: If you move case studies, update:
   - The slug in the MDX filename
   - Any references in `src/app/page.tsx` (timeline entries)
   - Any other hard-coded links

### Best Practices for Route Changes

- Use Next.js `Link` components with relative paths when possible
- Consider creating a constants file for route paths if you have many cross-references
- Update all internal links when moving routes
- Test all navigation after route changes

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Component Usage

### Section
Provides consistent spacing and max-width container:
```tsx
<Section className="bg-white">
  <h1>Content</h1>
</Section>
```

### Button
Primary or secondary button with optional href:
```tsx
<Button href="/contact" variant="primary">Get In Touch</Button>
<Button variant="secondary">Cancel</Button>
```

### Card
Container with consistent styling:
```tsx
<Card hover>  {/* hover adds hover effect */}
  <h2>Card Title</h2>
</Card>
```

### Timeline
Displays timeline entries with date, summary, push/pull, and optional link:
```tsx
<Timeline entries={[
  {
    date: '2024',
    summary: 'Project description',
    push: ['Design', 'Research'],
    pull: ['React', 'TypeScript'],
    link: { href: '/case-studies/slug', label: 'View Case Study' }
  }
]} />
```

## Styling Guidelines

- Always use design tokens (CSS variables) via Tailwind classes
- Never hard-code colors, spacing, or other design values
- Use the `Section` component for consistent page structure
- Follow the existing component patterns for consistency

## Future Enhancements

Potential improvements:
- Add contact form backend integration
- Implement search for case studies
- Add filtering/tagging for case studies
- Add blog section
- Add dark mode support
- Add analytics
