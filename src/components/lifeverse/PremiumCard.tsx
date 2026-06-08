import { Lock } from "lucide-react";

type PremiumCardProps = {
  badge: string;
  image: string;
  items: string;
  title: string;
};

export function PremiumCard({ badge, image, items, title }: PremiumCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="size-full object-cover" src={image} />
        <div className="absolute inset-0 bg-[linear-gradient(transparent_45%,rgba(15,23,42,0.72))]" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-950 backdrop-blur">
          <Lock className="size-3" />
          {badge}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-black leading-tight text-slate-950">{title}</h3>
        <p className="mt-2 text-xs font-bold uppercase text-slate-400">{items}</p>
      </div>
    </article>
  );
}
