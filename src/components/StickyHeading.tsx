'use client';

import { useEffect, useState } from 'react';

export default function StickyHeading() {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const target = document.getElementById('built-description');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowArrow(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <h2 className="text-3xl font-bold text-text-heading built-heading">
      What I&apos;ve Built
      <span
        className={`inline-block align-middle text-text-muted ml-1 transition-opacity duration-300 ${
          showArrow ? 'opacity-100' : 'opacity-0'
        }`}
      >
        ↓
      </span>
    </h2>
  );
}
