import { Sparkles, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { creatorCards } from "@/data/socialDiscovery";

const trends = ["AI study plans", "Room refresh", "Budget meals", "Creator badges"];

export function RightSidebar() {
  return (
    <aside className="hidden content-start gap-5 lg:sticky lg:top-24 lg:grid lg:self-start">
      <div className="rounded-[1.75rem] bg-slate-950 p-4 text-white shadow-[0_18px_55px_rgba(15,23,42,0.12)] xl:rounded-[2rem] xl:p-5">
        <div className="flex items-center gap-3">
          <TrendingUp className="size-5 text-amber-300" />
          <h2 className="text-lg font-black xl:text-xl">Today&apos;s pulse</h2>
        </div>
        <div className="mt-4 grid gap-2 xl:gap-3">
          {trends.map((trend, index) => (
            <a className="rounded-[1.1rem] bg-white/[0.07] p-3 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/[0.12]" href="/trending/" key={trend}>
              <p className="text-[0.62rem] font-black uppercase text-white/35">#{index + 1} trending</p>
              <p className="mt-1 text-sm font-black xl:text-base">{trend}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-[1.75rem] bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 xl:rounded-[2rem] xl:p-5">
        <div className="flex items-center gap-3">
          <Users className="size-5 text-slate-400" />
          <h2 className="text-lg font-black text-slate-950 xl:text-xl">Creators</h2>
        </div>
        <div className="mt-4 grid gap-4">
          {creatorCards.slice(0, 4).map((creator) => (
            <div className="flex items-center gap-3" key={creator.username}>
              <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="size-full object-cover" src={creator.avatar} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-slate-950">{creator.name}</p>
                <p className="truncate text-xs font-bold text-slate-400">@{creator.username}</p>
              </div>
              <Button className="h-8 px-3 text-[0.7rem] xl:h-9 xl:px-4" type="button" variant="secondary">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.75rem] bg-gradient-to-br from-amber-100 via-rose-100 to-sky-100 p-4 ring-1 ring-white xl:rounded-[2rem] xl:p-5">
        <Sparkles className="size-5 text-slate-700" />
        <h2 className="mt-3 text-lg font-black text-slate-950 xl:text-xl">Creator unlock</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
          Post visuals, grow followers, earn badges, and build premium collections.
        </p>
        <a className="mt-4 inline-flex" href="/create/">
          <Button>Create</Button>
        </a>
      </div>
    </aside>
  );
}
