'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';

type LightboxImageProps = ComponentPropsWithoutRef<'img'> & {
  src: string;
  alt?: string;
  title?: string;
};

export default function LightboxImage({
  src,
  alt,
  title,
  className,
  ...rest
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const caption = title || alt || '';

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const openLightbox = useCallback(() => {
    setOpen(true);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus close button when opened; focus trap
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const modal = modalRef.current;
      if (!modal) return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, close]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  const isExternalSrc = src.startsWith('http') || src.startsWith('//');

  return (
    <>
      <button
        type="button"
        onClick={openLightbox}
        className="cursor-zoom-in border-0 bg-transparent p-0 text-left"
        aria-label={alt ? `View image: ${alt}` : 'View full-size image'}
      >
        {isExternalSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ''}
            title={title}
            className={`max-w-full h-auto rounded-md ${className ?? ''}`}
            {...rest}
          />
        ) : (
          <span className="block overflow-hidden rounded-md">
            <Image
              src={src}
              alt={alt ?? ''}
              title={title}
              width={1200}
              height={675}
              className={`max-w-full h-auto object-contain ${className ?? ''}`}
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </span>
        )}
      </button>

      {open && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={caption || 'Image preview'}
          className="fixed inset-0 z-[100] flex flex-col bg-black/90"
          onClick={handleBackdropClick}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close image preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="flex min-h-0 flex-1 flex-col items-center p-4 pt-16">
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto overscroll-contain"
              style={{ touchAction: 'manipulation' }}
            >
              {/* Native img so browser pinch/zoom works */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                role="presentation"
                className="max-h-[85vh] w-auto max-w-full object-contain"
                style={{ touchAction: 'pinch-zoom' }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            {caption && (
              <p className="mt-3 shrink-0 max-w-2xl text-center text-sm text-white/90">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
