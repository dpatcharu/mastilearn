"use client";

import { Plus } from "lucide-react";
import { DiscoveryCarousel } from "./DiscoveryCarousel";
import { storyItems } from "@/data/socialDiscovery";

export function StoryCarousel() {
  return (
    <DiscoveryCarousel itemClassName="basis-20" title="Stories">
      {storyItems.map((story, index) => (
        <button className="grid w-full gap-2 text-center" key={story.label} type="button">
          <span className={`grid size-16 place-items-center rounded-full bg-gradient-to-br ${story.tone} p-[3px] shadow-lg`}>
            <span className="grid size-full place-items-center overflow-hidden rounded-full bg-white">
              {index === 0 ? (
                <Plus className="size-6 text-slate-950" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="" className="size-full object-cover" src={story.avatar} />
              )}
            </span>
          </span>
          <span className="truncate text-xs font-black text-slate-700">{story.label}</span>
        </button>
      ))}
    </DiscoveryCarousel>
  );
}
