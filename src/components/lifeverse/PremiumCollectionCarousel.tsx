"use client";

import { premiumCollections } from "@/data/socialDiscovery";
import { DiscoveryCarousel } from "./DiscoveryCarousel";
import { PremiumCard } from "./PremiumCard";

export function PremiumCollectionCarousel({ title = "Premium collections" }: { title?: string }) {
  return (
    <DiscoveryCarousel itemClassName="basis-72 sm:basis-80" title={title}>
      {premiumCollections.map((collection) => (
        <PremiumCard key={collection.title} {...collection} />
      ))}
    </DiscoveryCarousel>
  );
}
