import { Button } from "@/components/ui/button";

type CreatorCardProps = {
  avatar: string;
  followers: string;
  name: string;
  niche: string;
  username: string;
};

export function CreatorCard({ avatar, followers, name, niche, username }: CreatorCardProps) {
  return (
    <article className="rounded-[1.75rem] bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-3">
        <span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-rose-300 via-amber-200 to-sky-300 p-[3px]">
          <span className="size-full overflow-hidden rounded-full bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="size-full object-cover" src={avatar} />
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-black text-slate-950">{name}</h3>
          <p className="truncate text-xs font-bold text-slate-400">@{username}</p>
        </div>
      </div>
      <p className="mt-4 text-sm font-bold text-slate-600">{niche}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase text-slate-400">{followers}</span>
        <Button className="h-9 px-4 text-xs" type="button" variant="secondary">
          Follow
        </Button>
      </div>
    </article>
  );
}
