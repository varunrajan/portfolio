import Link from 'next/link';
import Section from '@/components/Section';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <Section className="bg-white min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-md">404</h1>
        <p className="text-xl text-neutral-600 mb-lg">Page not found</p>
        <Button href="/" variant="primary">
          Go Home
        </Button>
      </div>
    </Section>
  );
}
