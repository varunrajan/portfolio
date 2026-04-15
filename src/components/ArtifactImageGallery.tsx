'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Props {
  images: string[];
}

function Thumb({
  src,
  index,
  className,
  onClick,
}: {
  src: string;
  index: number;
  className?: string;
  onClick: (i: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      className={`relative overflow-hidden rounded-md bg-neutral-900 cursor-zoom-in border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${className ?? ''}`}
      aria-label={`View image ${index + 1}`}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 500px"
      />
    </button>
  );
}

function OneImage({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) {
  return (
    <div className="p-2 rounded-t-lg bg-neutral-950">
      <Thumb src={images[0]} index={0} onClick={onOpen} className="h-64 w-full" />
    </div>
  );
}

function TwoImages({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 rounded-t-lg bg-neutral-950">
      {images.map((src, i) => (
        <Thumb key={i} src={src} index={i} onClick={onOpen} className="h-52" />
      ))}
    </div>
  );
}

function ThreeImages({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 rounded-t-lg bg-neutral-950">
      {/* Hero on the left spanning full height */}
      <Thumb src={images[0]} index={0} onClick={onOpen} className="row-span-2 h-full min-h-[220px]" />
      {/* Two stacked on the right */}
      <Thumb src={images[1]} index={1} onClick={onOpen} className="h-[105px]" />
      <Thumb src={images[2]} index={2} onClick={onOpen} className="h-[105px]" />
    </div>
  );
}

/**
 * General layout for 4+ images: 2-col grid.
 * If count is odd the last image spans both columns.
 */
function ManyImages({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) {
  const isOdd = images.length % 2 !== 0;
  const gridItems = isOdd ? images.slice(0, -1) : images;
  const lastItem = isOdd ? images[images.length - 1] : null;

  return (
    <div className="grid grid-cols-2 gap-2 p-2 rounded-t-lg bg-neutral-950">
      {gridItems.map((src, i) => (
        <Thumb key={i} src={src} index={i} onClick={onOpen} className="h-44" />
      ))}
      {lastItem !== null && (
        <Thumb
          src={lastItem}
          index={images.length - 1}
          onClick={onOpen}
          className="col-span-2 h-52"
        />
      )}
    </div>
  );
}

export default function ArtifactImageGallery({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const slides = images.map((src) => ({ src }));

  const handleOpen = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const layout =
    images.length === 1 ? (
      <OneImage images={images} onOpen={handleOpen} />
    ) : images.length === 2 ? (
      <TwoImages images={images} onOpen={handleOpen} />
    ) : images.length === 3 ? (
      <ThreeImages images={images} onOpen={handleOpen} />
    ) : (
      <ManyImages images={images} onOpen={handleOpen} />
    );

  return (
    <>
      {layout}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        carousel={{ finite: false }}
      />
    </>
  );
}
