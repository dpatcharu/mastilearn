"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { BookmarkCheck, Compass, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchHomeItems, type LiveItem } from "@/lib/liveContent";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

type SavedItem = {
  category_slug: string;
  created_at: string;
  id: string;
  item_slug: string;
  item_title: string;
};

export function CustomerAccountView() {
  const [user, setUser] = useState<User | null>(null);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [feedItems, setFeedItems] = useState<LiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadAccount() {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      const { data } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      setUser(data.user);

      if (data.user) {
        const { data: saves } = await supabase
          .from("saved_items")
          .select("id,item_slug,item_title,category_slug,created_at")
          .order("created_at", { ascending: false })
          .limit(12);

        if (isMounted) {
          setSavedItems((saves ?? []) as SavedItem[]);
        }
      }

      const picks = await fetchHomeItems();

      if (isMounted) {
        setFeedItems(picks.slice(0, 6));
        setIsLoading(false);
      }
    }

    loadAccount();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSignOut() {
    await supabase?.auth.signOut();
    setUser(null);
    setSavedItems([]);
  }

  if (!isSupabaseConfigured) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="rounded-[2rem] bg-amber-50 p-8 text-sm font-bold text-amber-900">
          Account access is temporarily unavailable. Please try again shortly.
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="rounded-[2rem] bg-slate-50 p-8 text-sm font-bold text-slate-500 ring-1 ring-slate-200/70">
          <RefreshCw className="mr-2 inline size-4 animate-spin" />
          Loading your account.
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200/70">
          <h2 className="text-3xl font-black text-slate-950">Login to use your board.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            A reader account lets you save LifeVerse items and keep a personal
            discovery feed separate from the public homepage.
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
            Reader Account
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">
            Your LifeVerse board.
          </h1>
          <p className="mt-4 text-slate-500">{user.email}</p>
        </div>
        <Button className="gap-2" onClick={handleSignOut} type="button" variant="secondary">
          <LogOut className="size-4" />
          Sign out
        </Button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
          <div className="flex items-center gap-3">
            <BookmarkCheck className="size-5 text-slate-400" />
            <h2 className="text-xl font-black text-slate-950">Saved items</h2>
          </div>

          {savedItems.length > 0 ? (
            <div className="mt-6 grid gap-3">
              {savedItems.map((item) => (
                <div className="rounded-[1.25rem] bg-slate-50 p-4" key={item.id}>
                  <p className="text-sm font-black text-slate-950">{item.item_title}</p>
                  <p className="mt-1 text-xs font-bold uppercase text-slate-400">
                    {item.category_slug.replace(/-/g, " ")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-[1.25rem] bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-500">
              Save any LifeVerse item to start building your board.
            </p>
          )}
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
          <div className="flex items-center gap-3">
            <Compass className="size-5 text-white/45" />
            <h2 className="text-xl font-black">Fresh for you</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {feedItems.map((item) => (
              <a
                className="rounded-[1.25rem] bg-white/[0.06] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.1]"
                href={item.href}
                key={item.href}
              >
                <p className="text-xs font-black uppercase text-white/40">{item.category}</p>
                <h3 className="mt-2 font-black leading-snug">{item.title}</h3>
                <p className="mt-2 text-xs font-bold text-white/45">{item.sourceName}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
