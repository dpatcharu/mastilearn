import Image from "next/image";
import { Bookmark, Heart, Sparkles } from "lucide-react";
import { discoveryPosts } from "@/data/lifeverse";
import { assetPath } from "@/lib/assetPath";

const heights = ["h-72", "h-96", "h-80", "h-64", "h-[22rem]", "h-72", "h-96", "h-80"];

export function DiscoveryFeed() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20" id="discover">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-normal text-slate-400">
            Visual Discovery
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            A feed built to save, follow, and come back to.
          </h2>
        </div>
        <a className="text-sm font-bold text-slate-500 transition hover:text-slate-950" href="/login">
          Create your free board
        </a>
      </div>

      <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-4">
        {discoveryPosts.map((post, index) => (
          <a
            className="group mb-5 block break-inside-avoid overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1"
            href={post.href}
            key={post.title}
          >
            <div className={`relative ${heights[index]} overflow-hidden bg-slate-100`}>
              <Image
                alt=""
                className="object-cover transition duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                src={assetPath(post.image)}
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-800 shadow-sm backdrop-blur">
                {post.vibe}
              </div>
              <span
                aria-label="Save post"
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-slate-950 shadow-sm backdrop-blur transition hover:bg-slate-950 hover:text-white"
              >
                <Bookmark className="size-4" />
              </span>
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between gap-3 text-xs font-bold text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="size-3.5" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Heart className="size-3.5" />
                  {post.saves}
                </span>
              </div>
              <h3 className="text-lg font-black leading-snug text-slate-950">{post.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
