"use client";

import { creatorCards } from "@/data/socialDiscovery";
import { CreatorCard } from "./CreatorCard";
import { DiscoveryCarousel } from "./DiscoveryCarousel";

export function CreatorCarousel({ title = "Creators to follow" }: { title?: string }) {
  return (
    <DiscoveryCarousel itemClassName="basis-64 sm:basis-72" title={title}>
      {creatorCards.map((creator) => (
        <CreatorCard key={creator.username} {...creator} />
      ))}
    </DiscoveryCarousel>
  );
}
