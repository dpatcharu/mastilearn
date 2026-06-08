"use client";

import { DiscoveryCarousel } from "./DiscoveryCarousel";
import { socialCategories } from "@/data/socialDiscovery";

export function CategoryCarousel() {
  return (
    <DiscoveryCarousel itemClassName="basis-40 sm:basis-48" title="Categories">
      {socialCategories.map((category) => (
        <a
          className={`block rounded-[1.5rem] p-4 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl ${category.tone}`}
          href={category.href}
          key={`${category.title}-${category.slug}`}
        >
          <div className="grid size-11 place-items-center rounded-full bg-white/80 shadow-sm">
            <category.icon className="size-5" />
          </div>
          <p className="mt-4 text-lg font-black text-slate-950">{category.title}</p>
          <p className="mt-1 text-xs font-bold opacity-70">Swipe discovery</p>
        </a>
      ))}
    </DiscoveryCarousel>
  );
}
