"use client";

import { savedBoards } from "@/data/socialDiscovery";
import { BoardCard } from "./BoardCard";
import { DiscoveryCarousel } from "./DiscoveryCarousel";

export function SavedBoardsCarousel({ title = "Saved boards" }: { title?: string }) {
  return (
    <DiscoveryCarousel itemClassName="basis-72 sm:basis-80" title={title}>
      {savedBoards.map((board) => (
        <BoardCard key={board.title} {...board} />
      ))}
    </DiscoveryCarousel>
  );
}
