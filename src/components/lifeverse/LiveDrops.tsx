"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { assetPath } from "@/lib/assetPath";
import { fetchHomeItems, type LiveItem } from "@/lib/liveContent";

function imageSrc(src: string) {
  return src.startsWith("/") ? assetPath(src) : src;
}

export function LiveDrops() {
  const [drops, setDrops] = useState<LiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSources, setLoadedSources] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadDrops() {
      setIsLoading(true);

      const liveDrops = await fetchHomeItems();

      if (!isMounted) {
        return;
      }

      setDrops(liveDrops);
      setLoadedSources([...new Set(liveDrops.map((drop) => drop.sourceName))]);

      setIsLoading(false);
    }

    loadDrops();

    return () => {
      isMounted = false;
    };
  }, []);

  const sourceLine = useMemo(() => {
    if (loadedSources.length > 0) {
      return `Updated from ${loadedSources.join(", ")}`;
    }

    return isLoading ? "Finding fresh picks" : "Sources are taking longer than usual";
  }, [isLoading, loadedSources]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20" id="live-drops">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-normal text-slate-400">
            Fresh Drops
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            New things to save right now.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-500">
            Real recipes, learning resources, and game discoveries pulled from
            source-backed feeds.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-500">
          <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
          {sourceLine}
        </div>
      </div>

      {drops.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {drops.map((drop) => (
          <a
            className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1"
            href={drop.href}
            key={`${drop.sourceName}-${drop.href}`}
            rel="noreferrer"
            target="_blank"
          >
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                src={imageSrc(drop.image)}
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-800 shadow-sm backdrop-blur">
                {drop.category}
              </span>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-400">{drop.meta}</span>
                <span className="inline-flex items-center gap-1 text-xs font-black text-slate-500">
                  {drop.sourceName}
                  <ExternalLink className="size-3.5" />
                </span>
              </div>
              <h3 className="text-xl font-black leading-snug text-slate-950">{drop.title}</h3>
              <span className="mt-5 inline-flex text-sm font-bold text-slate-500 transition group-hover:text-slate-950">
                View original
              </span>
            </div>
          </a>
        ))}
        </div>
      ) : (
        <div className="mt-12 rounded-[2rem] bg-slate-50 p-8 text-sm font-semibold text-slate-500 ring-1 ring-slate-200/70">
          {isLoading
            ? "Finding fresh picks now."
            : "Fresh picks are not available right now. Please check back shortly."}
        </div>
      )}
    </section>
  );
}
