"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  BadgeCheck,
  Clapperboard,
  Eye,
  FileText,
  ImagePlus,
  LayoutGrid,
  Layers3,
  PenLine,
  Send,
  Smartphone,
  Sparkles,
  Upload,
  WandSparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/lifeverse";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

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

type PostStyle = "pin" | "story" | "guide" | "video";

const storageKey = "lifeverse-creator-posts";
const hookIdeas = [
  "3 things I wish I knew earlier",
  "Save this before you try it",
  "A simple idea that actually works",
  "This changed my routine",
  "Beginner-friendly breakdown"
];

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
  const [mediaType, setMediaType] = useState<"image" | "video" | undefined>();
  const [mediaUrl, setMediaUrl] = useState("");
  const [postStyle, setPostStyle] = useState<PostStyle>("pin");
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

  const publishedCount = posts.filter((post) => post.status === "published").length;
  const draftCount = posts.filter((post) => post.status === "draft").length;

  const badges = useMemo(
    () =>
      [
        publishedCount >= 1 ? "First Publish" : null,
        posts.some((post) => post.media_url) ? "Visual Creator" : null,
        draftCount >= 3 ? "Idea Builder" : null,
        publishedCount >= 5 ? "Rising Voice" : null
      ].filter(Boolean),
    [draftCount, posts, publishedCount]
  );

  function handleMediaUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const nextType = file.type.startsWith("video") ? "video" : "image";
    setMediaType(nextType);
    setPostStyle(nextType === "video" ? "video" : postStyle);

    if (nextType === "video") {
      setMediaUrl(URL.createObjectURL(file));
      setMessage("Video preview added. Permanent video hosting will use Supabase Storage next.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setMediaUrl(String(reader.result ?? ""));
      setMessage("Image added to your post preview.");
    };
    reader.readAsDataURL(file);
  }

  async function savePost(status: CreatorPost["status"]) {
    if (!title.trim() || (!summary.trim() && !body.trim() && !mediaUrl)) {
      setMessage("Add a title and at least one idea, caption, image, or video.");
      return;
    }

    const post: CreatorPost = {
      body,
      category_slug: categorySlug,
      created_at: new Date().toISOString(),
      id: crypto.randomUUID(),
      media_type: mediaType,
      media_url: mediaUrl,
      status,
      summary,
      title
    };

    const nextPosts = [post, ...posts];
    setPosts(nextPosts);
    writeLocalPosts(nextPosts);
    setMessage(status === "draft" ? "Draft saved." : "Published to your creator profile.");

    if (supabase && user) {
      await supabase.from("creator_posts").insert({
        author_id: user.id,
        body,
        category_slug: categorySlug,
        media_type: mediaType,
        media_url: mediaUrl || null,
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
            Members can post images, videos, guides, ideas, and stories into the LifeVerse network.
          </p>
          <a className="mt-6 inline-flex" href="/login/">
            <Button>Login or create account</Button>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f7f8fb] px-4 pb-28 pt-6 sm:px-8 sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-slate-400">
            Creator Studio
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">
            Create the next thing people save.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Mix pins, reels, guides, and short stories. Draft privately, preview cleanly, then publish.
          </p>
        </div>
        <a href="/creator/">
          <Button variant="secondary">View profile</Button>
        </a>
      </div>

      <div className="mx-auto mt-6 grid max-w-7xl gap-3 sm:grid-cols-3">
        {[
          { label: "Drafts", value: draftCount },
          { label: "Published", value: publishedCount },
          { label: "Formats", value: 4 }
        ].map((stat) => (
          <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-200/70" key={stat.label}>
            <p className="text-2xl font-black text-slate-950">{stat.value}</p>
            <p className="text-xs font-black uppercase text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 sm:p-6">
          <div className="mb-5 rounded-[1.5rem] bg-slate-950 p-4 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-white text-slate-950">
                  <WandSparkles className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-black">Creator Command Center</p>
                  <p className="text-xs font-bold text-white/45">Build posts people tap, save, share, and follow.</p>
                </div>
              </div>
              <div className="flex gap-2">
                {[Layers3, Smartphone, Sparkles].map((Icon, index) => (
                  <span className="grid size-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/10" key={index}>
                    <Icon className="size-4 text-white/70" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { icon: ImagePlus, label: "Pin", value: "pin" as const },
              { icon: Clapperboard, label: "Video", value: "video" as const },
              { icon: FileText, label: "Guide", value: "guide" as const },
              { icon: PenLine, label: "Story", value: "story" as const }
            ].map((item) => (
              <button
                className={`min-h-14 rounded-[1.2rem] px-4 text-sm font-black transition ${
                  postStyle === item.value
                    ? "bg-slate-950 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
                key={item.value}
                onClick={() => setPostStyle(item.value)}
                type="button"
              >
                <item.icon className="mx-auto mb-1 size-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid rounded-full bg-slate-100 p-1 sm:grid-cols-2">
            {[
              { label: "Compose", value: "edit" as const },
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
            <div className="mt-6 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase text-white xl:hidden">
                Step 1 / Upload
              </div>
              <label className="grid min-h-96 cursor-pointer place-items-center rounded-[1.75rem] bg-slate-50 p-5 text-center ring-1 ring-slate-200 transition hover:bg-slate-100">
                <input
                  accept="image/*,video/*"
                  className="sr-only"
                  onChange={handleMediaUpload}
                  type="file"
                />
                {mediaUrl ? (
                  <div className="w-full">
                    {mediaType === "video" ? (
                      <video className="max-h-[30rem] w-full rounded-[1.4rem] object-cover" controls src={mediaUrl} />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="" className="max-h-[30rem] w-full rounded-[1.4rem] object-cover" src={mediaUrl} />
                    )}
                    <p className="mt-4 text-sm font-black text-slate-500">Click to replace media</p>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto size-10 text-slate-400" />
                    <p className="mt-4 text-xl font-black text-slate-950">Upload image or video</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                      Create visual posts, quick clips, tutorials, product ideas, or daily inspiration.
                    </p>
                  </div>
                )}
              </label>

              <div className="grid gap-4">
                <div className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase text-white xl:hidden">
                  Step 2 / Caption
                </div>
                <div className="rounded-[1.5rem] bg-amber-50 p-4 ring-1 ring-amber-100">
                  <p className="text-xs font-black uppercase text-amber-700">Hook ideas</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {hookIdeas.map((idea) => (
                      <button
                        className="rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm ring-1 ring-amber-100 transition hover:bg-slate-950 hover:text-white"
                        key={idea}
                        onClick={() => setTitle(idea)}
                        type="button"
                      >
                        {idea}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Title
                  <input className="min-h-12 rounded-full bg-slate-50 px-5 outline-none ring-1 ring-slate-200" onChange={(event) => setTitle(event.target.value)} placeholder="A hook people want to tap" value={title} />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Category
                  <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase text-white sm:hidden">
                    Step 3 / Category
                  </span>
                  <select className="min-h-12 rounded-full bg-slate-50 px-5 outline-none ring-1 ring-slate-200" onChange={(event) => setCategorySlug(event.target.value)} value={categorySlug}>
                    {categories.map((category) => (
                      <option key={category.slug} value={category.slug}>{category.title}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Caption
                  <textarea className="min-h-28 rounded-[1.5rem] bg-slate-50 p-5 outline-none ring-1 ring-slate-200" onChange={(event) => setSummary(event.target.value)} placeholder="Short caption or promise" value={summary} />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Details
                  <textarea className="min-h-44 rounded-[1.5rem] bg-slate-50 p-5 outline-none ring-1 ring-slate-200" onChange={(event) => setBody(event.target.value)} placeholder="Steps, story, list, or full post" value={body} />
                </label>
              </div>
            </div>
          ) : (
            <article className="mx-auto mt-6 max-w-xl overflow-hidden rounded-[2rem] bg-slate-50 ring-1 ring-slate-200/70">
              {mediaUrl ? (
                mediaType === "video" ? (
                  <video className="max-h-[34rem] w-full object-cover" controls src={mediaUrl} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" className="max-h-[34rem] w-full object-cover" src={mediaUrl} />
                )
              ) : (
                <div className="grid h-72 place-items-center bg-gradient-to-br from-rose-100 via-amber-100 to-sky-100">
                  <LayoutGrid className="size-10 text-white" />
                </div>
              )}
              <div className="p-6">
                <p className="text-xs font-black uppercase text-slate-400">
                  {categories.find((category) => category.slug === categorySlug)?.title}
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-950">{title || "Untitled post"}</h2>
                <p className="mt-4 font-semibold leading-7 text-slate-600">{summary || "Caption preview"}</p>
                <div className="mt-5 whitespace-pre-wrap leading-8 text-slate-700">{body || "Details preview"}</div>
              </div>
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

        <aside className="hidden content-start gap-5 lg:grid">
          <div className="sticky top-28 overflow-hidden rounded-[2rem] bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="mx-auto max-w-[19rem] rounded-[2.25rem] bg-slate-950 p-3 shadow-2xl">
              <div className="overflow-hidden rounded-[1.7rem] bg-white">
                <div className="flex items-center gap-2 border-b border-slate-100 p-3">
                  <div className="size-8 rounded-full bg-slate-950" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-black text-slate-950">Your preview</p>
                    <p className="truncate text-[0.65rem] font-bold text-slate-400">
                      {categories.find((category) => category.slug === categorySlug)?.title}
                    </p>
                  </div>
                </div>
                {mediaUrl ? (
                  mediaType === "video" ? (
                    <video className="h-80 w-full object-cover" muted src={mediaUrl} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="" className="h-80 w-full object-cover" src={mediaUrl} />
                  )
                ) : (
                  <div className="grid h-80 place-items-center bg-gradient-to-br from-rose-100 via-amber-100 to-sky-100">
                    <Upload className="size-10 text-white" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-black leading-tight text-slate-950">{title || "Your hook appears here"}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{summary || "Your caption will preview like a social post."}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
            <Sparkles className="size-5 text-white/45" />
            <h2 className="mt-3 text-xl font-black">Growth loop</h2>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-white/65">
              <p>Post useful visuals people want to save.</p>
              <p>Turn drafts into series so followers return.</p>
              <p>Earn badges as your publishing streak grows.</p>
              <p>Premium posts and creator rewards come next.</p>
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
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-2xl font-black text-slate-950">{draftCount}</p>
                <p className="text-xs font-bold uppercase text-slate-400">Drafts</p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-2xl font-black text-slate-950">{publishedCount}</p>
                <p className="text-xs font-bold uppercase text-slate-400">Published</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-[1fr_1fr] gap-2 rounded-[1.5rem] bg-slate-950/95 p-2 shadow-[0_20px_70px_rgba(15,23,42,0.35)] backdrop-blur-xl lg:hidden">
        <Button className="bg-white text-slate-950 hover:bg-slate-100" onClick={() => savePost("draft")} type="button">
          Save Draft
        </Button>
        <Button onClick={() => savePost("published")} type="button">
          Publish
        </Button>
      </div>
    </section>
  );
}
