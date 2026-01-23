import Button from './Button';

interface CallToActionStripProps {
  title: string;
  description?: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export default function CallToActionStrip({ 
  title, 
  description, 
  primaryAction, 
  secondaryAction 
}: CallToActionStripProps) {
  return (
    <div className="bg-accent text-bg-page py-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-md">{title}</h2>
        {description && (
          <p className="text-lg text-bg-page/80 mb-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
          <Button 
            href={primaryAction.href} 
            variant="secondary"
            className="bg-bg-page text-accent hover:bg-neutral-900"
          >
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button 
              href={secondaryAction.href} 
              variant="secondary"
              className="bg-transparent border-2 border-bg-page text-bg-page hover:bg-bg-page hover:text-accent"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
