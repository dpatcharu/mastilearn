"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { assetPath } from "@/lib/assetPath";
import { fetchCategoryItems, type LiveItem } from "@/lib/liveContent";

type LiveCategoryFeedProps = {
  categoryTitle: string;
  slug: string;
};

function imageSrc(src: string) {
  return src.startsWith("/") ? assetPath(src) : src;
}

export function LiveCategoryFeed({ categoryTitle, slug }: LiveCategoryFeedProps) {
  const [items, setItems] = useState<LiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadCategoryItems() {
      setIsLoading(true);

      try {
        const nextItems = await fetchCategoryItems(slug, 9);

        if (isMounted) {
          setItems(nextItems);
        }
      } catch {
        if (isMounted) {
          setItems([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCategoryItems();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const sourceLine = useMemo(() => {
    const sources = [...new Set(items.map((item) => item.sourceName))];
    if (sources.length > 0) {
      return `Updated from ${sources.join(", ")}`;
    }

    return isLoading ? "Finding fresh picks" : "Sources are taking longer than usual";
  }, [isLoading, items]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-slate-400">
            {categoryTitle} Feed
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Real picks for this category.
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-500">
          <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
          {sourceLine}
        </div>
      </div>

      {items.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <a
              className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1"
              href={item.href}
              key={`${item.sourceName}-${item.href}`}
              rel="noreferrer"
              target="_blank"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  src={imageSrc(item.image)}
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-800 shadow-sm backdrop-blur">
                  {item.category}
                </span>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-400">{item.meta}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-black text-slate-500">
                    {item.sourceName}
                    <ExternalLink className="size-3.5" />
                  </span>
                </div>
                <h3 className="text-xl font-black leading-snug text-slate-950">{item.title}</h3>
                <span className="mt-5 inline-flex text-sm font-bold text-slate-500 transition group-hover:text-slate-950">
                  View original
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[2rem] bg-slate-50 p-8 text-sm font-semibold text-slate-500 ring-1 ring-slate-200/70">
          {isLoading
            ? `Finding fresh ${categoryTitle.toLowerCase()} picks now.`
            : `Fresh ${categoryTitle.toLowerCase()} picks are not available right now. Please check back shortly.`}
        </div>
      )}
    </section>
  );
}
