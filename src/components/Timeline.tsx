import Link from 'next/link';
import { ReactNode } from 'react';
import { CaseStudy } from '@/lib/case-studies';
import CaseStudyCarousel from './CaseStudyCarousel';

/** Optional logo item for a timeline milestone (1–3 per entry). */
export interface LogoItem {
  src: string;
  alt: string;
  label?: string;
}

interface TimelineEntryProps {
  date: string;
  summary: string | ReactNode;
  company?: string;
  /** Optional client/company logos (typically 1–3). Renders nothing if empty/undefined. */
  logos?: LogoItem[];
  link?: {
    href: string;
    label: string;
  };
}

function LogoGroup({ logos }: { logos?: LogoItem[] }) {
  if (!logos?.length) return null;
  return (
    <div className="flex flex-wrap items-center justify-end gap-3 md:justify-end">
      {logos.map((logo, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-0.5 shrink-0"
          style={{ cursor: 'default' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-[22px] w-auto max-w-[72px] object-contain object-center md:h-6 select-none pointer-events-none"
          />
          {logo.label && (
            <span className="text-xs text-neutral-500 leading-tight text-center max-w-[72px]">
              {logo.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

interface TimelineProps {
  entries: TimelineEntryProps[];
  caseStudies?: CaseStudy[];
}

export default function Timeline({ entries, caseStudies = [] }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-800" />
      
      <div className="space-y-lg">
        {entries.map((entry, idx) => {
          // Find all matching case studies by company name
          const matchingCaseStudies = entry.company 
            ? caseStudies.filter(cs => cs.company.toLowerCase() === entry.company?.toLowerCase())
            : [];

          return (
            <div key={idx} className="relative flex gap-lg">
              {/* Date column */}
              <div className="flex-shrink-0 w-16 text-left">
                <div className="sticky top-4">
                  <div className="text-sm font-medium text-text-muted">
                    {entry.date}
                  </div>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="flex-shrink-0 relative">
                <div className="absolute left-6 top-1.5 w-4 h-4 bg-accent rounded-full border-4 border-bg-page shadow-md" />
              </div>

              {/* Content */}
              <div className="flex-grow pb-lg">
                <div className="bg-bg-card rounded-lg border border-neutral-800 p-lg shadow-sm flex flex-col gap-md">
                  {/* Header row: company + optional logos. Desktop: two columns; mobile: stack, logos below */}
                  <div className="flex flex-col gap-md md:flex-row md:items-flex-start md:justify-between md:gap-lg">
                    <div className="min-w-0 flex-1">
                      {entry.company && (
                        <h3 className="text-xl font-bold text-text-heading">
                          {entry.company}
                        </h3>
                      )}
                    </div>
                    {entry.logos?.length ? (
                      <div className="flex justify-start md:flex-shrink-0 md:items-center">
                        <LogoGroup logos={entry.logos} />
                      </div>
                    ) : null}
                  </div>
                  <div className="text-base text-text-body [&_a]:text-sky-300 [&_a]:hover:text-sky-200 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors">
                    {entry.summary}
                  </div>
                  {entry.link && (
                    <div>
                      <Link 
                        href={entry.link.href}
                        className="text-accent hover:text-accent-hover font-medium text-sm inline-flex items-center gap-xs"
                      >
                        {entry.link.label}
                        <span>→</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Show case study carousel if company matches */}
                {matchingCaseStudies.length > 0 && (
                  <CaseStudyCarousel 
                    caseStudies={matchingCaseStudies} 
                    company={entry.company!}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
