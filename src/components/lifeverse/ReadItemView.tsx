"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { ArrowLeft, Bookmark, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/assetPath";
import {
  fetchReadItem,
  type ReadItemDetail,
  type ReadSource
} from "@/lib/readContent";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

function imageSrc(src: string) {
  return src.startsWith("/") ? assetPath(src) : src;
}

function isReadSource(value: string | null): value is ReadSource {
  return value === "book" || value === "game" || value === "meal";
}

export function ReadItemView() {
  const params = useSearchParams();
  const source = params.get("source");
  const id = params.get("id");
  const [item, setItem] = useState<ReadItemDetail | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLimited, setIsLimited] = useState(false);
  const [viewsUsed, setViewsUsed] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadItem() {
      if (!id || !isReadSource(source)) {
        setError("This item link is not available.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const nextItem = await fetchReadItem(source, id);

        if (isMounted) {
          setItem(nextItem);
        }
      } catch {
        if (isMounted) {
          setError("This item is not available right now.");
          setItem(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadItem();

    return () => {
      isMounted = false;
    };
  }, [id, source]);

  useEffect(() => {
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

  useEffect(() => {
    if (!supabase || !user) {
      setIsPremium(false);
      return;
    }

    supabase
      .from("profiles")
      .select("is_premium")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setIsPremium(Boolean(data?.is_premium)));
  }, [user]);

  useEffect(() => {
    if (!item || !id || !isReadSource(source) || typeof window === "undefined") {
      return;
    }

    if (isPremium) {
      setIsLimited(false);
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const storageKey = `lifeverse-read-views:${today}:${user ? "member" : "public"}`;
    const limit = user ? 12 : 3;
    const currentItem = `${source}:${id}`;

    let views: string[] = [];

    try {
      views = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as string[];
    } catch {
      views = [];
    }

    const uniqueViews = [...new Set(views)];

    if (!uniqueViews.includes(currentItem)) {
      if (uniqueViews.length >= limit) {
        setViewsUsed(uniqueViews.length);
        setIsLimited(true);
        return;
      }

      uniqueViews.push(currentItem);
      window.localStorage.setItem(storageKey, JSON.stringify(uniqueViews));
    }

    setViewsUsed(uniqueViews.length);
    setIsLimited(false);
  }, [id, isPremium, item, source, user]);

  async function handleSave() {
    if (!item || !id || !isReadSource(source)) {
      return;
    }

    if (!isSupabaseConfigured || !supabase || !user) {
      window.location.href = "/login/";
      return;
    }

    const { error: saveError } = await supabase.from("saved_items").upsert(
      {
        category_slug: item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        item_slug: `${source}:${id}`,
        item_title: item.title,
        user_id: user.id
      },
      { onConflict: "user_id,item_slug" }
    );

    setSaveMessage(saveError ? saveError.message : "Saved to your board.");
  }

  const paragraphs = useMemo(
    () =>
      item?.description
        .split(/(?<=[.!?])\s+/)
        .filter(Boolean)
        .slice(0, 6) ?? [],
    [item]
  );
  const visibleParagraphs = isLimited ? paragraphs.slice(0, 1) : paragraphs;

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="rounded-[2rem] bg-slate-50 p-8 text-sm font-bold text-slate-500 ring-1 ring-slate-200/70">
          <RefreshCw className="mr-2 inline size-4 animate-spin" />
          Loading this LifeVerse item.
        </div>
      </section>
    );
  }

  if (error || !item) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="rounded-[2rem] bg-rose-50 p-8 text-sm font-bold text-rose-900">
          {error}
        </div>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <a className="inline-flex items-center gap-2 text-sm font-black text-slate-500 transition hover:text-slate-950" href="/trending">
        <ArrowLeft className="size-4" />
        Back to discovery
      </a>

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
          <img alt="" className="h-full min-h-[420px] w-full object-cover" src={imageSrc(item.image)} />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
              {item.category}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
              {item.sourceName}
            </span>
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
            {item.title}
          </h1>

          <div className="mt-7 grid gap-4 text-lg leading-8 text-slate-600">
            {visibleParagraphs.length > 0 ? (
              visibleParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <p>Details are available from the original source.</p>
            )}
          </div>

          {isLimited ? (
            <div className="mt-7 rounded-[1.75rem] bg-slate-950 p-6 text-white">
              <p className="text-sm font-black uppercase text-white/45">
                Free preview limit reached
              </p>
              <h2 className="mt-2 text-2xl font-black">Knowledge is valuable.</h2>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Public visitors get 3 reads per day. Free members get 12. Premium
                members get unlimited reading, unlimited saves, and premium boards.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="/login/">
                  <Button className="w-full bg-white text-slate-950 hover:bg-slate-100 sm:w-auto">
                    Login for more reads
                  </Button>
                </a>
                <a href="/premium/">
                  <Button className="w-full sm:w-auto" variant="secondary">
                    Go Premium
                  </Button>
                </a>
              </div>
            </div>
          ) : null}

          {item.facts.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {item.facts.slice(0, 8).map((fact) => (
                <span className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-500 ring-1 ring-slate-200/70" key={fact}>
                  {fact}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button className="gap-2" onClick={handleSave} type="button">
              <Bookmark className="size-4" />
              {user ? "Save to board" : "Login to save"}
            </Button>
            <a href={item.originalHref} rel="noreferrer" target="_blank">
              <Button className="w-full gap-2 sm:w-auto" variant="secondary">
                Original source
                <ExternalLink className="size-4" />
              </Button>
            </a>
          </div>

          {saveMessage ? (
            <p className="mt-4 rounded-[1.25rem] bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
              {saveMessage}
            </p>
          ) : null}

          <p className="mt-6 text-sm leading-6 text-slate-400">{item.attribution}</p>
          {!isPremium ? (
            <p className="mt-3 text-xs font-bold uppercase tracking-normal text-slate-400">
              {user ? `${viewsUsed}/12 member reads used today` : `${viewsUsed}/3 public reads used today`}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
