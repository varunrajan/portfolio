import Image from 'next/image';

type FlowStep = { label: string; sublabel?: string };

interface ArtifactCardProps {
  title: string;
  meta: string;
  description: string;
  images?: string[] | string;
  placeholderLabel?: string;
  flow?: FlowStep[] | string;
  tags?: string[] | string;
}

function parseArrayProp<T>(value: T[] | string | undefined): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function ImageArea({ images, placeholderLabel }: { images: string[]; placeholderLabel?: string }) {
  if (images.length === 0) {
    if (!placeholderLabel) return null;
    return (
      <div className="relative bg-neutral-800 h-[100px] flex items-center justify-center">
        <span className="text-sm text-text-muted">{placeholderLabel}</span>
        <span className="absolute top-2 right-2 text-xs bg-neutral-700 text-text-muted px-2 py-0.5 rounded-md">
          NDA · no screenshot
        </span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative w-full h-[240px] overflow-hidden rounded-t-lg">
        <Image
          src={images[0]}
          alt=""
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 overflow-hidden rounded-t-lg">
        {images.map((src, i) => (
          <div key={i} className="relative h-[200px] overflow-hidden">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 50vw, 384px"
            />
          </div>
        ))}
      </div>
    );
  }

  // 3 images: asymmetric grid
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-t-lg">
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={images[0]}
          alt=""
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, 384px"
        />
      </div>
      <div className="flex flex-col">
        {[images[1], images[2]].map((src, i) => (
          <div key={i} className="relative h-[128px] overflow-hidden">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 50vw, 384px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  if (steps.length === 0) return null;
  return (
    <div className="overflow-x-auto scrollbar-hide mb-4">
      <div className="flex items-center gap-2 min-w-max py-1">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="bg-neutral-800 border border-neutral-700 rounded px-3 py-1.5">
              <div className="text-xs font-medium text-text-secondary whitespace-nowrap">
                {step.label}
              </div>
              {step.sublabel && (
                <div className="text-xs text-text-muted whitespace-nowrap">{step.sublabel}</div>
              )}
            </div>
            {i < steps.length - 1 && (
              <span className="text-text-muted text-sm">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArtifactCard({
  title,
  meta,
  description,
  images,
  placeholderLabel,
  flow,
  tags,
}: ArtifactCardProps) {
  const parsedImages = parseArrayProp<string>(images);
  const parsedFlow = parseArrayProp<FlowStep>(flow);
  const parsedTags = parseArrayProp<string>(tags);

  return (
    <div className="bg-bg-card border border-neutral-700 rounded-lg overflow-hidden not-prose mb-6">
      <ImageArea images={parsedImages} placeholderLabel={placeholderLabel} />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-heading mb-1">{title}</h3>
        <p className="text-xs text-text-muted mb-3">{meta}</p>
        <p className="text-sm text-text-body leading-relaxed mb-4">{description}</p>
        {parsedFlow.length > 0 && <FlowDiagram steps={parsedFlow} />}
        {parsedTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {parsedTags.map((tag, i) => (
              <span
                key={i}
                className="bg-neutral-800 text-text-secondary text-xs px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
