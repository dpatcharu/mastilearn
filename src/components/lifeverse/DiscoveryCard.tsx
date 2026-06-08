import { Bookmark, Heart, MessageCircle } from "lucide-react";

type DiscoveryCardProps = {
  category: string;
  href: string;
  image: string;
  saves?: string;
  title: string;
  vibe?: string;
};

export function DiscoveryCard({ category, href, image, saves = "1.2k", title, vibe }: DiscoveryCardProps) {
  return (
    <article className="mb-5 break-inside-avoid overflow-hidden rounded-[1.75rem] bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl">
      <a className="block" href={href}>
        <div className="relative min-h-64 overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="size-full object-cover" src={image} />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase text-slate-950 backdrop-blur">
            {vibe || category}
          </span>
        </div>
      </a>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-slate-400">{category}</p>
            <h3 className="mt-1 text-lg font-black leading-tight text-slate-950">{title}</h3>
          </div>
          <button className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-50 text-slate-700 transition hover:bg-slate-950 hover:text-white" type="button">
            <Bookmark className="size-4" />
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs font-black text-slate-400">
          <Heart className="size-4" />
          {saves} saves
          <MessageCircle className="ml-2 size-4" />
          Discuss
        </div>
      </div>
    </article>
  );
}
