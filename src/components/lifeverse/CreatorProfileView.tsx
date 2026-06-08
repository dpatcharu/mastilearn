"use client";

import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Bookmark, Clapperboard, Eye, FileText, Heart, PenSquare, Plus, Sparkles, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/lifeverse";
import { MobileBottomNav } from "./MobileBottomNav";
import { SavedBoardsCarousel } from "./SavedBoardsCarousel";

type CreatorPost = {
  body: string;
  category_slug: string;
  created_at: string;
  id: string;
  media_type?: "image" | "video";
  media_url?: string;
  status: "draft" | "published";
  summary: string;
  title: string;
};

function readLocalPosts() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem("lifeverse-creator-posts") ?? "[]") as CreatorPost[];
  } catch {
    return [];
  }
}

function getCategoryTitle(slug: string) {
  return categories.find((category) => category.slug === slug)?.title ?? slug.replace(/-/g, " ");
}

export function CreatorProfileView() {
  const [posts, setPosts] = useState<CreatorPost[]>([]);

  useEffect(() => {
    setPosts(readLocalPosts());
  }, []);

  const published = posts.filter((post) => post.status === "published");
  const drafts = posts.filter((post) => post.status === "draft");
  const visualPosts = posts.filter((post) => post.media_url).length;
  const badges = useMemo(
    () =>
      [
        published.length >= 1 ? "First Publish" : null,
        visualPosts >= 1 ? "Visual Creator" : null,
        posts.length >= 3 ? "Idea Builder" : null,
        published.length >= 5 ? "Rising Voice" : null
      ].filter(Boolean),
    [posts.length, published.length, visualPosts]
  );

  return (
    <section className="min-h-screen bg-[#f7f8fb] px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
      <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-center text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)] sm:rounded-[2.5rem] sm:text-left">
        <div className="h-32 bg-[radial-gradient(circle_at_12%_18%,rgba(251,191,36,0.48),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(56,189,248,0.36),transparent_32%),linear-gradient(135deg,#0f172a,#4c1d95_45%,#831843)] sm:h-48" />
        <div className="px-5 pb-6 sm:px-10 sm:pb-8">
          <div className="-mt-14 flex flex-col items-center gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
              <div className="grid size-28 place-items-center rounded-[2rem] border-4 border-slate-950 bg-white text-4xl font-black text-slate-950 shadow-2xl sm:size-32">
                LV
              </div>
              <div>
                <p className="text-sm font-black uppercase text-white/45">Creator Profile</p>
                <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Your influence hub.</h1>
                <p className="mt-3 max-w-2xl leading-7 text-white/65">
                  Your posts, drafts, badges, followers, and creative momentum in one place.
                </p>
              </div>
            </div>
            <a href="/create/">
              <Button className="bg-white text-slate-950 hover:bg-slate-100">Create content</Button>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-2 sm:mt-10 sm:gap-4">
            {[
              { label: "Published", value: published.length, icon: Eye },
              { label: "Drafts", value: drafts.length, icon: FileText },
              { label: "Visuals", value: visualPosts, icon: Clapperboard },
              { label: "Followers", value: 0, icon: UserPlus }
            ].map((stat) => (
              <div className="rounded-[1.15rem] bg-white/[0.06] p-3 ring-1 ring-white/10 sm:rounded-[1.5rem] sm:p-5" key={stat.label}>
                <stat.icon className="size-5 text-white/45" />
                <p className="mt-3 text-2xl font-black sm:mt-4 sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-[0.65rem] font-bold text-white/45 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { icon: PenSquare, label: "Post", href: "/create/" },
              { icon: Bookmark, label: "Boards", href: "/account/" },
              { icon: Sparkles, label: "Premium", href: "/premium/" },
              { icon: Plus, label: "Series", href: "/create/" }
            ].map((item) => (
              <a className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-black text-white ring-1 ring-white/10 transition hover:bg-white hover:text-slate-950" href={item.href} key={item.label}>
                <item.icon className="size-4" />
                {item.label}
              </a>
            ))}
          </div>
          <div className="sticky top-0 z-20 mt-6 grid rounded-full bg-white/10 p-1 backdrop-blur sm:grid-cols-4">
            {["Posts", "Boards", "Saved", "Premium"].map((tab, index) => (
              <button
                className={`min-h-11 rounded-full px-4 text-sm font-black transition ${
                  index === 0 ? "bg-white text-slate-950" : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
                key={tab}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        <aside className="hidden content-start gap-6 lg:grid">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="flex items-center gap-3">
              <BadgeCheck className="size-5 text-slate-400" />
              <h2 className="text-xl font-black text-slate-950">Badges</h2>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {badges.length > 0 ? (
                badges.map((badge) => (
                  <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-black text-amber-800" key={badge}>
                    {badge}
                  </span>
                ))
              ) : (
                <span className="text-sm font-semibold text-slate-500">Publish content to unlock badges.</span>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] bg-rose-50 p-6 ring-1 ring-rose-100">
            <Heart className="size-5 text-rose-700" />
            <h2 className="mt-3 text-xl font-black text-slate-950">Creator ladder</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              More saves, follows, and publishes will unlock creator levels, featured placement, and monetization tools.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <p className="text-xs font-black uppercase text-slate-400">Next unlock</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">Influencer tools</h2>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
              <p className="rounded-[1.15rem] bg-slate-50 p-3">Creator analytics</p>
              <p className="rounded-[1.15rem] bg-slate-50 p-3">Follower messaging</p>
              <p className="rounded-[1.15rem] bg-slate-50 p-3">Paid collections</p>
            </div>
          </div>
        </aside>

        <div className="grid min-w-0 gap-6">
          <div className="min-w-0 max-w-full overflow-hidden rounded-[2rem] bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <SavedBoardsCarousel title="Boards" />
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-slate-400">Published Grid</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">Your public posts</h2>
              </div>
              <a href="/create/">
                <Button className="gap-2" variant="secondary">
                  <PenSquare className="size-4" />
                  New post
                </Button>
              </a>
            </div>
            <div className="mt-6 columns-2 gap-3 xl:columns-3 xl:gap-4">
              {published.length > 0 ? (
                published.map((post, index) => (
                  <article className="mb-4 break-inside-avoid overflow-hidden rounded-[1.5rem] bg-slate-50" key={post.id}>
                    {post.media_url ? (
                      post.media_type === "video" ? (
                        <video className="max-h-96 w-full object-cover" controls src={post.media_url} />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img alt="" className="w-full object-cover" src={post.media_url} />
                      )
                    ) : (
                      <div className={`${index % 2 ? "h-56" : "h-40"} bg-gradient-to-br from-rose-100 via-amber-100 to-sky-100`} />
                    )}
                    <div className="p-4">
                      <p className="text-xs font-black uppercase text-slate-400">{getCategoryTitle(post.category_slug)}</p>
                      <h3 className="mt-2 text-lg font-black leading-tight text-slate-950">{post.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{post.summary}</p>
                    </div>
                  </article>
                ))
              ) : (
                <div className="break-inside-avoid rounded-[1.75rem] bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 p-6 ring-1 ring-white">
                  <Clapperboard className="size-8 text-slate-500" />
                  <h3 className="mt-4 text-2xl font-black text-slate-950">Your grid is waiting.</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    Publish a visual post, guide, or story to make this profile feel alive.
                  </p>
                  <a className="mt-5 inline-flex" href="/create/">
                    <Button>Create first post</Button>
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <h2 className="text-xl font-black text-slate-950">Drafts</h2>
            <div className="mt-5 grid gap-3">
              {drafts.length > 0 ? (
                drafts.map((post) => (
                  <article className="rounded-[1.5rem] bg-slate-50 p-5" key={post.id}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-black text-slate-950">{post.title}</h3>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-600">
                        draft
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{post.summary || post.body}</p>
                  </article>
                ))
              ) : (
                <p className="rounded-[1.5rem] bg-slate-50 p-5 text-sm font-semibold text-slate-500">
                  Drafts you save from the studio appear here.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
      <MobileBottomNav />
    </section>
  );
}
