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
    <div className="bg-primary-600 text-white py-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-md">{title}</h2>
        {description && (
          <p className="text-lg text-primary-100 mb-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
          <Button 
            href={primaryAction.href} 
            variant="secondary"
            className="bg-white text-primary-600 hover:bg-primary-50"
          >
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button 
              href={secondaryAction.href} 
              variant="secondary"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
