import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-neutral-800 bg-bg-card">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/" 
              className="text-xl font-semibold text-text-heading hover:text-accent transition-colors"
            >
              Portfolio
            </Link>
            <div className="flex space-x-6">
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
              <Link 
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
            </div>
          </div>
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
