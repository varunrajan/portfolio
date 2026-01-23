# Portfolio Site - File Structure

```
Portfolio/
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── README.md                   # Project documentation
├── FILE_STRUCTURE.md          # This file
├── next.config.mjs             # Next.js configuration with MDX
├── package.json                # Dependencies and scripts
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration with design tokens
├── tsconfig.json               # TypeScript configuration
│
└── src/
    ├── app/                    # Next.js App Router pages
    │   ├── layout.tsx          # Root layout (wraps all pages)
    │   ├── page.tsx            # Home page (/)
    │   ├── not-found.tsx       # 404 page
    │   ├── work-with-me/
    │   │   └── page.tsx        # Work With Me page (/work-with-me)
    │   ├── contact/
    │   │   └── page.tsx        # Contact page (/contact)
    │   └── case-studies/
    │       ├── page.tsx        # Case studies index (/case-studies)
    │       └── [slug]/
    │           └── page.tsx    # Dynamic case study pages (/case-studies/[slug])
    │
    ├── components/             # Reusable React components
    │   ├── Layout.tsx          # Header, navigation, footer wrapper
    │   ├── Section.tsx         # Consistent section spacing component
    │   ├── Button.tsx          # Primary/secondary button component
    │   ├── Card.tsx            # Card container component
    │   ├── Timeline.tsx        # Timeline with push/pull display
    │   └── CallToActionStrip.tsx # CTA banner component
    │
    ├── lib/                    # Utility functions
    │   └── case-studies.ts    # MDX reading and parsing utilities
    │
    ├── styles/                 # Global styles
    │   └── globals.css         # Tailwind imports + design tokens (CSS variables)
    │
    └── content/                # Content files
        └── case-studies/       # MDX case study files
            ├── enterprise-saas-redesign.mdx
            └── ecommerce-platform.mdx
```

## Route Structure

- `/` - Home page with timeline
- `/work-with-me` - Services and approach
- `/contact` - Contact form
- `/case-studies` - Case studies index
- `/case-studies/[slug]` - Individual case study pages

## Key Design Decisions

1. **File-based routing**: Routes are defined by folder structure in `src/app/`
2. **Design tokens**: All design values (colors, spacing, etc.) are CSS variables in `globals.css`
3. **Component composition**: Small, focused components that compose together
4. **MDX content**: Case studies are MDX files with front matter for easy editing
5. **Type safety**: Full TypeScript coverage for type safety
