"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  BadgeCheck,
  Bell,
  Bookmark,
  Camera,
  Compass,
  Crown,
  Edit3,
  Grid3X3,
  Home,
  ImagePlus,
  PlaySquare,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Users,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchHomeItems, type LiveItem } from "@/lib/liveContent";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import { CategoryCarousel } from "./CategoryCarousel";
import { MobileBottomNav } from "./MobileBottomNav";
import { SavedBoardsCarousel } from "./SavedBoardsCarousel";
import { StoryCarousel } from "./StoryCarousel";

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

const storyRail = [
  { label: "For You", tone: "from-rose-400 via-amber-300 to-sky-400" },
  { label: "Food", tone: "from-emerald-300 via-lime-200 to-amber-300" },
  { label: "Money", tone: "from-cyan-300 via-blue-300 to-violet-400" },
  { label: "DIY", tone: "from-orange-300 via-pink-300 to-fuchsia-400" },
  { label: "Games", tone: "from-indigo-300 via-sky-300 to-teal-300" },
  { label: "Home", tone: "from-stone-200 via-rose-200 to-amber-200" }
];

const creatorSuggestions = [
  { name: "Skill Studio", handle: "daily_skills", growth: "12k saves" },
  { name: "Money Maps", handle: "money_maps", growth: "8k readers" },
  { name: "Home Glow", handle: "home_glow", growth: "5k boards" }
];

const quickActions = [
  { icon: ImagePlus, label: "Post", href: "/create/" },
  { icon: PlaySquare, label: "Reel", href: "/create/" },
  { icon: Grid3X3, label: "Board", href: "/account/" },
  { icon: Crown, label: "Premium", href: "/premium/" }
];

function getSeed(email?: string) {
  return (email?.split("@")[0] || "lifeverse").replace(/[^a-z0-9_]/gi, "").toLowerCase();
}

function Avatar({ initials, src, className = "size-11" }: { className?: string; initials: string; src?: string | null }) {
  return (
    <div className={`${className} grid shrink-0 place-items-center overflow-hidden rounded-full bg-slate-950 text-sm font-black text-white shadow-sm`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="" className="size-full object-cover" src={src} />
      ) : (
        initials
      )}
    </div>
  );
}

function FeedMasonry({ feedItems }: { feedItems: LiveItem[] }) {
  const heights = ["h-72", "h-96", "h-80", "h-64", "h-[22rem]", "h-72"];

  return (
    <div className="columns-2 gap-3 md:columns-2 lg:columns-3 lg:gap-5">
      {feedItems.slice(0, 12).map((item, index) => (
        <article
          className="mb-3 break-inside-avoid overflow-hidden rounded-[1.35rem] bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl lg:mb-5 lg:rounded-[1.75rem]"
          key={item.href}
        >
          <a className="block" href={item.href}>
            <div className={`relative ${heights[index % heights.length]} overflow-hidden bg-slate-100`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute inset-0 size-full object-cover" src={item.image} />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-black uppercase text-slate-950 shadow-sm backdrop-blur">
                {item.category}
              </span>
              <button className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-slate-950 shadow-sm backdrop-blur lg:size-10" type="button">
                <Bookmark className="size-4" />
              </button>
            </div>
          </a>
          <div className="p-3 lg:p-4">
            <h3 className="text-sm font-black leading-tight text-slate-950 lg:text-base">{item.title}</h3>
            <p className="mt-2 text-[0.68rem] font-bold uppercase text-slate-400">{item.sourceName}</p>
          </div>
        </article>
      ))}
    </div>
  );
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
  const pinHeights = ["h-64", "h-80", "h-52", "h-72"];

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
        setFeedItems(picks.slice(0, 14));
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
    <section className="min-h-screen bg-[#f7f8fb] pb-28 lg:pb-12">
      <div className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl lg:top-20">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-8">
          <a className="text-xl font-black tracking-tight text-slate-950 lg:hidden" href="/home/">
            LifeVerse
          </a>
          <Avatar initials={initials} src={profile.avatar_url} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black text-slate-950">{displayName}</p>
            <p className="truncate text-xs font-bold text-slate-400">@{username}</p>
          </div>
          <div className="hidden min-h-11 flex-1 items-center gap-2 rounded-full bg-slate-100 px-4 text-sm font-bold text-slate-400 md:flex">
            <Search className="size-4" />
            Search ideas, creators, boards
          </div>
          <button className="grid size-11 place-items-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200" type="button">
            <Bell className="size-5" />
          </button>
          <button className="grid size-11 place-items-center rounded-full bg-slate-950 text-white shadow-sm" type="button">
            <Plus className="size-5" />
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-5 px-3 py-4 sm:px-6 md:px-8 lg:grid-cols-[13rem_minmax(0,1fr)_14rem] lg:py-6 xl:grid-cols-[18rem_minmax(0,1fr)_20rem]">
        <aside className="hidden content-start gap-5 lg:sticky lg:top-40 lg:grid lg:self-start">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="h-24 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.6),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.42),transparent_30%),linear-gradient(135deg,#111827,#4c1d95,#831843)]" />
            <div className="-mt-9 px-5 pb-5">
              <Avatar className="size-20 border-4 border-white text-xl" initials={initials} src={profile.avatar_url} />
              <div className="mt-4 flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-950">{displayName}</h1>
                {profile.is_premium ? <BadgeCheck className="size-5 fill-sky-400 text-white" /> : null}
              </div>
              <p className="mt-1 text-sm font-bold text-slate-400">@{username}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                {profile.bio || "Create boards, publish ideas, and build your influence across LifeVerse."}
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Boards", value: Math.max(1, savedItems.length ? 3 : 0) },
                  { label: "Saves", value: savedItems.length },
                  { label: "Streak", value: "1d" }
                ].map((stat) => (
                  <div className="rounded-[1rem] bg-slate-50 p-3" key={stat.label}>
                    <p className="font-black text-slate-950">{stat.value}</p>
                    <p className="text-[0.68rem] font-bold uppercase text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Button className="mt-5 w-full gap-2" onClick={() => setIsEditing(true)} type="button" variant="secondary">
                <Edit3 className="size-4" />
                Edit profile
              </Button>
            </div>
          </div>

          <nav className="rounded-[2rem] bg-white p-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            {[
              { icon: Home, label: "Home", href: "/account/" },
              { icon: Compass, label: "Explore", href: "/trending/" },
              { icon: Grid3X3, label: "Boards", href: "/account/" },
              { icon: PlaySquare, label: "Create", href: "/create/" },
              { icon: Crown, label: "Premium", href: "/premium/" }
            ].map((item, index) => (
              <a className={`flex items-center gap-3 rounded-[1.15rem] px-4 py-3 text-sm font-black transition ${index === 0 ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`} href={item.href} key={item.label}>
                <item.icon className="size-4" />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 max-w-full">
          <div className="rounded-[1.75rem] bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70">
            <StoryCarousel />
          </div>

          <div className="mt-5 rounded-[2rem] bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="flex items-center gap-3">
              <Avatar initials={initials} src={profile.avatar_url} />
              <a className="min-h-12 flex-1 rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-400 transition hover:bg-slate-200" href="/create/">
                What are you creating today?
              </a>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {quickActions.map((action) => (
                <a className="grid min-h-16 place-items-center rounded-[1.25rem] bg-slate-50 px-2 text-center text-xs font-black text-slate-600 transition hover:bg-slate-950 hover:text-white" href={action.href} key={action.label}>
                  <action.icon className="mb-1 size-4" />
                  {action.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <CategoryCarousel />
          </div>

          {isEditing ? (
            <div className="mt-5 rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
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

          <div className="mt-5 grid gap-5">
            <div className="sticky top-36 z-20 flex gap-2 rounded-full bg-white/85 p-1 shadow-sm ring-1 ring-slate-200/70 backdrop-blur">
              {["For You", "Following", "Trending"].map((tab, index) => (
                <button
                  className={`min-h-11 flex-1 rounded-full px-4 text-sm font-black transition ${
                    index === 0 ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                  key={tab}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>
            <FeedMasonry feedItems={feedItems} />
          </div>

          <div className="mt-5 rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-slate-400">Saved Pins</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">Your visual boards</h2>
              </div>
              <a className="text-sm font-black text-slate-950" href="/categories/">Explore</a>
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

          <div className="mt-5 rounded-[2rem] bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <SavedBoardsCarousel title="Boards" />
          </div>
        </main>

        <aside className="hidden content-start gap-5 lg:sticky lg:top-40 lg:grid lg:self-start">
          <div className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
            <div className="flex items-center gap-3">
              <Zap className="size-5 text-amber-300" />
              <h2 className="text-xl font-black">Today&apos;s pulse</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {["Food hacks", "Creator badges", "Side income", "Room makeovers"].map((trend, index) => (
                <a className="rounded-[1.15rem] bg-white/[0.07] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.11]" href="/trending/" key={trend}>
                  <p className="text-xs font-black uppercase text-white/35">#{index + 1} trending</p>
                  <p className="mt-1 font-black">{trend}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="flex items-center gap-3">
              <Users className="size-5 text-slate-400" />
              <h2 className="text-xl font-black text-slate-950">Creators to follow</h2>
            </div>
            <div className="mt-5 grid gap-4">
              {creatorSuggestions.map((creator, index) => (
                <div className="flex items-center gap-3" key={creator.handle}>
                  <div className={`grid size-12 place-items-center rounded-full bg-gradient-to-br ${storyRail[index + 1].tone} text-sm font-black text-white`}>
                    {creator.name.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-slate-950">{creator.name}</p>
                    <p className="truncate text-xs font-bold text-slate-400">@{creator.handle} - {creator.growth}</p>
                  </div>
                  <Button className="h-9 px-4 text-xs" type="button" variant="secondary">Follow</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-amber-100 via-rose-100 to-sky-100 p-5 ring-1 ring-white">
            <Sparkles className="size-5 text-slate-700" />
            <h2 className="mt-3 text-xl font-black text-slate-950">Creator unlock</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              Post visuals, grow followers, earn badges, and build a premium creator lane.
            </p>
            <a className="mt-5 inline-flex" href="/create/">
              <Button>Create now</Button>
            </a>
          </div>
        </aside>
      </div>
      <MobileBottomNav />
    </section>
  );
}
