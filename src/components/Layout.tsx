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
                href="/" 
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/case-studies" 
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                Case Studies
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
              */}
              <Link 
                href="https://conviction.varunrajan.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                Team Coaching
              </Link>
              <Link 
                href="mailto:varun@varunrajan.com" 
                className="text-text-secondary hover:text-text-heading transition-colors"
              >
                Contact
              </Link>
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
                  href="/" 
                  onClick={closeMenu}
                  className="text-text-secondary hover:text-text-heading transition-colors py-2"
                >
                  Home
                </Link>
                <Link 
                  href="/case-studies" 
                  onClick={closeMenu}
                  className="text-text-secondary hover:text-text-heading transition-colors py-2"
                >
                  Case Studies
                </Link>
                <Link 
                  href="/work-with-me" 
                  onClick={closeMenu}
                  className="text-text-secondary hover:text-text-heading transition-colors py-2"
                >
                  Work With Me
                </Link>
                <Link 
                  href="/contact" 
                  onClick={closeMenu}
                  className="text-text-secondary hover:text-text-heading transition-colors py-2"
                >
                  Contact
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
