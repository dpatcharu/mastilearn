"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { assetPath } from "@/lib/assetPath";

type LiveDrop = {
  category: string;
  href: string;
  image: string;
  meta: string;
  sourceHref: string;
  sourceName: string;
  title: string;
};

type MealDbMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type OpenLibraryWork = {
  author_name?: string[];
  authors?: { name: string }[];
  cover_id?: number;
  cover_i?: number;
  key: string;
  title: string;
};

type FreeToGameItem = {
  freetogame_profile_url: string;
  genre: string;
  id: number;
  platform: string;
  thumbnail: string;
  title: string;
};

const fallbackDrops: LiveDrop[] = [
  {
    category: "Food",
    href: "https://www.themealdb.com/",
    image: "/images/healthy-food.png",
    meta: "Recipe inspiration",
    sourceHref: "https://www.themealdb.com/docs_api_guide.php",
    sourceName: "TheMealDB",
    title: "Fresh meal ideas for busy days"
  },
  {
    category: "Students",
    href: "https://openlibrary.org/subjects/study_skills",
    image: "/images/students-learning.png",
    meta: "Book discovery",
    sourceHref: "https://openlibrary.org/developers/api",
    sourceName: "Open Library",
    title: "Learning books to add to your board"
  },
  {
    category: "Games",
    href: "https://www.freetogame.com/",
    image: "/images/games.png",
    meta: "Free game discovery",
    sourceHref: "https://www.freetogame.com/api-doc",
    sourceName: "FreeToGame",
    title: "Free games worth checking out"
  }
];

function compactTitle(title: string) {
  return title.length > 70 ? `${title.slice(0, 67)}...` : title;
}

function imageSrc(src: string) {
  return src.startsWith("/") ? assetPath(src) : src;
}

async function fetchMeals(): Promise<LiveDrop[]> {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian");
  if (!response.ok) {
    throw new Error("TheMealDB request failed");
  }

  const data = (await response.json()) as { meals?: MealDbMeal[] };

  return (data.meals ?? []).slice(0, 3).map((meal) => ({
    category: "Food",
    href: `https://www.themealdb.com/meal/${meal.idMeal}`,
    image: meal.strMealThumb,
    meta: "Vegetarian meal idea",
    sourceHref: "https://www.themealdb.com/docs_api_guide.php",
    sourceName: "TheMealDB",
    title: compactTitle(meal.strMeal)
  }));
}

async function fetchBooks(): Promise<LiveDrop[]> {
  const response = await fetch(
    "https://openlibrary.org/search.json?q=study%20skills&fields=key,title,author_name,cover_i&limit=8"
  );
  if (!response.ok) {
    throw new Error("Open Library request failed");
  }

  const data = (await response.json()) as { docs?: OpenLibraryWork[] };

  return (data.docs ?? [])
    .filter((book) => book.cover_id || book.cover_i)
    .slice(0, 3)
    .map((book) => {
      const coverId = book.cover_id ?? book.cover_i;
      const authors = book.authors?.map((author) => author.name) ?? book.author_name ?? [];

      return {
        category: "Students",
        href: `https://openlibrary.org${book.key}`,
        image: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
        meta: authors.slice(0, 2).join(", ") || "Study skills book",
        sourceHref: "https://openlibrary.org/developers/api",
        sourceName: "Open Library",
        title: compactTitle(book.title)
      };
    });
}

async function fetchGames(): Promise<LiveDrop[]> {
  const response = await fetch("https://www.freetogame.com/api/games?platform=browser&sort-by=popularity");
  if (!response.ok) {
    throw new Error("FreeToGame request failed");
  }

  const data = (await response.json()) as FreeToGameItem[];

  return data.slice(0, 3).map((game) => ({
    category: "Games",
    href: game.freetogame_profile_url,
    image: game.thumbnail,
    meta: `${game.genre} / ${game.platform}`,
    sourceHref: "https://www.freetogame.com/api-doc",
    sourceName: "FreeToGame",
    title: compactTitle(game.title)
  }));
}

export function LiveDrops() {
  const [drops, setDrops] = useState<LiveDrop[]>(fallbackDrops);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSources, setLoadedSources] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadDrops() {
      setIsLoading(true);

      const results = await Promise.allSettled([fetchMeals(), fetchBooks(), fetchGames()]);
      const liveDrops = results.flatMap((result) =>
        result.status === "fulfilled" ? result.value : []
      );

      if (!isMounted) {
        return;
      }

      if (liveDrops.length > 0) {
        setDrops(liveDrops);
        setLoadedSources([...new Set(liveDrops.map((drop) => drop.sourceName))]);
      }

      setIsLoading(false);
    }

    loadDrops();

    return () => {
      isMounted = false;
    };
  }, []);

  const sourceLine = useMemo(() => {
    if (loadedSources.length === 0) {
      return "Using safe fallback picks while live sources load.";
    }

    return `Live from ${loadedSources.join(", ")}.`;
  }, [loadedSources]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20" id="live-drops">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-normal text-slate-400">
            Live Drops
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Real ideas from trusted public APIs.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-500">
            Fresh meals, learning resources, and game discoveries update from
            public data sources with attribution.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-500">
          <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Loading live data" : sourceLine}
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {drops.map((drop) => (
          <a
            className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1"
            href={drop.href}
            key={`${drop.sourceName}-${drop.title}`}
            rel="noreferrer"
            target="_blank"
          >
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                src={imageSrc(drop.image)}
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-800 shadow-sm backdrop-blur">
                {drop.category}
              </span>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-400">{drop.meta}</span>
                <span className="inline-flex items-center gap-1 text-xs font-black text-slate-500">
                  {drop.sourceName}
                  <ExternalLink className="size-3.5" />
                </span>
              </div>
              <h3 className="text-xl font-black leading-snug text-slate-950">{drop.title}</h3>
              <span className="mt-5 inline-flex text-sm font-bold text-slate-500 transition group-hover:text-slate-950">
                Open source item
              </span>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-6 text-sm leading-6 text-slate-400">
        Sources are public APIs; each card links back to the original source.
      </p>
    </section>
  );
}
