import Link from 'next/link';
import { ReactNode } from 'react';
import { CaseStudy } from '@/lib/case-studies';
import CaseStudyCarousel from './CaseStudyCarousel';

interface TimelineEntryProps {
  date: string;
  summary: string | ReactNode;
  company?: string;
  link?: {
    href: string;
    label: string;
  };
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
              <div className="flex-shrink-0 w-16 text-right">
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
                <div className="bg-bg-card rounded-lg border border-neutral-800 p-lg shadow-sm">
                  {entry.company && (
                    <div className="mb-md">
                      <h3 className="text-xl font-bold text-text-heading">
                        {entry.company}
                      </h3>
                    </div>
                  )}
                  <div className="text-base text-text-body">
                    {entry.summary}
                  </div>
                  
                  {entry.link && (
                    <div className="mt-md">
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
