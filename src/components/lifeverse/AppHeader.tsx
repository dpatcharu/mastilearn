"use client";

import { Bell, Plus, Search } from "lucide-react";

export function AppHeader() {
  return (
    <div className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-8">
        <a className="text-xl font-black tracking-tight text-slate-950" href="/home/">
          LifeVerse
        </a>
        <div className="min-h-11 flex-1 items-center gap-2 rounded-full bg-slate-100 px-4 text-sm font-bold text-slate-400 flex">
          <Search className="size-4" />
          Search ideas, creators, boards
        </div>
        <button className="hidden size-11 place-items-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 sm:grid" type="button">
          <Bell className="size-5" />
        </button>
        <a className="grid size-11 place-items-center rounded-full bg-slate-950 text-white shadow-sm" href="/create/">
          <Plus className="size-5" />
        </a>
      </div>
    </div>
  );
}
