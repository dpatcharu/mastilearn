"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  BadgeCheck,
  Bookmark,
  Camera,
  Compass,
  Edit3,
  Flame,
  Grid3X3,
  LogOut,
  Plus,
  RefreshCw,
  Sparkles,
  UserPlus
} from "lucide-react";
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

type Profile = {
  avatar_url: string | null;
  bio: string | null;
  display_name: string | null;
  is_premium: boolean;
  username: string | null;
  website_url: string | null;
};

const fallbackProfile: Profile = {
  avatar_url: null,
  bio: null,
  display_name: null,
  is_premium: false,
  username: null,
  website_url: null
};

function getSeed(email?: string) {
  return (email?.split("@")[0] || "lifeverse").replace(/[^a-z0-9_]/gi, "").toLowerCase();
}

export function CustomerAccountView() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [feedItems, setFeedItems] = useState<LiveItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const displayName = profile.display_name || user?.user_metadata?.display_name || getSeed(user?.email);
  const username = profile.username || user?.user_metadata?.username || getSeed(user?.email);
  const initials = displayName.slice(0, 2).toUpperCase();
  const pinHeights = ["h-40", "h-56", "h-32"];

  const profileForm = useMemo(
    () => ({
      bio: profile.bio ?? "",
      display_name: displayName,
      username,
      website_url: profile.website_url ?? ""
    }),
    [displayName, profile.bio, profile.website_url, username]
  );

  const [form, setForm] = useState(profileForm);

  useEffect(() => {
    setForm(profileForm);
  }, [profileForm]);

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
        const [{ data: saves }, { data: profileRow }] = await Promise.all([
          supabase
            .from("saved_items")
            .select("id,item_slug,item_title,category_slug,created_at")
            .order("created_at", { ascending: false })
            .limit(18),
          supabase
            .from("profiles")
            .select("avatar_url,bio,display_name,is_premium,username,website_url")
            .eq("id", data.user.id)
            .maybeSingle()
        ]);

        if (isMounted) {
          setSavedItems((saves ?? []) as SavedItem[]);
          setProfile((profileRow as Profile | null) ?? fallbackProfile);
        }
      }

      const picks = await fetchHomeItems();

      if (isMounted) {
        setFeedItems(picks.slice(0, 12));
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

  async function saveProfile() {
    if (!supabase || !user) {
      return;
    }

    const cleanUsername = form.username.toLowerCase().replace(/[^a-z0-9_]/g, "");
    const { error } = await supabase
      .from("profiles")
      .update({
        bio: form.bio,
        display_name: form.display_name,
        username: cleanUsername,
        website_url: form.website_url
      })
      .eq("id", user.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setProfile((current) => ({
      ...current,
      bio: form.bio,
      display_name: form.display_name,
      username: cleanUsername,
      website_url: form.website_url
    }));
    setIsEditing(false);
    setMessage("Profile updated.");
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
          Loading your LifeVerse.
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200/70">
          <h2 className="text-3xl font-black text-slate-950">Create your LifeVerse.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Sign in to save posts, follow creators, build boards, and publish your own ideas.
          </p>
          <a className="mt-6 inline-flex" href="/login/">
            <Button>Login or create account</Button>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="overflow-hidden rounded-[2.25rem] bg-slate-950 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
        <div className="h-44 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.55),transparent_32%),radial-gradient(circle_at_72%_12%,rgba(244,114,182,0.45),transparent_30%),linear-gradient(135deg,#0f172a,#172554_48%,#064e3b)]" />
        <div className="px-6 pb-7 sm:px-8">
          <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="grid size-28 place-items-center rounded-[2rem] border-4 border-slate-950 bg-white text-3xl font-black text-slate-950 shadow-2xl">
                {profile.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" className="size-full rounded-[1.65rem] object-cover" src={profile.avatar_url} />
                ) : (
                  initials
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-4xl font-black tracking-tight">{displayName}</h1>
                  {profile.is_premium ? (
                    <BadgeCheck className="size-6 fill-sky-400 text-slate-950" />
                  ) : null}
                </div>
                <p className="mt-1 text-sm font-bold text-white/55">@{username}</p>
                <p className="mt-3 max-w-2xl leading-7 text-white/70">
                  {profile.bio || "Build boards, create posts, follow ideas, and turn your curiosity into influence."}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 bg-white text-slate-950 hover:bg-slate-100" onClick={() => setIsEditing(true)} type="button">
                <Edit3 className="size-4" />
                Edit profile
              </Button>
              <Button className="gap-2 bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15" onClick={handleSignOut} type="button">
                <LogOut className="size-4" />
                Sign out
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {[
              { icon: Grid3X3, label: "Boards", value: Math.max(1, savedItems.length ? 3 : 0) },
              { icon: Bookmark, label: "Saved", value: savedItems.length },
              { icon: UserPlus, label: "Following", value: 0 },
              { icon: Flame, label: "Streak", value: "1d" }
            ].map((stat) => (
              <div className="rounded-[1.4rem] bg-white/[0.07] p-4 ring-1 ring-white/10" key={stat.label}>
                <stat.icon className="size-5 text-white/45" />
                <p className="mt-3 text-2xl font-black">{stat.value}</p>
                <p className="text-xs font-bold uppercase text-white/45">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-6 rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
          <div className="flex items-center gap-3">
            <Camera className="size-5 text-slate-400" />
            <h2 className="text-xl font-black text-slate-950">Profile setup</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Display name
              <input className="min-h-12 rounded-full bg-slate-50 px-5 outline-none ring-1 ring-slate-200" onChange={(event) => setForm({ ...form, display_name: event.target.value })} value={form.display_name} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Username
              <input className="min-h-12 rounded-full bg-slate-50 px-5 outline-none ring-1 ring-slate-200" onChange={(event) => setForm({ ...form, username: event.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "") })} value={form.username} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Bio
              <textarea className="min-h-24 rounded-[1.5rem] bg-slate-50 p-5 outline-none ring-1 ring-slate-200" onChange={(event) => setForm({ ...form, bio: event.target.value })} value={form.bio} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Link
              <input className="min-h-12 rounded-full bg-slate-50 px-5 outline-none ring-1 ring-slate-200" onChange={(event) => setForm({ ...form, website_url: event.target.value })} placeholder="https://..." value={form.website_url} />
            </label>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={saveProfile} type="button">Save profile</Button>
            <Button onClick={() => setIsEditing(false)} type="button" variant="secondary">Cancel</Button>
          </div>
          {message ? <p className="mt-4 text-sm font-bold text-slate-500">{message}</p> : null}
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="grid content-start gap-6">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-slate-400">Boards</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">Your collections</h2>
              </div>
              <Button className="size-11 rounded-full p-0" type="button" variant="secondary">
                <Plus className="size-4" />
              </Button>
            </div>
            <div className="mt-5 grid gap-3">
              {["Daily ideas", "Future business", "Things to try"].map((board, index) => (
                <div className="overflow-hidden rounded-[1.35rem] bg-slate-50" key={board}>
                  <div className={`h-20 ${index === 0 ? "bg-rose-100" : index === 1 ? "bg-emerald-100" : "bg-sky-100"}`} />
                  <div className="p-4">
                    <p className="font-black text-slate-950">{board}</p>
                    <p className="mt-1 text-xs font-bold text-slate-400">{index === 0 ? savedItems.length : 0} saves</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-amber-50 p-6 ring-1 ring-amber-100">
            <Sparkles className="size-5 text-amber-700" />
            <h2 className="mt-3 text-xl font-black text-slate-950">Creator unlock</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              Post images, videos, stories, and guides. Strong posts can become featured content.
            </p>
            <a className="mt-5 inline-flex" href="/create/">
              <Button>Create a post</Button>
            </a>
          </div>
        </aside>

        <div className="grid gap-6">
          <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{initials}</div>
              <a className="flex-1 rounded-full bg-slate-50 px-5 py-3 text-sm font-bold text-slate-400 ring-1 ring-slate-200 transition hover:bg-slate-100" href="/create/">
                Share an idea, photo, video, or guide...
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="flex items-center gap-3">
              <Bookmark className="size-5 text-slate-400" />
              <h2 className="text-xl font-black text-slate-950">Saved pins</h2>
            </div>
            <div className="mt-5 columns-1 gap-4 sm:columns-2 xl:columns-3">
              {savedItems.length > 0 ? (
                savedItems.map((item, index) => (
                  <a
                    className="mb-4 block break-inside-avoid overflow-hidden rounded-[1.5rem] bg-slate-50 transition hover:-translate-y-1 hover:shadow-xl"
                    href={`/read/?id=${item.item_slug}`}
                    key={item.id}
                  >
                    <div className={`${pinHeights[index % pinHeights.length]} bg-gradient-to-br from-rose-100 via-amber-100 to-sky-100`} />
                    <div className="p-4">
                      <p className="text-sm font-black leading-snug text-slate-950">{item.item_title}</p>
                      <p className="mt-2 text-xs font-bold uppercase text-slate-400">{item.category_slug.replace(/-/g, " ")}</p>
                    </div>
                  </a>
                ))
              ) : (
                <p className="break-inside-avoid rounded-[1.5rem] bg-slate-50 p-5 text-sm font-semibold text-slate-500">
                  Save content from any category to build your first board.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
            <div className="flex items-center gap-3">
              <Compass className="size-5 text-white/45" />
              <h2 className="text-xl font-black">For your feed</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {feedItems.map((item, index) => (
                <a
                  className="overflow-hidden rounded-[1.5rem] bg-white/[0.07] ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/[0.11]"
                  href={item.href}
                  key={item.href}
                >
                  <div className={`h-32 ${index % 2 ? "bg-fuchsia-200/20" : "bg-cyan-200/20"}`} />
                  <div className="p-4">
                    <p className="text-xs font-black uppercase text-white/40">{item.category}</p>
                    <h3 className="mt-2 font-black leading-snug">{item.title}</h3>
                    <p className="mt-2 text-xs font-bold text-white/45">{item.sourceName}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
