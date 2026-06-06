import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

type ArticleCardProps = {
  category: string;
  image: string;
  source: string;
  time: string;
  title: string;
};

export function ArticleCard({ category, image, source, time, title }: ArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <Image
          alt=""
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={assetPath(image)}
        />
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {category}
          </span>
          <span className="text-xs font-semibold text-slate-400">{time}</span>
        </div>
        <h3 className="text-xl font-bold leading-snug text-slate-950">{title}</h3>
        <p className="mt-4 text-xs font-semibold text-slate-400">{source}</p>
      </div>
    </article>
  );
}
