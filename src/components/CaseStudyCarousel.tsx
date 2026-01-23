'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { CaseStudy } from '@/lib/case-studies';

interface CaseStudyCarouselProps {
  caseStudies: CaseStudy[];
  company: string;
}

function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link href={`/case-studies/${caseStudy.slug}`}>
      <div className="flex-shrink-0 w-64 bg-white rounded-lg border border-neutral-200 shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col">
        {caseStudy.thumbnail && (
          <div className="relative w-full h-40 bg-neutral-100 overflow-hidden">
            <img
              src={caseStudy.thumbnail}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={`p-md flex-grow flex flex-col ${caseStudy.thumbnail ? '' : 'min-h-[120px]'}`}>
          <h3 className="text-base font-bold text-neutral-900 mb-xs line-clamp-2">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-3">
            {caseStudy.tldr}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function CaseStudyCarousel({ caseStudies, company }: CaseStudyCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const canScrollHorizontally = container.scrollWidth > container.clientWidth;
    setCanScroll(canScrollHorizontally);
    
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
    }

    return () => {
      window.removeEventListener('resize', checkScrollability);
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
      }
    };
  }, [caseStudies]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft = 
      direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  if (caseStudies.length === 0) return null;

  return (
    <div className="mt-md">
      <div className="relative">
        {/* Left Arrow */}
        {canScroll && showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-neutral-300 rounded-full p-2 shadow-lg hover:bg-neutral-50 transition-colors"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 text-neutral-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-md overflow-x-auto scrollbar-hide pb-sm"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>

        {/* Right Arrow */}
        {canScroll && showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-neutral-300 rounded-full p-2 shadow-lg hover:bg-neutral-50 transition-colors"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 text-neutral-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* View All Link - only show if more than one case study */}
      {caseStudies.length > 1 && (
        <div className="mt-md text-center">
          <Link
            href={`/case-studies?company=${encodeURIComponent(company)}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center gap-xs"
          >
            View All Case Studies →
          </Link>
        </div>
      )}
    </div>
  );
}
