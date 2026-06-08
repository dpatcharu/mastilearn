"use client";

import { Children, ReactNode, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DiscoveryCarouselProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  title?: string;
};

export function DiscoveryCarousel({
  children,
  className = "",
  itemClassName = "basis-64",
  title
}: DiscoveryCarouselProps) {
  const items = Children.toArray(children);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={`min-w-0 max-w-full overflow-hidden ${className}`}>
      {title ? (
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">{title}</h2>
          <div className="hidden gap-2 md:flex">
            <button
              aria-label="Previous"
              className="grid size-10 place-items-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white"
              onClick={scrollPrev}
              type="button"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              aria-label="Next"
              className="grid size-10 place-items-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white"
              onClick={scrollNext}
              type="button"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y">
          {items.map((child, index) => (
            <div className={`min-w-0 shrink-0 grow-0 pl-4 ${itemClassName}`} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
