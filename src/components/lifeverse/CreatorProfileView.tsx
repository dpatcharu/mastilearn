"use client";

import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Eye, FileText, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

type CreatorPost = {
  body: string;
  category_slug: string;
  created_at: string;
  id: string;
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

export function CreatorProfileView() {
  const [posts, setPosts] = useState<CreatorPost[]>([]);

  useEffect(() => {
    setPosts(readLocalPosts());
  }, []);

  const published = posts.filter((post) => post.status === "published");
  const drafts = posts.filter((post) => post.status === "draft");
  const badges = useMemo(
    () =>
      [
        published.length >= 1 ? "First Publish" : null,
        posts.length >= 3 ? "Idea Builder" : null,
        published.length >= 5 ? "Rising Voice" : null
      ].filter(Boolean),
    [posts.length, published.length]
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)] sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-white/45">Creator Profile</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight">Your influence hub.</h1>
            <p className="mt-4 max-w-2xl leading-7 text-white/65">
              Track drafts, published posts, followers, and badges as your content grows.
            </p>
          </div>
          <a href="/create/">
            <Button className="bg-white text-slate-950 hover:bg-slate-100">Create content</Button>
          </a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Published", value: published.length, icon: Eye },
            { label: "Drafts", value: drafts.length, icon: FileText },
            { label: "Followers", value: 0, icon: UserPlus }
          ].map((stat) => (
            <div className="rounded-[1.5rem] bg-white/[0.06] p-5 ring-1 ring-white/10" key={stat.label}>
              <stat.icon className="size-5 text-white/45" />
              <p className="mt-4 text-4xl font-black">{stat.value}</p>
              <p className="mt-1 text-sm font-bold text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
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

        <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
          <h2 className="text-xl font-black text-slate-950">Your content</h2>
          <div className="mt-5 grid gap-3">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article className="rounded-[1.5rem] bg-slate-50 p-5" key={post.id}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-black text-slate-950">{post.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${
                      post.status === "published"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-200 text-slate-600"
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{post.summary}</p>
                </article>
              ))
            ) : (
              <p className="rounded-[1.5rem] bg-slate-50 p-5 text-sm font-semibold text-slate-500">
                No creator posts yet. Start by drafting your first idea.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
