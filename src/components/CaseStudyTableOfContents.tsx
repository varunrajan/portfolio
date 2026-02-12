'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import type { TocHeading } from '@/lib/remark-heading-ids';

/**
 * Breakpoint: lg (1024px). Below this, ToC is collapsible.
 * Above lg, ToC is sticky on the left.
 */
const TOC_BREAKPOINT = 1024;

interface CaseStudyTableOfContentsProps {
  headings: TocHeading[];
  slug: string;
  /** Max heading level to show in ToC (2 = h2 only, 4 = h2–h4). Default: 2 */
  maxDepth?: number;
  /** Content wrapper selector for scroll spy (e.g. '.case-study-prose') */
  contentSelector?: string;
  /** Class name for the active heading in ToC */
  activeClassName?: string;
}

function TocItem({
  heading,
  slug,
  isActive,
  activeClassName,
  depth,
}: {
  heading: TocHeading;
  slug: string;
  isActive: boolean;
  activeClassName: string;
  depth: number;
}) {
  const href = `/case-studies/${slug}#${heading.id}`;

  return (
    <li
      className={isActive ? activeClassName : ''}
      style={{ paddingLeft: depth > 0 ? `${depth * 12}px` : 0 }}
    >
      <Link
        href={href}
        className="block py-1 text-sm text-text-secondary hover:text-text-heading transition-colors"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById(heading.id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.replaceState(null, '', href);
          }
        }}
      >
        {heading.text}
      </Link>
    </li>
  );
}

export default function CaseStudyTableOfContents({
  headings,
  slug,
  maxDepth = 2,
  contentSelector = '.case-study-prose',
  activeClassName = 'text-text-heading font-medium',
}: CaseStudyTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const tocHeadings = useMemo(
    () => headings.filter((h) => h.level <= maxDepth),
    [headings, maxDepth]
  );

  const updateActiveHeading = useCallback(() => {
    const content = document.querySelector(contentSelector);
    if (!content || tocHeadings.length === 0) return;

    const headingElements = tocHeadings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const scrollTop = window.scrollY;
    const viewportMiddle = scrollTop + window.innerHeight / 3;

    let current: string | null = null;
    for (let i = headingElements.length - 1; i >= 0; i--) {
      const el = headingElements[i];
      if (el && el.offsetTop <= viewportMiddle) {
        current = el.id;
        break;
      }
    }
    if (!current && headingElements[0]) {
      current = headingElements[0].id;
    }

    if (current) {
      setActiveId((prev) => {
        if (prev !== current) {
          window.history.replaceState(null, '', `/case-studies/${slug}#${current}`);
        }
        return current;
      });
    } else {
      setActiveId(null);
    }
  }, [tocHeadings, contentSelector, slug]);

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.slice(1);
    if (hash && tocHeadings.some((h) => h.id === hash)) {
      setActiveId(hash);
    }
  }, [tocHeadings]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && tocHeadings.some((h) => h.id === hash)) {
      setActiveId(hash);
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      updateActiveHeading();
    }
  }, [tocHeadings, updateActiveHeading]);

  useEffect(() => {
    updateActiveHeading();
    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', updateActiveHeading);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [updateActiveHeading, handleHashChange]);

  const buildNestedItems = (headingsToUse: TocHeading[]): { heading: TocHeading; depth: number }[] => {
    const result: { heading: TocHeading; depth: number }[] = [];
    for (const heading of headingsToUse) {
      const depth = Math.max(0, heading.level - 2);
      result.push({ heading, depth });
    }
    return result;
  };

  const nestedItems = buildNestedItems(tocHeadings);

  if (tocHeadings.length === 0) return null;

  return (
    <>
      {/* Mobile: collapsible "On this page" */}
      <div className="lg:hidden mb-lg">
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-medium text-text-heading hover:text-text-body transition-colors"
          aria-expanded={isOpen}
        >
          <span>On this page</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <ul className="mt-sm space-y-0 border-l border-neutral-700 pl-md">
            {nestedItems.map(({ heading, depth }) => (
              <TocItem
                key={heading.id}
                heading={heading}
                slug={slug}
                isActive={activeId === heading.id}
                activeClassName={activeClassName}
                depth={depth}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block shrink-0 w-52">
        <nav className="sticky top-24" aria-label="On this page">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-sm">
            On this page
          </h2>
          <ul className="space-y-0 border-l border-neutral-700 pl-md">
            {nestedItems.map(({ heading, depth }) => (
              <TocItem
                key={heading.id}
                heading={heading}
                slug={slug}
                isActive={activeId === heading.id}
                activeClassName={activeClassName}
                depth={depth}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
