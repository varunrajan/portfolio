'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-neutral-800 bg-bg-card">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/" 
              className="text-xl font-semibold text-text-heading hover:text-accent transition-colors"
            >
              Varun Rajan
            </Link>
            {/* Desktop Navigation - hidden below 550px */}
            <div className="flex space-x-6 max-[550px]:hidden">
              <Link 
                href="/case-studies" 
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                Case Studies
              </Link>
              <Link 
                href="/ai-work" 
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                AI Work
              </Link>  
              <Link 
                href="https://resume.varunrajan.com/"
                target="_blank"
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                Resume
              </Link>
              <Link 
                href="mailto:varun@varunrajan.com" 
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                Contact
              </Link>
              {/* Social icons */}
              <Link
                href="https://www.linkedin.com/in/varun-rajan-15526845/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-heading transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link
                href="https://github.com/varunrajan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-heading transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
  {/*<Link 
                href="/work-with-me" 
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                Work With Me
              </Link>
              <Link 
                href="/contact" 
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="https://conviction.varunrajan.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                Team Coaching
              </Link>
              */}
            </div>

            {/* Mobile Burger Button - visible only below 550px */}
            <button
              onClick={toggleMenu}
              className="max-[550px]:block hidden p-2 text-text-heading hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-md"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown Menu - visible only below 550px */}
          {isMenuOpen && (
            <div className="max-[550px]:block hidden border-t border-neutral-800 py-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/case-studies" 
                  onClick={closeMenu}
                  className="text-text-secondary hover:text-text-heading transition-colors py-2"
                >
                  Case Studies
                </Link>
                <Link 
                  href="/ai-work" 
                  onClick={closeMenu}
                  className="text-text-secondary hover:text-text-heading transition-colors py-2"
                >
                  AI Work
                </Link>
                <Link 
                  href="https://resume.varunrajan.com/" 
                  onClick={closeMenu}
                  className="text-text-secondary hover:text-text-heading transition-colors py-2"
                >
                  Resume
                </Link>
                <Link 
                  href="mailto:varun@varunrajan.com" 
                  onClick={closeMenu}
                  className="text-text-secondary hover:text-text-heading transition-colors py-2"
                >
                  Contact
                </Link>

                <Link 
                  href="https://www.linkedin.com/in/varun-rajan-15526845/" 
                  onClick={closeMenu}
                  className="text-text-secondary hover:text-text-heading transition-colors py-2"
                >
                  LinkedIn
                </Link>
                <Link 
                  href="https://github.com/varunrajan" 
                  onClick={closeMenu}
                  className="text-text-secondary hover:text-text-heading transition-colors py-2"
                >
                  GitHub
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="border-t border-neutral-800 bg-bg-card mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-text-muted text-sm">
            <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
