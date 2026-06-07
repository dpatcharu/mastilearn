"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { BadgeCheck, Eye, FileText, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/lifeverse";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

type CreatorPost = {
  body: string;
  category_slug: string;
  created_at: string;
  id: string;
  status: "draft" | "published";
  summary: string;
  title: string;
};

const storageKey = "lifeverse-creator-posts";

function readLocalPosts() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as CreatorPost[];
  } catch {
    return [];
  }
}

function writeLocalPosts(posts: CreatorPost[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(posts));
}

export function CreatorStudio() {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug ?? "students-corner");
  const [posts, setPosts] = useState<CreatorPost[]>([]);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    setPosts(readLocalPosts());

    if (!supabase) {
      return;
    }

    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const badges = useMemo(() => {
    const publishedCount = posts.filter((post) => post.status === "published").length;
    const draftCount = posts.filter((post) => post.status === "draft").length;

    return [
      publishedCount >= 1 ? "First Publish" : null,
      draftCount >= 3 ? "Idea Builder" : null,
      publishedCount >= 5 ? "Rising Voice" : null
    ].filter(Boolean);
  }, [posts]);

  async function savePost(status: CreatorPost["status"]) {
    if (!title.trim() || !summary.trim() || !body.trim()) {
      setMessage("Add a title, summary, and body before saving.");
      return;
    }

    const post: CreatorPost = {
      body,
      category_slug: categorySlug,
      created_at: new Date().toISOString(),
      id: crypto.randomUUID(),
      status,
      summary,
      title
    };

    const nextPosts = [post, ...posts];
    setPosts(nextPosts);
    writeLocalPosts(nextPosts);
    setMessage(status === "draft" ? "Draft saved to your creator workspace." : "Published to your creator workspace.");

    if (supabase && user) {
      await supabase.from("creator_posts").insert({
        author_id: user.id,
        body,
        category_slug: categorySlug,
        status,
        summary,
        title
      });
    }
  }

  if (!isSupabaseConfigured || !user) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200/70">
          <p className="text-sm font-black uppercase text-slate-400">Creator Studio</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950">Login to create.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Creator tools are for members. Login to draft posts, preview them, publish,
            build followers, and earn badges.
          </p>
          <a className="mt-6 inline-flex" href="/login/">
            <Button>Login or create account</Button>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-slate-400">
            Creator Studio
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">
            Draft. Preview. Publish. Grow.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Create original posts for LifeVerse categories. Published content can
            grow followers, views, and creator badges.
          </p>
        </div>
        <a href="/creator/">
          <Button variant="secondary">View creator profile</Button>
        </a>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
          <div className="grid rounded-full bg-slate-100 p-1 sm:grid-cols-2">
            {[
              { label: "Write", value: "edit" as const },
              { label: "Preview", value: "preview" as const }
            ].map((item) => (
              <button
                className={`min-h-11 rounded-full px-4 text-sm font-black transition ${
                  mode === item.value ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
                }`}
                key={item.value}
                onClick={() => setMode(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          {mode === "edit" ? (
            <div className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Title
                <input className="min-h-12 rounded-full bg-slate-50 px-5 outline-none ring-1 ring-slate-200" onChange={(event) => setTitle(event.target.value)} value={title} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Category
                <select className="min-h-12 rounded-full bg-slate-50 px-5 outline-none ring-1 ring-slate-200" onChange={(event) => setCategorySlug(event.target.value)} value={categorySlug}>
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>{category.title}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Summary
                <textarea className="min-h-24 rounded-[1.5rem] bg-slate-50 p-5 outline-none ring-1 ring-slate-200" onChange={(event) => setSummary(event.target.value)} value={summary} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Content
                <textarea className="min-h-64 rounded-[1.5rem] bg-slate-50 p-5 outline-none ring-1 ring-slate-200" onChange={(event) => setBody(event.target.value)} value={body} />
              </label>
            </div>
          ) : (
            <article className="mt-6 rounded-[1.75rem] bg-slate-50 p-6 ring-1 ring-slate-200/70">
              <p className="text-xs font-black uppercase text-slate-400">
                {categories.find((category) => category.slug === categorySlug)?.title}
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">{title || "Untitled draft"}</h2>
              <p className="mt-4 font-semibold leading-7 text-slate-600">{summary || "Summary preview"}</p>
              <div className="mt-5 whitespace-pre-wrap leading-8 text-slate-700">{body || "Your content preview will appear here."}</div>
            </article>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button className="gap-2" onClick={() => savePost("draft")} type="button" variant="secondary">
              <FileText className="size-4" />
              Save draft
            </Button>
            <Button className="gap-2" onClick={() => savePost("published")} type="button">
              <Send className="size-4" />
              Publish
            </Button>
          </div>
          {message ? <p className="mt-4 rounded-[1.25rem] bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{message}</p> : null}
        </div>

        <aside className="grid gap-5">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 text-white/45" />
              <h2 className="text-xl font-black">Creator path</h2>
            </div>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-white/65">
              <p>1. Save drafts before publishing.</p>
              <p>2. Publish original category posts.</p>
              <p>3. Grow followers from strong content.</p>
              <p>4. Earn badges from publishing and engagement.</p>
            </div>
          </div>
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
                <span className="text-sm font-semibold text-slate-500">Publish to unlock badges.</span>
              )}
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="flex items-center gap-3">
              <Eye className="size-5 text-slate-400" />
              <h2 className="text-xl font-black text-slate-950">Workspace</h2>
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-500">
              {posts.length} saved creator post{posts.length === 1 ? "" : "s"} on this device.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
