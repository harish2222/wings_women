"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

interface GalleryItem {
  src: string;
  alt: string;
}

interface MobileSwipeGalleryProps {
  items: GalleryItem[];
  title?: string;
}

export default function MobileSwipeGallery({ items, title = "Clinic Gallery" }: MobileSwipeGalleryProps) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const current = useMemo(() => items[index], [items, index]);

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  const onTouchStart = (x: number) => setTouchStart(x);
  const onTouchEnd = (x: number) => {
    if (touchStart === null) return;
    const delta = touchStart - x;
    if (Math.abs(delta) > 40) {
      if (delta > 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  if (!items.length) return null;

  return (
    <section className="rounded-3xl border border-[#C8A2C8]/45 bg-white/90 p-4 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d]">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={(e) => onTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={1200}
          height={700}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-64 w-full object-cover md:h-80"
          loading="lazy"
        />
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white"
        >
          ›
        </button>
      </div>
      <p className="mt-2 text-xs text-[#2C2C2C]/70 dark:text-[#E5E5E5]/70">
        Swipe left/right on mobile to browse images.
      </p>
    </section>
  );
}

