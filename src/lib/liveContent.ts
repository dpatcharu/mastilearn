export type LiveItem = {
  category: string;
  href: string;
  image: string;
  meta: string;
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

const bookQueries: Record<string, { category: string; query: string }> = {
  "students-corner": { category: "Students", query: "study skills" },
  "business-money": {
    category: "Business",
    query: "entrepreneurship small business money"
  },
  "home-interior": {
    category: "Home",
    query: "interior design home decorating"
  },
  events: { category: "Events", query: "event planning party planning" },
  diy: { category: "DIY", query: "do it yourself home projects" },
  lifestyle: { category: "Lifestyle", query: "mindfulness wellness habits" }
};

function compactTitle(title: string) {
  return title.length > 70 ? `${title.slice(0, 67)}...` : title;
}

export async function fetchMeals(limit = 6): Promise<LiveItem[]> {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian");
  if (!response.ok) {
    throw new Error("TheMealDB request failed");
  }

  const data = (await response.json()) as { meals?: MealDbMeal[] };

  return (data.meals ?? []).slice(0, limit).map((meal) => ({
    category: "Food",
    href: `https://www.themealdb.com/meal/${meal.idMeal}`,
    image: meal.strMealThumb,
    meta: "Recipe idea",
    sourceName: "TheMealDB",
    title: compactTitle(meal.strMeal)
  }));
}

export async function fetchBooksForCategory(
  slug: string,
  limit = 6
): Promise<LiveItem[]> {
  const config = bookQueries[slug] ?? bookQueries["students-corner"];
  const params = new URLSearchParams({
    fields: "key,title,author_name,cover_i",
    limit: String(Math.max(limit * 2, 10)),
    q: config.query
  });

  const response = await fetch(`https://openlibrary.org/search.json?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Open Library request failed");
  }

  const data = (await response.json()) as { docs?: OpenLibraryWork[] };

  return (data.docs ?? [])
    .filter((book) => book.cover_i)
    .slice(0, limit)
    .map((book) => ({
      category: config.category,
      href: `https://openlibrary.org${book.key}`,
      image: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
      meta: book.author_name?.slice(0, 2).join(", ") || "Open Library",
      sourceName: "Open Library",
      title: compactTitle(book.title)
    }));
}

export async function fetchGames(limit = 6): Promise<LiveItem[]> {
  const response = await fetch("https://www.freetogame.com/api/games?platform=browser&sort-by=popularity");
  if (!response.ok) {
    throw new Error("FreeToGame request failed");
  }

  const data = (await response.json()) as FreeToGameItem[];

  return data.slice(0, limit).map((game) => ({
    category: "Games",
    href: game.freetogame_profile_url,
    image: game.thumbnail,
    meta: `${game.genre} / ${game.platform}`,
    sourceName: "FreeToGame",
    title: compactTitle(game.title)
  }));
}

export async function fetchCategoryItems(slug: string, limit = 9) {
  if (slug === "food") {
    return fetchMeals(limit);
  }

  if (slug === "games") {
    return fetchGames(limit);
  }

  return fetchBooksForCategory(slug, limit);
}

export async function fetchHomeItems() {
  const results = await Promise.allSettled([
    fetchMeals(3),
    fetchBooksForCategory("students-corner", 3),
    fetchGames(3)
  ]);

  return results.flatMap((result) =>
    result.status === "fulfilled" ? result.value : []
  );
}
